<template>
  <div id="playerCard">
    <v-card color="grey darken-4">
      <v-card-title class="pa-0">
        <v-container>
          <v-row justify="center ma-2">
            <v-avatar class="player__avatar" size="90">
              <v-img
                :src="me.imageUrl"
              >
                <template v-slot:placeholder>
                  <v-img :src="require('../assets/images/icons/iconsHeader.svg')" />
                </template>
              </v-img>
            </v-avatar>
          </v-row>
          <v-row justify="center">
            <h1 class="player__name">{{ me.name }}</h1>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ me: 'player/data' }),
  },
}
</script>

<style lang="scss" scoped>
.player {
  &__name {
    text-transform: uppercase;
    font-family: $logo;
  }
}
</style>
