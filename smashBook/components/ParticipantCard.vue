<template>
  <div class="pCard">
    <div class="pCard__player__img">
      <v-avatar size="45">
        <v-img :src="avatar(participant.player_id)">
          <template v-slot:placeholder>
            <v-img :src="require('../assets/images/icons/iconsHeader.svg')" />
          </template>
        </v-img>
      </v-avatar>

      <v-avatar v-if="displayChar" class="pCard__character__img" color="black" size="30">
        <v-img :src="characterIcon(participant.character_id)" />
      </v-avatar>
    </div>
    <div class="pCard__player__name">
      {{ name(participant.player_id) }}
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  props: {
    participant: {
      type: Object,
      required: true,
    },
    displayChar: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapFields('player', ['players']),
    ...mapFields('characters', ['list']),
  },
  methods: {
    name(playerId) {
      return this.players.find((player) => player.id === playerId).name
    },
    avatar(playerId) {
      return this.players.find((player) => player.id === playerId).imageUrl
    },
    characterIcon(characterId) {
      return this.list.find((character) => character.id === characterId)
        .imageUrl
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
  }
  &__character__img {
    position: absolute;
    border: solid white 1px !important;
    bottom: -1rem;
    right: -4rem;
  }
}
</style>
