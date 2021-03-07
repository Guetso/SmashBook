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
            <v-btn class="mx-2" fab small color="primary" @click="stocks -= 1">
              <v-icon dark>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-col>

          <v-col align="center">
            <v-text-field
              class="inputStocks"
              v-model="stocks"
              :rules="stocksRules"
              rounded
              readonly
            >
              {{ stocks }}
            </v-text-field>
          </v-col>

          <v-col align="center">
            <v-btn class="mx-2" fab small color="primary" @click="stocks += 1">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stocks: 3,
      stocksRules: [
        (v) => v > 0 || '1 stock minimum est requise',
        (v) => v <= 99 || 'Maximum de stock atteint',
      ],
    }
  },
  watch: {
    stocks() {
      this.stockValidation()
    },
  },
  methods: {
    stockValidation() {
      if (this.stocks <= 0) {
        this.stocks = 1
      }
      if (this.stocks > 99) {
        this.stocks = 99
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
