<template>
  <div v-if="$fetchState.pending">
    <Loader />
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col>
          <h1>Tous les matchs</h1>
        </v-col>
      </v-row>
      <MatchesTable
        :matches="matchesList"
        :is-loading="matchesTableloading"
        @getMatches="fetchMatches"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('player/getAllplayers')
    await this.$store.dispatch('characters/getCharacters')
  },
  data() {
    return {
      matchesTableloading: false,
      matchesList: {},
    }
  },
  methods: {
    async fetchMatches(pagination) {
      this.matchesTableloading = true
      await this.$Result
        .getPaginedList(pagination.itemsPerPage, pagination.page)
        .then((response) => {
          this.matchesList = response.matches
        })
        .catch((err) => {
          console.log(err)
        })
      this.matchesTableloading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.placeholder {
  margin: auto;
}
</style>
