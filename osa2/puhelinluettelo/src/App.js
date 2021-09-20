import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState({type: 'success', visible: false, text: ''})

  useEffect(() => {
    personService
      .getAll()
        .then(e => {
          setPersons(e)
        })
        .catch(e => {
          alert('Jotain meni vikaan henkilöitä haettaessa :(')
        })
  }, [])

  const addName = (e) => {
    e.preventDefault()

    if( persons.map(e => e.name).includes(newName) ) {
      const conf = window.confirm(`${newName} on jo. Vaihdetaanko numero?`)
      if(!conf) return

      const old = persons.find(person => person.name === newName)

      personService.update(old.id, {name: newName, number: newNum})
        .then(e => {
          setPersons(persons.map(person => person.id !== e.id ? person : e))
          flashNotification({duration: 3000, text: `Numero päivitetty henkilölle ${e.name}`, type: 'success'})
          setNewName('')
          setNewNum('')
        })
        .catch(e => {
          flashNotification({duration: 3000, text: `Jotain meni vikaan numeroa päivittäessä :/`, type: 'success'})
        })

      return
    }

    personService
      .create({name: newName, number: newNum})
        .then(e => {
          setPersons(persons.concat(e))
          flashNotification({duration: 3000, text: `Uusi henkilö lisätty: ${e.name}`, type: 'success'})
        })
        .catch(e => {
          flashNotification({duration: 3000, text: 'Jotain meni vikaan henkilöä lisättäessä', type: 'danger'})
        })
    
    setNewName('')
    setNewNum('')
  }

  const deletePerson = (person) => {
    const confirmation = window.confirm(`Haluatko poistaa henkilön ${person.name}`)
    if(confirmation) {
      personService
        .deletePerson(person.id)
          .then(e => {
            flashNotification({duration: 3000, text: `Henkilö poistettu`, type: 'alert'})
            setPersons(persons.filter(p => p.id !== person.id))
          })
          .catch(a => {
            flashNotification({duration: 3000, text: 'Jotain meni vikaan henkilöä poistettaessa', type: 'danger'})
          })
    }
  }

  const changeName = (e) => {
    let newNewName = e.target.value
    setNewName(newNewName)
  }

  const changeNum = (e) => {
    let newNewNum = e.target.value
    setNewNum(newNewNum)
  }

  const changeFilter = (e) => {
    let newFilter = e.target.value
    setFilter(newFilter)
  }

  const flashNotification = ({type, text, duration}) => {
    setNotification({type, text, visible: true})

    setTimeout(() => {
      setNotification({type, text, visible: false})  
    }, duration)
  }

  const showing = persons.filter(person => { return person.name.toLowerCase().includes(filter.toLowerCase()) } )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={changeFilter} value={filter} />
      <h4>+ Add number</h4>
      <AddNumber
        onSubmit={addName}
        onChangeName={changeName}
        onChangeNumber={changeNum}
        valueName={newName}
        valueNumber={newNum}
      />
      {
        notification.visible && (
          <Notification type={notification.type} text={notification.text} />
        )
      }
      <List deletePerson={deletePerson} showing={showing}/>
    </div>
  )
}

const Filter = ({onChange, value}) =>       
  <div>
    filter: <input onChange={onChange} value={value} />
  </div>

const AddNumber = ({onSubmit, onChangeName, onChangeNumber, valueName, valueNumber}) => 
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onChangeName} value={valueName} />
    </div>
    <div>
      phonenumber: <input onChange={onChangeNumber} value={valueNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const List = ({showing, deletePerson}) => {
  return(
    <>
      <h2>Numbers</h2>
      {
        showing.map((person, i) => {
          return (
            <div key={person.name + i}>
              <span>
                { person.name }
              </span>
              <span style={{marginLeft: '10px'}} >
                { person.number }
              </span>
              <button onClick={() => deletePerson(person)} style={{marginLeft: '10px'}}>delete</button>
            </div>
          )
        })
      }
    </>
  )
}

export default App