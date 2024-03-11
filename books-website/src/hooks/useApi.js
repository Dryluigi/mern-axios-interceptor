import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios/instance'

function useApi() {
  const navigate = useNavigate()

  const execute = useCallback(async (url, method, data) => {
    try {
      const res = await axiosInstance({
        url,
        method,
        data,
      })

      return res
    } catch (e) {
      if (e.response.status === 401) {
        localStorage.clear('access_token')
        localStorage.clear('refresh_token')

        navigate('/login')
      }
      return Promise.reject(e)
    }
  }, [navigate])

  return {
    execute
  }
}

export default useApi