import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    reducer: (state) => ({
      auth: state.auth,
      player: { myData: state.player.myData },
    }),
  }).plugin(store)
}
