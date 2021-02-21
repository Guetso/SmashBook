import Auth from '~/api/auth'
import Player from '~/api/player'

export default function({ $axios, store, $config:{ baseURL} }, inject) {
  if (!process.server) {
    const playerId = JSON.parse(localStorage.getItem('vuex'))?.player?.playerId
    const API = $axios.create({
      baseURL, // nuxt.config.js
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        playerid: `${playerId}`,
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
      if (error.config.url.includes('login' || 'signup')) {
        return
      }

      if (error) {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
          store.dispatch('auth/logout')
        }
      }
    })

    inject('Auth', new Auth(API))
    inject('Player', new Player(API))
  }
}
