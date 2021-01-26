<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Se connecter:</h2>
    <input v-model="form.name" placeholder="user" />
    <input v-model="form.password" placeholder="mdp" />
    <button type="submit" @click="loginMe">Ok</button>
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
        (response) => {
          console.log(response)
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
