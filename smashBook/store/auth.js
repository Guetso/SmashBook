export const state = () => ({
  connected: false,
  token: '',
  player: null
})

export const mutations = {
  setConnected(state, bool) {
    state.connected = bool
  },
  setToken(state, token) {
    state.token = token
  },
  setPlayer(state, player) {
    state.player = player
  }
}

export const actions = {
  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      this.$Auth
        .login(form)
        .then((data) => {
          /**
           * Example data 19/10/2020
           *
           * {
            "pseudo": "string",
            "activated": true,
            "locked": true,
            "profileCompleted": true,
            "barAdmin": true,
            "ambassador": true,
            "lastVisitedLeagueId": 0,
            "preferedLeagueId": 0,
            "token": "string"
            }
           */
          resolve()
          commit('setConnected', true)
          commit('setToken', data.token)
          commit('setPlayer', data.player)
          this.$router.push({ path: '/home' })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    commit('setConnected', false)
    commit('setToken', '')
    this.$router.push({ path: '/' })
  }
}
