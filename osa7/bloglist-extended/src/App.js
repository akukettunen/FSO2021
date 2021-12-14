import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initBlogs, addBlog, like, deleteBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, initUser } from './reducers/userReducer'
import { TextField, Button, Card, CardContent, CardActions, Typography, Container } from '@mui/material'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const toggleableRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  // useEffect(() => {
  //   dispatch(initUser())
  //   alert('user: ', JSON.stringify(user))
  //   if(user && user.token) {
  //     blogService.setToken(user.token)
  //     dispatch(initBlogs())
  //   }
  // }, [])

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      await dispatch(initUser(loggedUserJSON))
    }

    if(loggedUserJSON) {
      blogService.setToken(loggedUserJSON.token)
      dispatch(initBlogs())
    }
  }, [])

  const notification = async ({ type, text, duration }) => {
    dispatch(showNotification({ type, text, duration, visible: true }))
  }

  const logout = () => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    dispatch(logoutUser())
    notification({ type: 'success', text: 'logged out' })
  }

  const login = () => {
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    dispatch(initBlogs())
  }

  const newBlog = ({ e, blogAuthor, blogTitle, blogUrl }) => {
    e.preventDefault()
    dispatch(addBlog({ author: blogAuthor, title: blogTitle, url: blogUrl }))

    toggleableRef.current.toggleVisibility()
  }

  const liked = blog => {
    dispatch(like(blog))
  }

  const deleted = id => {
    dispatch(deleteBlog(id))
  }


  return (
    <Container>
      <Typography sx={{ my: 2 }} gutterBottom variant="h3" component="div">blogs.io</Typography>
      {
        !user &&
          <Card>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>
              <TextField placeholder="username" id="username" value={username} onChange={({ target }) => setUsername(target.value)} /><br></br>
              <TextField placeholder="*******" id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </CardContent>
            <CardActions>
              <Button id="loginButton" onClick={login}>login</Button>
            </CardActions>
          </Card>
      }
      {
        <Notification></Notification>
      }
      {
        user &&
            <>
              <Typography gutterBottom variant="h5" component="div">{ user.username }</Typography> <Button onClick={logout}>logout</Button>
              <Toggleable buttonLabel="show form" ref={toggleableRef}>
                <div style={{ 'marginBottom': '30px' }}>
                  <BlogForm addBlog={newBlog}></BlogForm>
                </div>
              </Toggleable>
              {
                [...blogs].sort((a, b) => {return b.likes - a.likes}).map(blog =>
                  <Blog key={blog.id} blog={ blog } liked={() => liked(blog)} deleted={() => deleted(blog.id)} />
                )
              }
            </>
      }
    </Container>
  )
}

export default App