import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    
    config.headers['Cache-Control'] = 'no-cache'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    try {
      if (error.response.status === 401 && !error.config._refreshing) {
        const refreshToken = localStorage.getItem('refresh_token')
  
        error.config._refreshing = true
        const refreshResponse = await instance.post("http://localhost:3001/auth/refresh", {
          refresh_token: refreshToken
        })
  
        localStorage.setItem('access_token', refreshResponse.data.data.access_token)

        return instance(error.config)
      }
      return Promise.reject(error)
    } catch (e) {
      return Promise.reject(error)
    }
  }
)

export default instance