export const state = () => ({
  myData: null,
  myResults: { stocks: 0, podiums: 0, participations: 0 },
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
    state.myResults.stocks = myResults.results.stocks[0].totalStocks
    state.myResults.podiums = myResults.results.podium[0]
    state.myResults.participations = myResults.results.participations[0].participations
  },
  purgePlayer(state) {
    state.myData = {}
    state.myResults = {}
  }
}

export const actions = {
  getPlayer({ commit }, playerData) {
    commit('setPlayer', playerData)
  },
  getMyResults({ commit }, myResults) {
    commit('setMyResults', myResults)
  },
  logout({ commit }) {
    commit('purgePlayer')
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
