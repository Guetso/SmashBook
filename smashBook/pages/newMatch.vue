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
        <v-row><v-btn @click="createMatch">Valider</v-btn></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      stocksRules: [
        (v) => v > 0 || '1 stock minimum est requise',
        (v) => v <= 99 || 'Maximum de stock atteint',
      ],
    }
  },

  computed: {
    ...mapFields('match', ['matchDatas']),
  },
  methods: {
    changeStocks(value) {
      this.$store.dispatch('match/changeStocks', value)
    },
    createMatch() {
      this.$store.dispatch('match/createMatch', this.matchDatas)
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
