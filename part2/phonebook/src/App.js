import { useEffect, useState } from 'react'
import axios from 'axios'

const Phonebook = ({contacts}) => contacts.map(contact => <Contact key={contact.name} contact={contact} />)
const Contact = ({contact}) => <div> {contact.name} {contact.number} </div>
const Heading = ({text}) => <h1>{text}</h1>
const Filter = ({value,handler}) => (
  <>
    Filter Shown by <input value={value} onChange={handler} />
  </>
) 
const ContactForm = ({valName, valNumber, handleName, handleNumber, handleAdd}) => (
  <form>
    <div>
      Name: <input value={valName} onChange={handleName}/>
    </div>
    <div>
      Number: <input value={valNumber} onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit" onClick={handleAdd}>Add</button>
    </div>
  </form>
)
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Input Name')
  const [newNumber, setNewNumber] = useState('Input Number')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook,[])
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
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <Heading text="Phonebook" />
      <Filter value={filter} handler={handleFilter} />
      <Heading text="Add New" />
      <ContactForm 
        valName={newName}
        valNumber={newNumber}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        handleAdd={addPerson}
      />
      <Heading text="Numbers" />
      <Phonebook contacts={personsToShow} />
    </div>
  )
}

export default App