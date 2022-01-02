export default class Session {
  constructor(axios) {
    this.axios = axios
  }

  getOne(id) {
    return this.axios.$get(`sessions/${id}`)
  }
}
