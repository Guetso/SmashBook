<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Match en cours</h1>
      </v-col>
    </v-row>
    <v-row v-for="inProgressMatch in inProgressMatches" :key="inProgressMatch.id">
      <v-col>
        <inProgressCard :match="inProgressMatch" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import inProgressCard from '../components/inProgressCard'
export default {
  components: {
    inProgressCard,
  },
  computed: {
    ...mapGetters({ inProgressMatches: 'match/inProgressMatch' }),
  },
}
</script>

<style lang="scss">
.inputStocks {
  font-size: 3rem;
}
.inputStocks input {
  text-align: center;
}
</style>
