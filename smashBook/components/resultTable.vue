<template>
  <div>
    <h2>Stocks :</h2>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th
              v-for="participantStock in stocksArray"
              :key="participantStock.id"
              class="text-left"
            >
              <ParticipantCard
                :participant="
                  match.participations.find(
                    (participant) =>
                      participant.id === participantStock[0].from_id
                  )
                "
                :displayChar="false"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="stocksSelect"
            v-for="(participantStock, indexFrom) in stocksArray"
            :key="participantStock.id"
          >
            <td>
              <ParticipantCard
                :participant="
                  match.participations.find(
                    (participant) =>
                      participant.id === participantStock[0].from_id
                  )
                "
              />
            </td>
            <td
              v-for="(participantStockTo, indexTo) in participantStock"
              :key="participantStockTo.to_id"
            >
              <v-select
                v-model="stocksArray[indexFrom][indexTo].stocks"
                :items="stocksScore"
              ></v-select>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import ParticipantCard from './ParticipantCard'
export default {
  components: {
    ParticipantCard,
  },
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stocksArray: [],
    }
  },
  computed: {
    stocksScore() {
      let stocksScore = []
      for (let i = 0; i < this.match.stocks + 1; i++) {
        stocksScore.push(i)
      }
      return stocksScore
    },
  },
  mounted() {
    let resultStocksArray = []
    this.match.participations.forEach((participation) => {
      const stocksPlayerArray = []
      for (let i = 0; i < this.match.participations.length; i++) {
        const participationStock = {
          from_id: participation.id,
          to_id: null,
          stocks: null,
        }
        participationStock.to_id = this.match.participations[i].id
        stocksPlayerArray.push(participationStock)
      }
      resultStocksArray.push(stocksPlayerArray)
    })
    this.stocksArray = resultStocksArray
  },

  methods: {
    findVModelIndex(participantId) {
      this.stocksArray.findIndex((element) => element.from_id === participantId)
    },
  },
}
</script>

<style lang="scss">
.stocksSelect {
  width: 1rem;
}
</style>
