export default class Auth {
  constructor(axios) {
    this.axios = axios
  }

  login(param) {
    return this.axios.$post('/players/login', param)
  }

  register(param) {
    return this.axios.$post('/players/signup', param)
  }
}
