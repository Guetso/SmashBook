<template>
  <div v-if="$fetchState.pending">
    <Loader />
  </div>
  <div v-else>
    <v-container v-if="inProgressMatches.length > 0">
      <v-row>
        <v-col>
          <h1>Match en cours</h1>
        </v-col>
      </v-row>
      <v-row
        v-for="inProgressMatch in inProgressMatches"
        :key="inProgressMatch.id"
      >
        <v-col>
          <inProgressCard :match="inProgressMatch" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row :justify="'center'">
        <v-col col="12">
          <v-img
            max-width="250"
            :src="require('../assets/images/sleepyKirby.gif')"
            class="placeholder"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import inProgressCard from '../components/inProgressCard'
export default {
  components: {
    inProgressCard,
  },
  async fetch() {
    await this.$store.dispatch('characters/getCharacters')
    await this.$store.dispatch('player/getAllplayers')
    await this.$store.dispatch('match/getMatchsInprogess')
  },
  computed: {
    ...mapGetters({ inProgressMatches: 'match/inProgressMatch' }),
  },
}
</script>

<style lang="scss" scoped>
.placeholder {
  margin: auto;
}
</style>
