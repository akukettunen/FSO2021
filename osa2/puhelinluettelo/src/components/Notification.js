import React from 'react'

const Notification = ({text, type, visible}) => { // type: [ success, alert, danger ]
  const style = {
    width: '500px',
    marginTop: '30px',
    borderRadius: '20px',
    padding: '20px',
    textAling: 'center'
  }

  if(type === 'success') style['backgroundColor'] = 'lightgreen'
  else if(type === 'alert') style['backgroundColor'] = 'yellow'
  else if(type === 'danger') style['backgroundColor'] = 'red'

  return (
    <div style={style}>
      { text }
    </div>
  )
}

export default Notification