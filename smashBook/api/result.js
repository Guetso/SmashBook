export default class Result {
  constructor(axios) {
    this.axios = axios
  }

  index(params) {
    return this.axios.$get('results/stock', { params })
  }

  getOneResults(id, params) {
    return this.axios.$get(`results/${id}`, { params })
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