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
              <ParticipantLogo
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
              <ParticipantLogo
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
            <td>
              <v-btn
                class="text-h5"
                fab
                outlined
                dark
                x-small
                color="yellow darken-1"
              >
                {{ getParticipantTotal(participantStock) }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
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
  watch: {
    stocksArray: {
      deep: true,
      handler: 'emitChange',
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
        if (participationStock.from_id === participationStock.to_id) {
          participationStock.stocks = 0
        }
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
    getParticipantTotal(participantStockArray) {
      const reducer = (accumulator, curr) => accumulator + curr.stocks
      return participantStockArray.reduce(reducer, 0)
    },
    emitChange() {
      this.$emit('stockChange', this.stocksArray)
    },
  },
}
</script>

<style lang="scss">
.stocksSelect {
  width: 1rem;
}
</style>
