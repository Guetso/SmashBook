import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      reducer: (state) => ({ application: state.application, auth: state.auth, player: state.player.data })
    }).plugin(store)
  })
}
