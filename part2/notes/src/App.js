import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Create New Note")
  const [showAll, setShowAll] = useState(true)
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  const handleNoteChange = e => {
    setNewNote(e.target.value)
  }

  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(err => {
        alert(`Note ${note.content} has been deleted from server.`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = e => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit"> Save </button>
      </form>
    </div>
  )
}
export default App