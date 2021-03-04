export const state = () => ({
  myData: null,
  myResults: { stocks: null, first: null },
})

export const getters = {
  myData(state) {
    return state.myData
  },
  myResults(state) {
    return state.myResults
  },
}

export const mutations = {
  setPlayer(state, playerData) {
    state.myData = playerData
  },
  setMyResults(state, myResults) {
    state.myResults.stocks = myResults.stocks[0]
  },
}

export const actions = {
  getPlayer({ commit }, playerData) {
    commit('setPlayer', playerData)
  },
  getMyResults({ commit }, myResults) {
    commit('setMyResults', myResults)
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
          commit('setPlayer', data.player)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
