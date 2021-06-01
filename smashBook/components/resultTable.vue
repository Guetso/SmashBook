<template>
  <div>
    <h2>Stocks :</h2>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th
              v-for="participant in match.participations"
              :key="participant.id"
              class="text-left"
            >
              <ParticipantCard
                :participant="participant"
                :displayChar="false"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="stocksSelect"
            v-for="participant in match.participations"
            :key="participant.id"
          >
            <td><ParticipantCard :participant="participant" /></td>
            <td
              v-for="participant in match.participations"
              :key="participant.id"
            >
              <v-select :items="stocks"></v-select>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import ParticipantCard from './ParticipantCard'
export default {
  components: {
    ParticipantCard,
  },
  props: {
    matchId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      match: {}
    }
  },
  computed: {
    ...mapGetters({ inProgressMatch: 'match/inProgressMatchId' }),
    ...mapGetters({ createdMatch: 'match/createdMatch' }),
    ...mapFields('result', ['resultsData']),
    stocks() {
      let stocks = []
      for (let i = 0 ; i< this.match.stocks+1; i++) {
        stocks.push(i)
      }
      return stocks
    }
  },
  mounted() {
    if (this.createdMatch && this.createdMatch.id === this.matchId) {
      this.match = this.createdMatch
    } else {
      this.match = this.inProgressMatch(this.matchId)
    }
  },
}
</script>

<style lang="scss">
.stocksSelect {
  width: 1rem;
}
</style>
