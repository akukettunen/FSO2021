import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'LIKE': {
      let new_blogs = [...state]
      let index = new_blogs.findIndex(e => e.id === action.data.id)
      if(index < 0) throw 'Blogia ei löydy!'
      new_blogs[index].likes = new_blogs[index]['likes'] + 1
      return new_blogs
    } case 'DELETE': {
      let new_blogs = state.filter(e => e.id !== action.data.id)
      return new_blogs
    }
    default:

    return state
  }
}

export const addBlog = ({ author, title, url }) => {
  return async dispatch => {
    blogService.post({ author, title, url })
      .then(e => {
        dispatch({ type: 'ADD', data: e })
        dispatch(showNotification({ type: 'success', text: 'Blogi lisätty!', duration: 5000, visible: true }))
      })
      .catch(e => {
        dispatch(showNotification({ type: 'success', text: e.response ? e.response.data.error : 'Jotain meni vikaan :(' }))
      })
  }
}

export const like = (blog) => {
  return async dispatch => {
    blogService.put({ ...blog, likes: blog.likes + 1 })
      .then(() => {
        dispatch({
          type: 'LIKE',
          data: { id: blog.id }
        })

        dispatch(showNotification({ type: 'success', text: 'Tykätty!', duration: 5000, visible: true }))
      })
      .catch(() => {
        dispatch(showNotification({ type: 'alert', text: 'Tykkääminen meni pieleen!', duration: 5000, visible: true  }))
      })

  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    blogService.deleteBlog(id)
      .then(() => {
        // let new_blogs = blogs.filter(e => e.id !== id)
        // setBlogs(new_blogs)
        dispatch({
          type: 'LIKE',
          data: { id }
        })
        dispatch(showNotification({ type: 'success', text: 'Poistettu!', duration: 5000, visible: true }))
      })
      .catch(() => {
        dispatch(showNotification({ type: 'alert', text: 'Poistaminen meni pieleen!', duration: 5000, visible: true  }))
      })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    blogService.getAll().then(blogs => {
      dispatch({
        type: 'INIT',
        data: blogs
      })
    })
  }
}

export default reducer