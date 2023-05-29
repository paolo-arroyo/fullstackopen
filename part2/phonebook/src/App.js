import { useState } from 'react'

const Phonebook = ({contacts}) => contacts.map(contact => <div key={contact.name}> {contact.name} </div>)

const App = () => {
  const [persons, setPersons] = useState([{ name: '' }]) 
  const [newName, setNewName] = useState('Input Name')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook contacts={persons} />
    </div>
  )
}

export default App