<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Résultat du match n°{{ matchId }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <resultTable :match="match" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <resultPodium :match="match" />
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-btn @click="createResult" color="pink" :style="btnStyle">
          Valider
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import resultTable from '../../components/resultTable'
import resultPodium from '../../components/resultPodium.vue'
export default {
  components: {
    resultTable,
    resultPodium,
  },
  async fetch() {
    if (this.createdMatch && this.createdMatch.id === this.matchId) {
      this.match = this.createdMatch
    } else {
      this.match = this.inProgressMatch(this.matchId)
    }
  },
  data() {
    return {
      btnStyle: 'font-size:1.3rem',
      match: {},
    }
  },
  computed: {
    ...mapGetters({ inProgressMatch: 'match/inProgressMatchId' }),
    ...mapGetters({ createdMatch: 'match/createdMatch' }),
    matchId() {
      const id = Number(this.$route.params.id)
      return id
    },
  },
  methods: {
    createResult() {
      this.$nuxt.$loading.start()
      this.$store.dispatch('result/createResult', this.matchDatas) // this.resultsDatas à faire
      console.log('coucou')
    },
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
