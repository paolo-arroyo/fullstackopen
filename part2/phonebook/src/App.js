import { useState } from 'react'

const Phonebook = ({contacts}) => contacts.map(contact => <div key={contact.name}> {contact.name} {contact.number} </div>)

const App = () => {
  const [persons, setPersons] = useState([{ name: '', number: '' }]) 
  const [newName, setNewName] = useState('Input Name')
  const [newNumber, setNewNumber] = useState('Input Number')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const checkExisting = persons.some(person => person.name === newName)
    checkExisting ? alert(`${newName} is already in the phonebook.`) : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}/>
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