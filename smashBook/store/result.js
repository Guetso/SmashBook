export const state = () => ({
  data: null,
})

export const mutations = {
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
  createResult({ commit }, resultData) {
    return new Promise((resolve, reject) => {
      this.$Result.create(resultData)
    })
  },
}
