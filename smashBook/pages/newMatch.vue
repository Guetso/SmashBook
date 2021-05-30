<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Nouveau match</h1>
        <v-row>
          <v-col>
            <h2>Vies</h2>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col align="center">
            <v-btn
              class="mx-2"
              fab
              small
              color="primary"
              @click="changeStocks(-1)"
            >
              <v-icon dark>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-col>

          <v-col align="center">
            <v-text-field
              class="inputStocks"
              v-model="matchDatas.stocks"
              :rules="stocksRules"
              rounded
              readonly
            >
              {{ matchDatas.stocks }}
            </v-text-field>
          </v-col>

          <v-col align="center">
            <v-btn
              class="mx-2"
              fab
              small
              color="primary"
              @click="changeStocks(1)"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Participants</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SetParticipants />
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              :disabled="isNotValid"
              @click="createMatch"
              :style="btnStyle"
              color="pink"
            >
              Valider
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  data() {
    return {
      stocksRules: [
        (v) => v > 0 || '1 stock minimum est requise',
        (v) => v <= 99 || 'Maximum de stock atteint',
      ],
      btnStyle: 'font-size:1.3rem',
    }
  },

  computed: {
    ...mapFields('match', ['matchDatas']),
    isNotValid() {
      if (
        this.matchDatas.participants.length < 2 ||
        this.matchDatas.participants.length > 8 ||
        this.matchDatas.stocks < 1 ||
        this.matchDatas.stocks > 99 ||
        this.matchDatas.participants.some(
          (participant) =>
            participant.character === null ||
            participant.character === undefined
        )
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    changeStocks(value) {
      this.$store.dispatch('match/changeStocks', value)
    },
    createMatch() {
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('match/createMatch', this.matchDatas)
        .then((response) => {
          console.log(response)
          this.$notifier.showMessage({
            content: response.message,
            color: 'green',
          })
          this.$nuxt.$loading.finish()
          this.$router.push({
            path: `setResult/${response.matchData.id}`,
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
    stockValidation() {
      if (this.matchDatas.stocks <= 0) {
        this.matchDatas.stocks = 1
      }
      if (this.matchDatas.stocks > 99) {
        this.matchDatas.stocks = 99
      }
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
