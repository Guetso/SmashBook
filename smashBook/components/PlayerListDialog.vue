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
            class="mb-4"
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
            :style="btnStyle"
          >
            {{ openPlayerTitle }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <v-card-title class="text-h4">
            Selectionnez les joueurs
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
          <v-col v-for="player in players" :key="player.id" align="center">
            <v-btn
              :style="btnStyle"
              :color="isSelected(player) ? 'success' : ''"
              @click="select(player)"
            >
              <v-avatar class="mr-2" size="48">
                <v-img :src="player.imageUrl">
                  <template v-slot:placeholder>
                    <v-img
                      :src="require('../assets/images/icons/iconsHeader.svg')"
                    />
                  </template>
                </v-img>
              </v-avatar>
              {{ player.name }}
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
export default {
  props: {
    selectionMax: {
      type: Number,
    },
    value: {
      type: Array,
    }
  },
  data() {
    return {
      dialog: false,
      playersArray: [],
      selected: [],
      btnStyle: 'font-size:1.3rem',
    }
  },
  computed: {
    openPlayerTitle() {
      return this.selected.length === 0
        ? 'Choisir les joueurs'
        : 'Modifier les joueurs'
    },
    players() {
      function tri(a, b) {
        return a.name > b.name ? 1 : -1
      }
      return this.playersArray.sort(tri)
    },
    selectedCounter() {
      return this.selected.length
    },
  },
  methods: {
    isSelected(player) {
      return this.selected.find(
        (selectedPlayer) => selectedPlayer.id === player.id
      )
        ? true
        : false
    },
    clearSelected() {
      this.selected.splice(0, this.selected.length)
    },
    select(player) {
      const isSelected = this.isSelected(player)
      if (this.selectionMax) {
        if (!isSelected && this.selected.length <= this.selectionMax - 1) {
          this.selected.push(player)
        } else if (!isSelected && this.selected.length === this.selectionMax) {
          this.$notifier.showMessage({
            content: `${this.selectionMax} joueur(s) max !`,
            color: 'pink',
          })
        } else {
          this.selected.splice(this.selected.indexOf(player), 1)
        }
      }
      if (!this.selectionMax) {
        if (!isSelected) {
          this.selected.push(player)
        } else {
          this.selected.splice(this.selected.indexOf(player), 1)
        }
      }
    },
    confirm() {
      this.$emit('input', this.selected)
      this.dialog = false
    },
  },
  async mounted() {
    const players = await this.$Player.index()
    this.playersArray = players.players
  },
}
</script>

<style></style>
