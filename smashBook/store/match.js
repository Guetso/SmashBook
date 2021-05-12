import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  matchDatas: {
    participants: [],
    stocks: 1,
  },
  matchsInProgress: [],
})

export const getters = {
  getField,
  inProgressMatch(state) {
    return state.matchsInProgress
  },
  inProgressCount(state) {
    return state.matchsInProgress.length
  },
}

export const mutations = {
  updateField,
  setParticipants(state, participants) {
    state.matchDatas.participants = participants
  },
  setCharacter(state, changeDatas) {
    state.matchDatas.participants[changeDatas.participantKey].character =
      changeDatas.characterId
  },
  unsetCharacter(state, participantKey) {
    state.matchDatas.participants[participantKey].character = null
  },
  setStocks(state, value) {
    state.matchDatas.stocks += value
    if (state.matchDatas.stocks <= 0) {
      state.matchDatas.stocks = 1
    }
    if (state.matchDatas.stocks > 99) {
      state.matchDatas.stocks = 99
    }
  },
  resetMatch(state) {
    state.matchDatas.participants = []
    state.matchDatas.stocks = 1
  },
  setMatchsInProgress(state, list) {
    state.matchsInProgress = list
  },
}

export const actions = {
  addParticipants({ commit }, participants) {
    commit('setParticipants', participants)
  },
  changeCharacter({ commit }, changeDatas) {
    commit('setCharacter', changeDatas)
  },
  unselectCharacter({ commit }, participantKey) {
    commit('unsetCharacter', participantKey)
  },
  changeStocks({ commit }, value) {
    commit('setStocks', value)
  },
  createMatch({ commit }, matchDatas) {
    return new Promise((resolve, reject) => {
      this.$Match
        .create(matchDatas)
        .then((data) => {
          resolve(data)
        })
        .then(() => {
          commit('resetMatch')
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getMatchsInprogess({ commit }) {
    return new Promise((resolve, reject) => {
      this.$Match
        .getInProgress()
        .then((data) => {
          commit('setMatchsInProgress', data.inProgessMatchs)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
