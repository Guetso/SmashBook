export default function({ route, redirect, store, error }) {
  if (store.state.auth.connected && !store.state.auth.player.isAdmin) {
    return redirect('/home')
  }
}