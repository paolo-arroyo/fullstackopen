import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({message,style}) => {
  if (message === null) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note App, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Create New Note")
  const [showAll, setShowAll] = useState(true)
  const [notif, setNotif] = useState(null)
  const [notifStyle, setNotifStyle] = useState({})

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

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
        setNotif(`Note '${note.content}' has been changed`)
        setNotifStyle(successStyle)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch(error => {
        setNotif(`Note '${note.content}' was already removed from the server.`)
        setNotifStyle(errorStyle)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
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
      <Notification message={notif} style={notifStyle} />
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
      <Footer />
    </div>
  )
}
export default App