<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    scrollable
    persistent
    no-click-animation
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-row no-gutters>
        <v-col align="center">
          <v-btn
            class="my-2"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            :style="btnStyle"
          >
            {{ openCharactersTitle }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <v-card-title class="text-h4">
            Selectionnez le personnage
          </v-card-title>
        </v-col>
        <v-col v-if="selectionMax" class="col-2">
          <v-card-subtitle class="text-h5">
            {{ selectedCounter }}/{{ selectionMax }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col
            v-for="character in characters"
            :key="character.id"
            align="center"
          >
            <v-btn
              :style="btnStyle"
              :color="isSelected(character) ? 'success' : ''"
              @click="select(character)"
            >
              <v-avatar class="mr-2" size="48">
                <v-img :src="character.imageUrl">
                  <template v-slot:placeholder>
                    <v-img
                      :src="require('../assets/images/icons/iconsHeader.svg')"
                    />
                  </template>
                </v-img>
              </v-avatar>
              {{ character.name }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row no-gutters justify="space-around">
          <v-col class="col-3">
            <v-btn color="success" @click="confirm">
              <v-icon>
                mdi-check-bold
              </v-icon>
            </v-btn>
          </v-col>
          <v-col class="col-2">
            <v-btn color="pink" @click="clearSelected">
              <v-icon>
                mdi-close-thick
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    selectionMax: {
      type: Number,
    },
  },
  data() {
    return {
      dialog: false,
      charactersArray: [],
      selected: [],
      btnStyle: 'font-size:1.3rem',
    }
  },
  computed: {
    ...mapGetters({ characters: 'characters/charactersList' }),
    openCharactersTitle() {
      return this.selected.length === 0
        ? 'Choisir le personnage'
        : 'Modifier le personnage'
    },
    selectedCounter() {
      return this.selected.length
    },
  },
  methods: {
    isSelected(character) {
      return this.selected.find(
        (selectedCharacter) => selectedCharacter === character.id
      )
        ? true
        : false
    },
    clearSelected() {
      this.selected.splice(0, this.selected.length)
    },
    select(character) {
      const isSelected = this.isSelected(character)
      if (this.selectionMax) {
        if (!isSelected && this.selected.length <= this.selectionMax - 1) {
          this.selected.push(character.id)
        } else if (!isSelected && this.selected.length === this.selectionMax) {
          this.$notifier.showMessage({
            content: `${this.selectionMax} personnage(s) max !`,
            color: 'pink',
          })
        } else {
          this.selected.splice(this.selected.indexOf(character), 1)
        }
      }
      if (!this.selectionMax) {
        if (!isSelected) {
          this.selected.push(character.id)
        } else {
          this.selected.splice(this.selected.indexOf(character), 1)
        }
      }
    },
    confirm() {
      this.$emit('confirmed-character', this.selected)
      this.dialog = false
    },
  },
}
</script>

<style></style>
