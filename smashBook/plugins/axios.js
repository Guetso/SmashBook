import Auth from '~/api/auth'

export default function({ $axios, store }, inject) {
  if (!process.server) {
    const playerId = JSON.parse(localStorage.getItem('vuex'))?.player?.playerId
    const API = $axios.create({
      baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
      headers: {
        'playerid' : `${playerId}`
      }
    })

    API.onRequest((config) => {
      if (config.url.includes('login' || 'signup')) {
        return config
      }

      const token = JSON.parse(localStorage.getItem('vuex'))?.auth?.token
      config.headers.Authorization = token ? `Bearer ${token}` : ''

      return config
    })

    API.onError((error) => {
      if (error.config.url.includes('auth')) {
        return
      }

      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        store.dispatch('auth/logout')
      }
    })

    inject('Auth', new Auth(API))
  }
}