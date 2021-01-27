export default class Auth {
  constructor(axios, id, name, email, bio, isAdmin, password, imageUrl) {
    this.axios = axios
    this.id = id
    this.name = name
    this.email = email
    this.bio = bio
    this.isAdmin = isAdmin
    this.password = password
    this.imageUrl = imageUrl
  }

  login(param) {
    return this.axios.$post('/players/login', param)
  }

  register(param) {
    return this.axios.$post('/players/signup', param)
  }
}