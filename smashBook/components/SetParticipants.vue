<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      scrollable
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
          <v-col class="col-2">
            <v-card-subtitle class="text-h5">
              {{ participantsCounter }}/8
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
              <v-btn color="success" @click="dialog = false">
                <v-icon>
                  mdi-check-bold
                </v-icon>
              </v-btn>
            </v-col>
            <v-col class="col-2">
              <v-btn color="pink" @click="clearParticipant">
                <v-icon>
                  mdi-close-thick
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table id="setParticipants">
      <template v-slot:default>
        <thead class="tabHeader">
          <tr>
            <th class="text-left">
              Joueur
            </th>
            <th class="text-left">
              Personnage
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="participant in participants" :key="participant.name">
            <td>
              <v-avatar class="mr-2" size="48">
                <v-img :src="participant.imageUrl">
                  <template v-slot:placeholder>
                    <v-img
                      :src="require('../assets/images/icons/iconsHeader.svg')"
                    />
                  </template>
                </v-img>
              </v-avatar>
              {{ participant.name }}
            </td>
            <td>{{ participant.favChar }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playersArray: [],
      participants: [],
      dialog: false,
      btnStyle: 'font-size:1.3rem',
    }
  },

  computed: {
    players() {
      function tri(a, b) {
        return a.name > b.name ? 1 : -1
      }
      return this.playersArray.sort(tri)
    },
    participantsCounter() {
      return this.participants.length
    },
    openPlayerTitle() {
      return this.participants.length === 0
        ? 'Choisir les joueurs'
        : 'Modifier les joueurs'
    },
  },

  methods: {
    isSelected(player) {
      return this.participants.find(
        (participant) => participant.id === player.id
      )
        ? true
        : false
    },
    select(player) {
      const isSelected = this.isSelected(player)
      if (!isSelected && this.participants.length <= 7) {
        this.participants.push(player)
      } else if (!isSelected && this.participants.length === 8) {
        this.$notifier.showMessage({
          content: '8 joueurs max !',
          color: 'pink',
        })
      } else {
        this.participants.splice(this.participants.indexOf(player), 1)
      }
    },
    clearParticipant() {
      this.participants.splice(0, this.participants.length)
    },
  },

  async mounted() {
    const players = await this.$Player.index()
    this.playersArray = players.players
  },
}
</script>

<style lang="scss"></style>
