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
          <tr
            v-for="participant in participantsModel"
            :key="participant.player.id"
          >
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
import { mapFields } from 'vuex-map-fields'
import cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      players: [],
      /*       participants: [], */
    }
  },
  computed: {
    ...mapFields('match', ['matchDatas']),
    participants() {
      return this.matchDatas.participants
    },
    participantsModel() {
      return cloneDeep(this.participants)
    },
  },
  /*   watch: {
    participants() {
      this.setParticipants()
    },
  }, */
  methods: {
    setPlayers() {
      const participantsArray = []
      this.players.forEach((player) => {
        const participant = {
          player: player,
          character: player.favChar ? player.favChar : null,
        }
        participantsArray.push(participant)
      })
      this.$store.dispatch('match/addParticipants', participantsArray)
    },
    setCharacter($event, currentParticipant) {
      const participantKey = this.participants.findIndex(
        (participant) => participant.player.id === currentParticipant.player.id
      )
      const characterId = $event[0]
      const payload = {participantKey, characterId}
      this.$store.dispatch('match/changeCharacter', payload)
    },
    setParticipants() {
      const participants = cloneDeep(this.participants)
      participants.forEach((element) => {
        element.player = element.player.id
      })
      this.$store.dispatch('match/addParticipants', participants)
    },
    resetCharacter(currentParticipant) {
      const participantKey = this.participants.findIndex(
        (participant) => participant.player.id === currentParticipant.player.id
      )
      this.$store.dispatch('match/unselectCharacter', participantKey)
    },
  },
}
</script>

<style lang="scss"></style>
