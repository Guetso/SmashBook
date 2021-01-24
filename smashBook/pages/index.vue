<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Se connecter:</h2>
    <input v-model="form.login" placeholder="user" />
    <input v-model="form.mdp" placeholder="mdp" />
    <button type="submit" @click="loginMe">Ok</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { login: '', mdp: '' }
    }
  },
  methods: {
    loginMe() {
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          console.log('ok')
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
