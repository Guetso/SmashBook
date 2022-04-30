import { getField, updateField } from 'vuex-map-fields'
import consola from 'consola'
import cloneDeep from 'lodash/cloneDeep'

export const state = () => ({
  matchDatas: {
    participants: [],
    stocks: 1,
  },
  matchsInProgress: [],
  previousMatch: { participants: [], stocks: 1 },
  created: null,
})

export const getters = {
  getField,
  inProgressMatch(state) {
    return state.matchsInProgress
  },
  inProgressMatchId: (state) => (id) => {
    return state.matchsInProgress.find(
      (matchInProgress) => matchInProgress.id === id
    )
  },
  inProgressCount(state) {
    return state.matchsInProgress.length
  },
  createdMatch(state) {
    return state.created
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
  setCreatedMatch(state, matchData) {
    state.created = matchData
  },
  setPreviousMatch(state) {
    state.previousMatch = cloneDeep(state.matchDatas)
  },
  usePreviousMatch(state) {
    state.matchDatas = cloneDeep(state.previousMatch)
  },
  removeInProgressMatch(state, { response, matchId }) {
    const indexToRemove = state.matchsInProgress
      .map((e) => {
        return e.id
      })
      .indexOf(matchId)
    state.matchsInProgress.splice(indexToRemove, 1)
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
  createMatch({ commit, dispatch }, matchDatas) {
    consola.info('Creating new match')
    return new Promise((resolve, reject) => {
      this.$Match
        .create(matchDatas)
        .then((data) => {
          commit('setCreatedMatch', data.matchData)
          commit('setPreviousMatch')
          consola.success('New match created')
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getPreviousMatch({ commit }) {
    commit('usePreviousMatch')
  },
  getMatchsInprogess({ commit }) {
    consola.info('Fetching in progress matches')
    return new Promise((resolve, reject) => {
      this.$Match
        .getInProgress()
        .then((data) => {
          commit('setMatchsInProgress', data.inProgessMatchs)
          consola.info('In progress matches fetched')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  resetMatch({ commit }) {
    commit('resetMatch')
  },
  deleteInProgressMatch({ commit, getters }, matchId) {
    consola.info('Deleting in progress match')
    return new Promise((resolve, reject) => {
      if (getters.inProgressMatchId(matchId)) {
        this.$Match
          .destroy(matchId)
          .then((response) => {
            commit('removeInProgressMatch', { response, matchId })
            consola.success('In progress match deleted')
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
}
