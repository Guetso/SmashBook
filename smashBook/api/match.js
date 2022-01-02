export default class Match {
  constructor(axios) {
    this.axios = axios
  }

  /*   index(params) {
    return this.axios.$get('characters/', { params })
  } */

  getList(params) {
    return this.axios.$get('matches/', { params })
  }

  getPaginedList(itemPerPages, page) {
    return this.axios.$get(`matches/${itemPerPages}&${page}`)
  }

  getInProgress(id, params) {
    return this.axios.$get(`matches/in_progress`, { params })
  }

  create(params) {
    return this.axios.$post('matches', params)
  }

  /*   update(id, params) {
    return this.axios.$put(`players/update/${id}`, params)
  } */

  destroy(id, params) {
    return this.axios.$delete(`matches/${id}`, { params })
  }
}
