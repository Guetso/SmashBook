export default function({ redirect, store }) {
  if (!process.server) {
    const connected = JSON.parse(localStorage.getItem('vuex'))?.auth?.connected
    if (connected) {
      return redirect(301, '/home')
    }
  }
}
