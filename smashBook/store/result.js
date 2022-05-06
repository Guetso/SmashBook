import { getField, updateField } from 'vuex-map-fields'
import consola from 'consola'

export const state = () => ({
  data: null,
  sessions: {
    list: [],
    lastOne: null,
  },
})

export const mutations = {
  updateField,
  setMyResults(state, resultsData) {
    state.myResults = resultsData
  },
  setSessionsResults(state, resultsData) {
    state.sessions.list = resultsData.rows
    state.sessions.lastOne = resultsData.rows[0]
  },
}

export const getters = {
  getField,
  lastOne(state) {
    return state.sessions.lastOne
  },
}

export const actions = {
  getMyResults({ commit, rootState }) {
    consola.info('Fetching user results')
    const myId = rootState.player.myData.id
    return new Promise((resolve, reject) => {
      this.$Result
        .getOnePlayerResults(myId)
        .then((resultsData) => {
          this.dispatch('player/getMyResults', resultsData)
          consola.success('User results fetched')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  getSessionsResults({ commit }, pagination) {
    consola.info('Fetching sessions results')
    return new Promise((resolve, reject) => {
      this.$Result
        .getAllSessionsResults(pagination.itemPerPages, pagination.page)
        .then((resultsData) => {
          commit('setSessionsResults', resultsData.sessions)
          consola.success('Sessions results fetched')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  createResult({ commit }, resultData) {
    consola.info('Updating user results')
    return new Promise((resolve, reject) => {
      this.$Result
        .create(resultData)
        .then((data) => {
          consola.success('User results updated')
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
