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
      <v-row justify="center">
        <v-col align="center">
          <NuxtLink class="signupLink" to="/inProgress">
            <v-btn color="green" :style="btnStyle">
              Match en cours <span>({{ matchInProgressCount }})</span>
            </v-btn>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fakePlayer } from '~/fakeData/fakePlayer.js'
export default {
  data() {
    return {
      fakePlayer,
      btnStyle: 'font-size:1.3rem',
    }
  },
  mounted() {
    this.$store.dispatch('player/getAllplayers')
    this.$store.dispatch('match/getMatchsInprogess')
  },
  computed: {
    ...mapGetters({ matchInProgressCount: 'match/inProgressCount' }),
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
