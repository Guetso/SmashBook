<template>
  <NuxtLink class="matchLink" :to="matchLink">
    <v-hover v-slot="{ hover }">
      <v-card
        rounded
        :elevation="0"
        :color="hover ? 'indigo' : 'grey darken-3'"
        class="inProgressCard"
      >
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
                  <v-col class="py-0 px-0">
                    <div class="date">{{ formatedDate }}</div>
                  </v-col>
                  <v-col cols="5" class="py-0 px-0">
                    <div class="creator">par {{ creator }}</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-subtitle>

            <v-row>
              <v-divider horizontal />
            </v-row>
          </v-container>
        </v-card-title>

        <v-card-text class="pa-0 inProgressCard__content">
          <v-container class="py-0">
            <v-row justify="center">
              <v-col
                cols="4"
                v-for="participant in match.participations"
                :key="participant.id"
              >
                <div class="inProgressCard__content__player__img">
                  <v-avatar size="45">
                    <v-img :src="avatar(participant.player_id)">
                      <template v-slot:placeholder>
                        <v-img
                          :src="
                            require('../assets/images/icons/iconsHeader.svg')
                          "
                        />
                      </template>
                    </v-img>
                  </v-avatar>

                  <v-avatar
                    class="inProgressCard__content__character__img"
                    color="black"
                    size="30"
                  >
                    <v-img :src="characterIcon(participant.character_id)" />
                  </v-avatar>
                </div>
                <div class="inProgressCard__content__player__name">
                  {{ name(participant.player_id) }}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-hover>
  </NuxtLink>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapFields('player', ['players']), // a voir si le souci de chargement très long de la page ne vient pas de mapField
    ...mapGetters({ character: 'characters/characterSelect' }),
    creator() {
      return this.players.find((player) => player.id === this.match.createdBy)
        .name
    },
    formatedDate() {
      return dayjs(this.match.createdAt).format('[Le] DD/MM/YY [à] HH:mm')
    },
    matchLink() {
      return `/setResult/${this.match.id}`
    },
  },
  async mounted() {
    await this.$store.dispatch('player/getAllplayers')
  },
  methods: {
    name(playerId) {
      return this.players.find((player) => player.id === playerId).name
    },
    avatar(playerId) {
      return this.players.find((player) => player.id === playerId).imageUrl
    },
    characterIcon(characterId) {
      return this.character(characterId).imageUrl
    },
  },
}
</script>

<style lang="scss">
.inProgressCard {
  :hover {
    cursor: pointer;
  }
  &__sub {
    font-size: 1.15rem;
  }
  &__content {
    &__player__img {
      position: relative;
      width: 2rem;
    }
    &__player__name {
      font-size: 1.3rem;
      padding-top: 0.6rem;
    }
    &__character__img {
      position: absolute;
      border: solid white 1px !important;
      bottom: -1rem;
      right: -4rem;
    }
  }
}
.matchLink {
  text-decoration: none;
}
.creator {
  text-align: right;
}
.date {
  text-align: left;
}
</style>
