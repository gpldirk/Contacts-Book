
import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import {
  SET_ALERT,
  REMOVE_ALERT,
} from '../type'


const AlertState = (props) => {
  const initialState = []   // array of alerts

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  // Set alert
  const setAlert = (msg, type) => {
    const id = uuidv4()

    dispatch({
      type: SET_ALERT,
      payload: {
        type,
        msg,
        id
      }
    })

    setTimeout(() => {  // remove alert after 3s
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      })
    }, 3000)
  }

  return <AlertContext.Provider value={{
    alerts: state,
    setAlert,
  }}>
    {props.children}
  </AlertContext.Provider>
}

export default AlertState;