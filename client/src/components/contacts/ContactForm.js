
import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  })

  const contactCtx = useContext(ContactContext)
  const { addContact, current, clearCurrentContact, updateContact } = contactCtx

  // set form data using current contact
  useEffect(() => {
    if (current) {
      setContact(current)
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      })
    }

  }, [contactCtx, current]) 

  const { name, email, phone, type } = contact

  // very important !!!
  const onChange = (event) => {
    setContact({...contact, [event.target.name]: event.target.value}) // [] -> attr
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (current) {
      updateContact(contact)
    } else {
      console.log(contact)
      addContact(contact)
    }

    clearAll()
  }

  const clearAll = () => {
    clearCurrentContact()

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{ current ? "Update Contact": "Add Contact"}</h2>
      <input type="text" placeholder='Name' name="name" value={name} onChange={onChange} />
      <input type="email" placeholder='Email' name="email" value={email} onChange={onChange} />
      <input type="text" placeholder='Phone' name="phone" value={phone} onChange={onChange} />

      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'}  onChange={onChange} /> Professional {' '}

      <div>
        <input type="submit" 
          value={ current ? "Update Contact": "Add Contact"} 
          className='btn btn-primary btn-block' 
        />
      </div>

      { current && <div>
        <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
      </div>
      }
    </form>
  )
}

export default ContactForm
