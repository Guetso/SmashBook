<template>
  <v-card tile :elevation="0" color="grey darken-4">
    <v-card-title class="pa-0">
      <v-container class="py-0">
        <v-row
          no-gutters
          class="character__avatar ma-2"
          justify="space-between"
        >
          <v-col>
            <div v-if="match.participations.length > 2">MELEE</div>
            <div v-else>DUEL</div>
          </v-col>
          <v-col cols="2">
            <div>
              <v-icon color="pink" size="17">
                mdi-heart
              </v-icon>
              X {{ match.stocks }}
            </div>
          </v-col>
        </v-row>

        <v-card-subtitle class="py-0">
          <v-container class="py-0">
            <v-row class="inProgressCard__sub" justify="space-between">
              <v-col class="py-0">
                <span>{{ match.createdAt }}</span>
              </v-col>
              <v-col cols="2" class="py-0">
                <span>par {{ match.createdBy }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-subtitle>

        <v-row>
          <v-divider horizontal />
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-container class="py-0">
        <div>!</div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.inProgressCard {
  &__sub {
    font-size: 1.1rem;
  }
}
</style>
