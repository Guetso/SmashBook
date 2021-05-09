<template>
  <div>
    <PlayerListDialog
      :selectionMax="8"
      v-model="players"
      @input="setPlayers()"
    />
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
          <tr v-for="participant in participants" :key="participant.player.id">
            <td>
              <v-avatar class="mr-2" size="48">
                <v-img :src="participant.player.imageUrl">
                  <template v-slot:placeholder>
                    <v-img
                      :src="require('../assets/images/icons/iconsHeader.svg')"
                    />
                  </template>
                </v-img>
              </v-avatar>
              {{ participant.player.name }}
            </td>
            <td class="px-0" v-if="participant.character">
              <div @click="resetCharacter(participant)">
                <CharacterCard :characterId="participant.character" />
              </div>
            </td>
            <td class="px-0" v-else>
              <CharactersListDialog
                v-model="participant.character"
                :selectionMax="1"
                @input="setCharacter($event, participant)"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      players: [],
      participants: [],
    }
  },
  watch: {
    participants() {
      this.setParticipants()
    },
  },
  methods: {
    setPlayers() {
      this.participants = []
      this.players.forEach((player) => {
        const participant = {
          player: player,
          character: player.favChar ? player.favChar : null,
        }
        this.participants.push(participant)
      })
    },
    setCharacter($event, currentParticipant) {
      this.participants.find(
        (participant) => participant.player.id === currentParticipant.player.id
      ).character = $event[0]
      this.setParticipants()
    },
    setParticipants() {
      const participants = cloneDeep(this.participants)
      participants.forEach((element) => {
        element.player = element.player.id
      })
      this.$store.dispatch('match/addParticipants', participants)
    },
    resetCharacter(currentParticipant) {
      this.participants.find(
        (participant) => participant.player.id === currentParticipant.player.id
      ).character = null
      this.setParticipants()
    },
  },
}
</script>

<style lang="scss"></style>
