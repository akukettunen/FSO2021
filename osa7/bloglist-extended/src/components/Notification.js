import React from 'react'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'
const Notification = () => { // type: [ success, alert, danger ]
  const notification = useSelector(state => state.notification)

  const style = {
    width: '500px',
    marginTop: '30px',
    borderRadius: '20px',
    padding: '20px',
    textAling: 'center'
  }

  if(notification.type === 'success') style['backgroundColor'] = 'lightgreen'
  else if(notification.type === 'alert') style['backgroundColor'] = 'yellow'
  else if(notification.type === 'danger') style['backgroundColor'] = 'red'

  return (
    <>
      {
        notification.visible &&
        <Alert sx={{ my: 2 }} severity={notification.type}>{ notification.text }</Alert>
      }
    </>
  )
}

export default Notification