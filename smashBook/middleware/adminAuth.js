export default function({ route, redirect, store, error }) {
  if (store.state.auth.connected && !store.state.player.data.isAdmin) {
    return redirect('/home')
  }
}
