<template>
  <div>
    <div>Coucou</div>
    <button @click="logMeOut">Se déconnecter</button>
    <NuxtLink v-if="me.isAdmin" to="/admin">Admin</NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fakePlayer } from '~/fakeData/fakePlayer.js'
export default {
  data() {
    return {
      fakePlayer,
    }
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
}
</script>

<style></style>
