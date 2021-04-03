export const state = () => ({
  list: [],
})

export const getters = {
  charactersList(state) {
    return state.list
  }
}

export const mutations = {
  setCharacters(state, charactersData) {
    state.list = charactersData
  },
}

export const actions = {
  getCharacters({ commit }) {
    return new Promise((resolve, reject) => {
      this.$Character.index()
      .then((characters)=> {
        commit('setCharacters', characters.characters)
      })
    })
  },
}
