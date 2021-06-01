import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  resultsData: {
    stocks: [],
    podium: []
  },
})

export const getters = {
  getField,
}

export const mutations = {
  updateField,
  setMyResults(state, resultsData) {
    state.myResults = resultsData
  },
}

export const actions = {
  getMyResults({ commit, rootState }) {
    const myId = rootState.player.myData.id
    return new Promise((resolve, reject) => {
      this.$Result
        .getOneResults(myId)
        .then((resultsData) => {
          resolve()
          this.dispatch('player/getMyResults', resultsData)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
