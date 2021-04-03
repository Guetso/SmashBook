export const state = () => ({
  connected: false,
  token: '',
})

export const mutations = {
  setConnected(state, bool) {
    state.connected = bool
  },
  setToken(state, token) {
    state.token = token
  },
  purgeAuth(state) {
    state.connected = false
    state.token = ''
  }
}

export const actions = {
  signup({ commit }, form) {
    return new Promise((resolve, reject) => {
      this.$Auth
        .register(form)
        .then((data) => {
          console.log('ok')
          resolve()
          commit('setConnected', true)
          commit('setToken', data.token)
          this.dispatch('player/getPlayer', data.player)
          this.$router.push({ path: '/home' })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      this.$Auth
        .login(form)
        .then((data) => {
          resolve()
          commit('setConnected', true)
          commit('setToken', data.token)
          this.dispatch('player/getPlayer', data.player)
          this.$router.push({ path: '/home' })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    commit('purgeAuth')
    this.dispatch('player/logout')
    this.$router.push({ path: '/' })
  },
}
