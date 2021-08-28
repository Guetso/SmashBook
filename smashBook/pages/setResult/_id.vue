<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Résultat du match n°{{ matchId }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <resultTable :match="match" @stockChange="changeStock" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <resultPodium :match="match" @podiumChange="changePodium" />
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-btn
          @click="createResult"
          color="green"
          :style="btnStyle"
          :disabled="disableValidation"
        >
          Valider
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn @click="deleteMatch" color="red" :style="btnStyle">
          {{ cancelValue }}
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
  /*  middleware({ store, redirect, route }) {
    const matchId = Number(route.params.id)
    console.log(matchId)
    const getCreatedMatch = store.getters['match/createdMatch']
    getCreatedMatch()
    const getInProgressMatch = store.getters['match/inProgressMatchId']
    const matchDatas = getInProgressMatch(matchId)
    const participantPlayerId = []
    matchDatas.participations.forEach((participation) => {
      participantPlayerId.push(participation.player_id)
    })
    let canPass = false
    const me = store.state.player.myData.id
    participantPlayerId.forEach((playerId) => {
      if (me === playerId) {
        canPass = true
      }
    })
    if (!canPass) {
      return redirect('/inProgress')
    }
  }, */
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
      resultDatas: { podium: [], stocks: [], matchId: null },

      cancelConfirm: false,
    }
  },
  computed: {
    ...mapGetters({ inProgressMatch: 'match/inProgressMatchId' }),
    ...mapGetters({ createdMatch: 'match/createdMatch' }),
    matchId() {
      const id = Number(this.$route.params.id)
      return id
    },
    cancelValue() {
      if (!this.cancelConfirm) {
        return 'Effacer le match'
      } else {
        return "T'es sûr ??"
      }
    },
    stocksComplete() {
      let count = 0
      this.resultDatas.stocks.forEach((playerStocks) => {
        if (playerStocks.stocks || playerStocks.stocks === 0) {
          count++
        }
      })
      if (count === this.resultDatas.stocks.length) {
        return true
      } else {
        return false
      }
    },
    podiumComplete() {
      let count = 0
      this.resultDatas.podium.forEach((step) => {
        if (step.participation_id ) {
          count++
        }
      })
      if (count === this.resultDatas.podium.length) {
        return true
      } else {
        return false
      }
    },
    duplicatePodium() {
      let valuesSoFar = []
      for (let i = 0; i < this.resultDatas.podium.length; ++i) {
        let value = this.resultDatas.podium[i].participation_id
        if (valuesSoFar.indexOf(value) !== -1) {
          return true
        }
        valuesSoFar.push(value)
      }
      return false
    },
    disableValidation() {
      if (this.podiumComplete && this.stocksComplete && !this.duplicatePodium) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    createResult() {
      this.$nuxt.$loading.start()
      this.resultDatas.matchId = this.matchId
      this.$store
        .dispatch('result/createResult', this.resultDatas)
        .then((response) => {
          this.$notifier.showMessage({
            content: response.message,
            color: 'green',
          })
          this.$nuxt.$loading.finish()
          this.$router.push({
            path: '/home',
          })
        })
        .catch((error) => {
          this.$nuxt.$loading.finish()
          this.$notifier.showMessage({
            content: error.response.data.message || error,
            color: 'red',
          })
        })
    },
    changePodium(changedPodium) {
      this.resultDatas.podium = changedPodium
    },
    changeStock(changedStock) {
      this.resultDatas.stocks = changedStock.flat()
    },
    deleteMatch() {
      if (!this.cancelConfirm) {
        this.cancelConfirm = true
      } else {
        this.$nuxt.$loading.start()
        this.$store
          .dispatch('match/deleteInProgressMatch', this.matchId)
          .then(() => {
            this.$router.push({
              path: '/inProgress',
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  },
}
</script>

<style lang="scss"></style>
