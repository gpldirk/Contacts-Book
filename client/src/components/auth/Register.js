

import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
  const alertCtx = useContext(AlertContext)
  const authCtx = useContext(AuthContext)

  const { setAlert } = alertCtx
  const { register, error, clearErrors, isAuthenticated } = authCtx

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error) {
      setAlert(error, 'danger')
      clearErrors()  // important!!!
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])


  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = user;


  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')

    } else {
      register({
        name,
        email,
        password,
      })
    }
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required/>
        </div>

        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>

        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength='6'/>
        </div>

        <div className='form-group'>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required/>
        </div>

        <input type="submit" value="Register" className='btn btn-primary btn-block' />
      </form>
    </div>

  )
}

export default Register
