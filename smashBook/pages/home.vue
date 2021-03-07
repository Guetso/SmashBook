<template>
  <div id="home">
    <PlayerCard />
    <v-container>
      <v-row justify="center">
        <v-col align="center">
          <NuxtLink class="signupLink" to="/newmatch">
            <v-btn color="pink" :style="btnStyle">
              Nouveau match
            </v-btn>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { fakePlayer } from '~/fakeData/fakePlayer.js'
export default {
  data() {
    return {
      fakePlayer,
      btnStyle: 'font-size:1.3rem',
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
