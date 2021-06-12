import React, { useReducer } from 'react'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import axios from 'axios'

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from '../type'

const ContactState = (props) => {
  const initialState = {
    contacts: null,  // default to be null
    current: null,
    filtered: null,
    error: null,
    loading: false,
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)


  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })

    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      })
    }
  }
  
  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)
      
      dispatch({
        type: ADD_CONTACT,
        payload: res.data  // newly added contact
      })

    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })

    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      }) 
    }
  }

  // Set current contact
  const setCurrentContact = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  // Clear current contact
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT,
      payload: null,
    })
  }

  // Update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      })

    } catch (err) {

      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    })
  }

  // Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    })
  }

  // Clear contacts after logout
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    })
  }


  return <ContactContext.Provider value={{
    contacts: state.contacts,
    current: state.current,
    filtered: state.filtered,
    error: state.error,
    getContacts,
    addContact,
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
    updateContact,
    filterContacts,
    clearFilter,
    clearContacts
  }}>
    {props.children}
  </ContactContext.Provider>
}



export default ContactState;