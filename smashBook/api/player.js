export default class Player {
  constructor(axios) {
    this.axios = axios
  }

/*   index(params) {
    return this.axios.$get('api/admin/users', { params })
  } */

/*   create(params) {
    return this.axios.$post('api/admin/users', params)
  } */

  update(id, params) {
    return this.axios.$put(`players/update/${id}`, params)
  }

/*   destroy(id) {
    return this.axios.delete(`api/admin/users/${id}`)
  } */
}