

import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alert/AlertContext'

const Login = (props) => {
  const authCtx = useContext(AuthContext)
  const alertCtx = useContext(AlertContext)

  const { login, error, clearErrors, isAuthenticated } = authCtx
  const { setAlert } = alertCtx

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/home')
    }
    
    if (error) {
      setAlert(error, 'danger')
      clearErrors()
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user;
  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }
  const onSubmit = (event) => {
    event.preventDefault()
    login({
      email, 
      password,
    })
  }

  

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>

        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength='6'/>
        </div>

        <input type="submit" value="Login" className='btn btn-primary btn-block' />
      </form>
    </div>

  )
}

export default Login
