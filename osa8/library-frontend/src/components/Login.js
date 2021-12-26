import React, { useState } from 'react'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  if(!props.show) return ''

  return (
    <div style={{marginTop: '20px'}}>
      <input onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="username"></input><br></br>
      <input onChange={() => { setPassword('secret') }} value={password} placeholder="passsword which is 'secret'"></input><br></br>
      <button onClick={() => props.login({username, password})}>lessgooo</button>
    </div>
  )
}

export default Login