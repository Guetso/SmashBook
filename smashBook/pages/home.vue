<template>
  <div v-if="$fetchState.pending || isLoading">
    <Loader />
  </div>
  <div v-else id="home">
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
export default {
  async fetch() {
    await this.$store.dispatch('player/getAllplayers')
    await this.$store.dispatch('match/getMatchsInprogess')
    await this.$store.dispatch('result/getMyResults')
  },
  data() {
    return {
      isLoading: false,
      btnStyle: 'font-size:1.3rem',
    }
  },
  computed: {
    ...mapGetters({ matchInProgressCount: 'match/inProgressCount' }),
  },
  methods: {
    logMeOut() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
