export default class Result {
  constructor(axios) {
    this.axios = axios
  }

  index(params) {
    return this.axios.$get('results/stock', { params })
  }

  getOneStocks(id, params) {
    return this.axios.$get(`results/stock/${id}`, { params })
  }

  /*   create(params) {
    return this.axios.$post('api/admin/users', params)
  } */

  /*   update(id, params) {
    return this.axios.$put(`players/update/${id}`, params)
  } */

  /*   destroy(id) {
    return this.axios.delete(`api/admin/users/${id}`)
  } */
}