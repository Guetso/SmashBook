<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Résultat du match n°{{matchId}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      matchId: this.$route.params.id
    }
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
