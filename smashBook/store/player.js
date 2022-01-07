import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  myData: null,
  myResults: { stocks: 0, podiums: 0, participations: 0 },
  players: [],
})

export const getters = {
  getField,
  myData(state) {
    return state.myData
  },
  myResults(state) {
    return state.myResults
  },
  players(state) {
    return state.players
  },
}

export const mutations = {
  updateField,
  setPlayer(state, playerData) {
    state.myData = playerData
  },
  setAllPlayers(state, playersData) {
    state.players = playersData
  },
  setMyResults(state, myResults) {
    state.myResults.stocks = myResults.results.stocks[0].totalStocks
    state.myResults.podiums = myResults.results.podium[0]
    state.myResults.participations =
      myResults.results.participations[0].participations
  },
  purgePlayer(state) {
    state.myData = {}
    state.myResults = {}
  },
}

export const actions = {
  getPlayer({ commit }, playerData) {
    commit('setPlayer', playerData)
  },
  getAllplayers({ commit }) {
    return new Promise((resolve, reject) => {
      this.$Player
        .index()
        .then((players) => {
          commit('setAllPlayers', players.players)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
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
