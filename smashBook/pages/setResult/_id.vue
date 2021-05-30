<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Résultat du match n°{{ matchId }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <resultTable :matchId="matchId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import resultTable from '../../components/resultTable'
export default {
  components: {
    resultTable,
  },
  computed: {
    matchId() {
      const id = Number(this.$route.params.id)
      return id
    }
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
