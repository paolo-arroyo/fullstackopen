import { useEffect, useState } from 'react'
import phoneService from './services/phoneService'

const Phonebook = ({contacts, handleDelete}) => contacts.map(contact => <Contact key={contact.id} contact={contact} handleDelete={handleDelete} />)
const Contact = ({contact, handleDelete}) => <div> {contact.name} {contact.number} <button onClick={() => handleDelete(contact.id)}>Delete</button> </div>
const Heading = ({text}) => <h1>{text}</h1>
const Filter = ({value,handler}) => (<> Filter Shown by <input value={value} onChange={handler} /></>) 
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
const Notification = ({message,style}) => {
  if (message === null) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Input Name')
  const [newNumber, setNewNumber] = useState('Input Number')
  const [filter, setFilter] = useState('')
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
    phoneService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }
  useEffect(hook,[])

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const checkExisting = persons.some(person => person.name === newName)
    if (checkExisting) {
      const person = persons.find(p => p.name === newName)
      const updatedPerson = {...person, number: newNumber}
      if (window.confirm(`${person.name} is already in the Phonebook. Replace the old number with the new one?`)) {
        phoneService
          .update(person.id, updatedPerson)
          .then(returned =>{
            setPersons(persons.map(p => p.id !== person.id ? p : returned))
            setNotif(`${person.name} has been successfully changed.`)
            setNotifStyle(successStyle)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
          })
          .catch(error => {
            setNotif(`Information on '${updatedPerson.name} has already been deleted from server.`)
            setNotifStyle(errorStyle)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })
      }
    } else {
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotif(`${returnedPerson.name} has been successfully added.`)
          setNotifStyle(successStyle)
          setTimeout(() => {
            setNotif(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} from Phonebook?`)) phoneService.remove(id)
    setPersons(persons.filter(p => p.id !== id))
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
      <Notification message={notif} style={notifStyle} />
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
      <Phonebook contacts={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App