import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  list: [],
})

export const getters = {
  getField,
  charactersList(state) {
    return state.list
  },
  characterSelect: (state) => (id) => {
    return state.list.find((character) => character.id === id)
  },
}

export const mutations = {
  updateField,
  setCharacters(state, charactersData) {
    state.list = charactersData
  },
}

export const actions = {
  getCharacters({ commit }) {
    return new Promise((resolve, reject) => {
      this.$Character.index().then((characters) => {
        commit('setCharacters', characters.characters)
      })
    })
  },
}
