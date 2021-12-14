import axios from "axios"
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  let res = axios.post(baseUrl, { username, password })
  return res
}

// eslint-disable-next-line
export default { login }