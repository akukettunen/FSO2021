import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${ newToken }`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const post = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const deleteBlog = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  let url = baseUrl + `/${id}`

  const res = await axios.delete(url, config)
  return res.data
}

const put = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  let url = baseUrl + `/${blog.id}`

  const res = await axios.put(url, { blog }, config)
  return res.data
}

// eslint-disable-next-line
export default { getAll, setToken, post, put, deleteBlog }