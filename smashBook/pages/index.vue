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
  layout: 'intro',
  data() {
    return {
      form: { name: '', password: '' },
      errorMessage: null
    }
  },
  methods: {
    loginMe() {
      this.$nuxt.$loading.start()
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          this.$nuxt.$loading.finish()
          console.log('Vous êtes connecté')
        },
        (error) => {
          if (error.response) {
            this.$nuxt.$loading.finish()
            console.log(error.response.data.message)
            this.errorMessage = error.response.data.message
          } else this.$nuxt.$loading.finish()
          this.errorMessage = error
        }
      )
    }
  }
}
</script>

<style></style>
