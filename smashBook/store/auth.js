import consola from 'consola'

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
  },
}

export const actions = {
  signup({ commit }, form) {
    consola.info('Creating new user')
    return new Promise((resolve, reject) => {
      this.$Auth
        .register(form)
        .then((data) => {
          commit('setConnected', true)
          commit('setToken', data.token)
          this.dispatch('player/getUserDatas', data.player).then(() => {
            consola.success('User created')
            resolve()
            this.$router.push({ path: '/home' })
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  login({ commit }, form) {
    consola.info('Login user')
    return new Promise((resolve, reject) => {
      this.$Auth
        .login(form)
        .then((data) => {
          commit('setConnected', true)
          commit('setToken', data.token)
          this.dispatch('player/getUserDatas', data.player).then(() => {
            consola.success('User logged')
            resolve()
            this.$router.push({ path: '/home' })
          })
        })
        .catch((err) => {
          consola.error('Error while login user')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    commit('purgeAuth')
    this.dispatch('player/logout')
    this.$router.push({ path: '/' })
    consola.success('Logout')
  },
}
