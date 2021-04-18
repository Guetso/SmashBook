<template>
  <div>
    <PlayerListDialog :selectionMax="8" v-model="players" />
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
              <CharacterCard :characterId="participant.character" />
            </td>
            <td class="px-0" v-else>
              <CharactersListDialog
                :selectionMax="1"
                @confirmed-character="setCharacter($event, participant)"
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
    }
  },
  computed: {
    participants() {
      const participants = []
      this.players.forEach((player) => {
        const participant = { player, character: player.favChar ? player.favChar : null }
        participants.push(participant)
      })
      return participants
    },
  },
  watch: {
    participants(participantsArray) {
      this.setParticipants(participantsArray)
    }
  },
  methods: {
    setCharacter($event, currentParticipant) {
      this.participants.find(
        (participant) => participant.player.id === currentParticipant.player.id
      ).character = $event[0]
    },
    setParticipants(participantsArray) {
      const participants = cloneDeep(participantsArray)
      participants.forEach(element => {
        element.player = element.player.id
      });
      this.$store.dispatch('match/addParticipants', participants)
    }
  },
}
</script>

<style lang="scss"></style>
