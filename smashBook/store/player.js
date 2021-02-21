export const state = () => ({
  data: null,
})

export const getters = {
  data(state) {
    return state.data
  },
}

export const mutations = {
  setPlayer(state, playerData) {
    state.data = playerData
  },
}

export const actions = {
  getPlayer({ commit }, playerData) {
    commit('setPlayer', playerData)
  },
  logout({ commit }) {
    commit('setPlayer', null)
  },
  update({ commit }, playerData) {
    return new Promise((resolve, reject) => {
      this.$Player
        .update(playerData.id, playerData.form)
        .then((data) => {
          resolve(data)
          dispatch('getPlayer', data.player)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
