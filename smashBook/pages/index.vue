<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Se connecter:</h2>
    <input v-model="form.name" placeholder="user" />
    <input v-model="form.password" placeholder="mdp" />
    <button type="submit" @click="loginMe">Ok</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { name: '', password: '' },
      errorMessage: null
    }
  },
  methods: {
    loginMe() {
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          console.log('Vous êtes connecté')
        },
        (error) => {
          console.log(error.response.data.message)
          this.errorMessage = error.response.data.message
        }
      )
    }
  }
}
</script>

<style></style>
