import React, { useEffect } from 'react'

import './css/NewUserDisplay.css'

const NewUserDisplay = ({ newUserAlert, setNewUserAlert }) => {
  useEffect(() => {
    if (newUserAlert) {
      setTimeout(() => {
        setNewUserAlert(false)
      }, 3000)
    }
  }, [newUserAlert])

  return (
    <span className="new-user_alert ">
      {newUserAlert ? <p className="fadeInBottom">A new user has joined your team!</p> : null}
    </span>
  )
}

export default NewUserDisplay
