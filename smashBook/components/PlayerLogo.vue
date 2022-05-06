<template>
  <div class="pCard">
    <div class="pCard__player__img">
      <v-avatar size="45">
        <v-img :src="avatar(player.id)">
          <template v-slot:placeholder>
            <v-img :src="require('../assets/images/icons/iconsHeader.svg')" />
          </template>
        </v-img>
      </v-avatar>
    </div>
    <div class="pCard__player__name">
      {{ name(player.id) }}
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapFields('player', ['players']),
  },
  methods: {
    name(playerId) {
      return this.players.find((player) => player.id === playerId).name
    },
    avatar(playerId) {
      return this.players.find((player) => player.id === playerId).imageUrl
    },
  },
}
</script>

<style lang="scss">
.pCard {
  &__player__img {
    position: relative;
    width: 2rem;
  }
  &__player__name {
    font-size: 1.3rem;
    padding-top: 0.6rem;
    width: 5rem;
    text-align: center;
  }
  &__character__img {
    position: absolute;
    border: solid white 1px !important;
    bottom: -1rem;
    right: -4rem;
  }
}
</style>
