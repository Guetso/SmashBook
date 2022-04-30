import consola from 'consola'

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
