

import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFilter = () => {
  const contactCtx = useContext(ContactContext)
  const { filterContacts, clearFilter, filtered} = contactCtx

  const textRef = useRef('')

  useEffect(() => {
    if (!filtered) {
      textRef.current.value = '';
    }

  }, [contactCtx, filtered])

  const onChange = (event) => {
    const text = textRef.current.value
    if (text.trim() !== '') {
      filterContacts(event.target.value)
    } else {
      clearFilter();
    }
  } 

  const onSubmit = (event) => {
    event.preventDefault()
    
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={textRef} placeholder='Filter Contacts...' onChange={onChange} /> 
    </form>
  )
}

export default ContactFilter
