export default class Player {
  constructor(axios, id, name, email, bio, isAdmin, password, imageUrl, favChar) {
    this.axios = axios
    this.id = id
    this.name = name
    this.email = email
    this.bio = bio
    this.isAdmin = isAdmin
    this.password = password
    this.imageUrl = imageUrl
    this.favChar = favChar
  }

/*   index(params) {
    return this.axios.$get('api/admin/users', { params })
  } */

/*   create(params) {
    return this.axios.$post('api/admin/users', params)
  } */

  update(id, params) {
    return this.axios.$put(`players/${id}`, params)
  }

/*   destroy(id) {
    return this.axios.delete(`api/admin/users/${id}`)
  } */
}