import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: '', type: 'success', visible: false })
  const toggleableRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  const showNotification = ({ type, text, duration }) => {
    duration = duration || 3000
    setNotification({ type, text, visible: true })
    setTimeout(() => {
      setNotification({ type: 'success', text: '', visible: false })
    }, duration)
  }

  const logout = () => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
    showNotification({ type: 'success', text: 'logged out' })
  }

  const login = () => {
    loginService.login({ username, password })
      .then(e => {
        setUser(e.data)
        setUsername('')
        setPassword('')
        window.localStorage.setItem('blogUser', JSON.stringify(e.data))
        blogService.setToken(e.data.token)
        showNotification({ type: 'success', text: 'kirjautuminen onnistui!' })
      })
      .catch(e => {
        showNotification({ type: 'alert', text: e.response.data.error })
      })
  }

  const addBlog = ({ e, blogAuthor, blogTitle, blogUrl }) => {
    e.preventDefault()
    blogService.post({ author: blogAuthor, title: blogTitle, url: blogUrl })
      .then(e => {
        setBlogs(blogs.concat(e))
        showNotification({ type: 'success', text: 'blogin lisääminen onnistui!' })
      })
      .catch(e => {
        showNotification({ type: 'success', text: e.response.data.error })
      })

    toggleableRef.current.toggleVisibility()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const liked = blog => {
    blogService.put({ ...blog, likes: blog.likes + 1 })
      .then(() => {
        let new_blogs = blogs
        let index = blogs.findIndex(e => e.id === blog.id)
        if(index < 0) throw 'Blogia ei löydy!'
        new_blogs[index].likes = new_blogs[index]['likes'] + 1
        setBlogs(new_blogs)

        showNotification({ type: 'success', text: 'Tykätty!' })
      })
      .catch(() => {
        showNotification({ type: 'alert', text: 'Tykkääminen meni pieleen!' })
      })
  }

  const deleted = id => {
    blogService.deleteBlog(id)
      .then(() => {
        let new_blogs = blogs.filter(e => e.id !== id)
        setBlogs(new_blogs)
        showNotification({ type: 'success', text: 'Poistettu!' })
      })
      .catch((e) => {
        console.log(e)
        showNotification({ type: 'alert', text: 'Poistaminen meni pieleen!' })
      })
  }


  return (
    <div>
      <h2>blogs</h2>
      {
        !user &&
          <div>
            <h4>login</h4>

            <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} /><br></br>
            <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            <button id="loginButton" onClick={login}>login</button>
          </div>
      }
      {
        notification.visible &&
        <Notification text={notification.text} type={notification.type}></Notification>
      }
      {
        user &&
            <>
              { user.username } <button onClick={logout}>logout</button>
              <Toggleable buttonLabel="show form" ref={toggleableRef}>
                <div style={{ 'marginBottom': '30px' }}>
                  <BlogForm addBlog={addBlog}></BlogForm>
                </div>
              </Toggleable>
              {
                [...blogs].sort((a, b) => {return b.likes - a.likes}).map(blog =>
                  <Blog key={blog.id} blog={ blog } liked={() => liked(blog)} deleted={() => deleted(blog.id)} />
                )
              }
            </>
      }
    </div>
  )
}

export default App