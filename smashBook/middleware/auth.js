export default function({ route, redirect, store, error }) {
  if (!process.server) {
    const connected = JSON.parse(localStorage.getItem('vuex'))?.auth?.connected
    const urlDetail = route.path.split('/')
    if (!connected && urlDetail[1]) {
      return redirect('/')
    }
    if (connected && !urlDetail[1]) {
      return redirect('/home')
    }
  }
}
