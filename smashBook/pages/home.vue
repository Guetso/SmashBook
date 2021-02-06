<template>
  <div>
    <div>Coucou</div>
    <button @click="logMeOut">Se déconnecter</button>
    <NuxtLink v-if="me.isAdmin" to="/admin">Admin</NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({ me: 'player/data' }),
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
    },
  },
  mounted() {
    console.log(this.me.isAdmin)
  },
}
</script>

<style></style>
