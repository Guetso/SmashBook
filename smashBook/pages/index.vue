<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Se connecter:</h2>
    <input v-model="form.name" placeholder="user" />
    <input v-model="form.password" placeholder="mdp" />
    <button type="submit" @click="loginMe">Ok</button>
    <button @click="logMeOut">Se déconnecter</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { name: '', password: '' }
    }
  },
  methods: {
    loginMe() {
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          console.log('Vous êtes connecté', response)
        },
        (error) => {
          console.log(error)
        }
      )
    },
    logMeOut() {
      this.$store.dispatch('auth/logout').then(
        (response) => {
          console.log('Vous êtes déconnecté')
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}
</script>

<style></style>
