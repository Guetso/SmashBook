export default class Result {
  constructor(axios) {
    this.axios = axios
  }

  getAllPlayersStocks(params) {
    return this.axios.$get('results/stock', { params })
  }

  getAllSessionsResults(itemPerPages, page) {
    return this.axios.$get(`results/sessions/${itemPerPages}&${page}`)
  }

  getOnePlayerResults(id, params) {
    return this.axios.$get(`results/players/${id}`, { params })
  }

  getPaginedList(itemPerPages, page) {
    return this.axios.$get(`results/${itemPerPages}&${page}`)
  }

  create(params) {
    return this.axios.$post('results', params)
  }

  /*   update(id, params) {
    return this.axios.$put(`players/update/${id}`, params)
  } */

  /*   destroy(id) {
    return this.axios.delete(`api/admin/users/${id}`)
  } */
}
