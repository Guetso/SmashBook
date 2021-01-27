<template>
  <div>
    <div>Coucou</div>
    <button @click="logMeOut">Se déconnecter</button>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
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
