import { useState, useEffect } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import axios from "axios";
import contactsService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Khaing'}
    ])

    const [addMessage, setAddMessage] = useState(null)
    const [updateMessage, setUpdateMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [filterName, setFilterName] = useState('')

    const handleFilterName = (name) => {
        setFilterName(name)
    } 

    useEffect(() => {
        contactsService
                .getAll()
                .then(initialContacts => {
                    setPersons(initialContacts)
                })
    }, [])

    function isEqual(obj1, obj2) {
        for (const key in obj1) {
            if(key === 'id')continue
            if(obj1[key] !== obj2[key]) return false
        }

        return true
    }

    function handleUpdatePerson(id, nameObject) {
        if(window.confirm(`${nameObject.name} is already added to phonebook, replace with the new number?`)) {
            contactsService
                    .update(id, nameObject)
                    .then(returnedContact => {
                        const updatePersons = persons.map(person => {
                            if(person.id === returnedContact.id) {
                                person = {...returnedContact}
                            }

                            return person
                        }) 
                        setPersons(updatePersons)
                        setUpdateMessage(`Updated the number of ${returnedContact.name}`)
                        setTimeout(() => {
                            setUpdateMessage(null)
                        }, 5000);
                    })
        }
    }

    const addPerson = (nameObject) => {
        for(let person of persons) {
            if(isEqual(person, nameObject)){
                alert(`${nameObject.name} is alerady existed`)
                return;
            }

            if(person.name === nameObject.name) {
                    handleUpdatePerson(person.id, nameObject);
                    return;
            }
        }

        contactsService
                .create(nameObject)
                .then(retrunedContact => {
                    setPersons(persons.concat(retrunedContact))
                    setAddMessage(`Successfully added ${retrunedContact.name}`);
                    setTimeout(() => {
                        setAddMessage(null)
                    }, 5000)
                })
    }

    function handleDelete(id) {
        contactsService.deleteContact(id)
                .catch(error => {
                    setErrorMessage(`Information is already removed from server`)
                })
        setPersons(persons.filter(person => person.id !== id))

    }

    return(
        <div>
            <Notification message ={addMessage} />
            <Notification message ={updateMessage} />
            <Notification message={errorMessage} color='red' />
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterName={handleFilterName} />
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} />

            <h2>Numbers</h2>
            <Persons persons={persons} filterName={filterName} handleDeletePerson = {handleDelete} />
            
        </div>
    )
}

export default App