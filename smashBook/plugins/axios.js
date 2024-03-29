import Auth from '~/api/auth'
import Player from '~/api/player'
import Character from '~/api/character'
import Match from '~/api/match'
import Result from '~/api/result'
import Session from '~/api/session'

export default function({ $axios, store, $config: { baseURL } }, inject) {
  if (!process.server) {
    const API = $axios.create({
      baseURL, // nuxt.config.js
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        playerid: ``,
      },
    })

    API.onRequest((config) => {
      if (config.url.includes('login' || 'signup')) {
        return config
      }

      const token = JSON.parse(localStorage.getItem('vuex'))?.auth?.token
      config.headers.Authorization = token ? `Bearer ${token}` : ''

      const playerId = JSON.parse(localStorage.getItem('vuex'))?.player?.myData
        .id
      config.headers.playerid = playerId ? `${playerId}` : ''

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
    inject('Character', new Character(API))
    inject('Match', new Match(API))
    inject('Result', new Result(API))
    inject('Session', new Session(API))
  }
}
