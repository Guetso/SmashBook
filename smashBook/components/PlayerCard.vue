<template>
  <div id="playerCard">
    <v-card color="grey darken-4">
      <v-card-title class="pa-0">
        <v-container>
          <v-row class="player__avatar ma-2" justify="center">
            <v-avatar size="90">
              <v-img :src="me.imageUrl">
                <template v-slot:placeholder>
                  <v-img
                    :src="require('../assets/images/icons/iconsHeader.svg')"
                  />
                </template>
              </v-img>
            </v-avatar>
          </v-row>

          <v-row class="player__name" justify="center">
            <h1>{{ me.name }}</h1>
          </v-row>

          <v-row class="player__bio" justify="center">
            <span>" {{ me.bio }} "</span>
          </v-row>

          <v-row class="player__stats mt-2" justify="center">
            <v-col sm="3" lg="2">
              <v-icon class="player__stocks" color="pink darken-1"
                >mdi-target-account</v-icon
              >
              <div class="player__stocks__value">334</div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col sm="3" lg="2">
              <v-icon class="player__first" color="yellow darken-1"
                >mdi-podium-gold</v-icon
              >
              <div class="player__first__value">35</div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col sm="3" lg="2">
              <v-icon class="player__matches" color="green darken-1"
                >mdi-clipboard-check-multiple</v-icon
              >
              <div class="player__matches__value">45</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ me: "player/data" }),
  },
};
</script>

<style lang="scss" scoped>
.player {
  &__name {
    text-transform: uppercase;
    font-family: $logo;
  }
  &__bio{
    font-family: $logo;
    font-size: 1.5rem;
  }
  &__stats {
    text-align: center;
    font-size: 1.7rem;
  }
  &__stocks,
  &__first,
  &__matches {
    &__value {
      margin: 0.5rem;
    }
  }
}
</style>
