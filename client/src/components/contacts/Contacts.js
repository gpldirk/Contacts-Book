

import React, { useContext, Fragment, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
  const contactsCtx = useContext(ContactContext)
  const { contacts, filtered, getContacts, loading } = contactsCtx

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add contacts</h4>
  }

  return (
    <Fragment>
      { contacts !== null && !loading ? 

        <TransitionGroup>
        { filtered ? filtered.map(contact => (
            <CSSTransition key={contact._id} classNames='item' timeout={500}>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
          
          : contacts.map(contact => (
            <CSSTransition key={contact._id} classNames='item' timeout={500}>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        }
        </TransitionGroup>

      : <Spinner />}
      
    </Fragment>
  )
}

export default Contacts
