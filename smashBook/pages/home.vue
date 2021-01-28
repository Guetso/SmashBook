<template>
  <div>
    <div>Coucou</div>
    <button @click="logMeOut">Se déconnecter</button>
    <NuxtLink v-if="isAdmin" to="/admin">Admin</NuxtLink>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: this.$store.state.auth.player.isAdmin,
    }
  },
  methods: {
    logMeOut() {
      this.$store.dispatch('auth/logout').then(
        () => {
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
