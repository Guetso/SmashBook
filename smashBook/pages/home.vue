<template>
  <div id="home">
    <PlayerCard />
    <NuxtLink class="signupLink" to="/newMatch">
      <v-btn color="pink" rounded>
        Créer un match
      </v-btn>
    </NuxtLink>
  </div>
</template>

<script>
import { fakePlayer } from '~/fakeData/fakePlayer.js'
export default {
  data() {
    return {
      fakePlayer,
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
    },
  },
}
</script>

<style></style>
