<template>
  <v-card tile :elevation="0" color="grey darken-4">
    <v-card-title class="pa-0">
      <v-container class="py-0">
        <v-row no-gutters class="character__avatar ma-2" justify="center">
          <v-col>
            <v-avatar size="60">
              <v-img :src="character(characterId).imageUrl">
                <template v-slot:placeholder>
                  <v-img
                    :src="require('../assets/images/icons/iconsHeader.svg')"
                  />
                </template>
              </v-img>
            </v-avatar>
          </v-col>
          <v-col v-if="displayName" class="character__name mt-4" justify="center">
            <span>{{ character(characterId).name }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    characterId: {
      type: Number,
      required: true,
    },
    displayName: {
      type:Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({ character: 'characters/characterSelect' }),
  },
}
</script>

<style lang="scss">
.character__name {
  font-size: 1.8rem;
}
</style>
