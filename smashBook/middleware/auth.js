export default function({ route, redirect, store, error }) {
  if (!store.state.auth.connected) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
    return redirect('/')
  }
  if (store.state.auth.connected && route.path === '/') {
    return redirect(301, '/home')
  }
}
