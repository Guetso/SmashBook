<template>
  <div>
    <PlayerListDialog :selectionMax="8" @confirmed="setParticipants" />
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
            <td class="px-0" v-if="participant.player.favChar">
              <CharacterCard :characterId="participant.player.favChar" />
            </td>
            <td v-else>
              <CharactersListDialog :selectionMax="1" />
            </td>
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
      participants: [],
      btnStyle: 'font-size:1.3rem',
    }
  },
  methods: {
    setParticipants(selectedPlayer) {
      for (let i = 0; i < selectedPlayer.length; i++) {
        this.participants.push({
          player: selectedPlayer[i],
          character: selectedPlayer[i].favChar
            ? selectedPlayer[i].favChar
            : null,
        })
      }
    },
  },
}
</script>

<style lang="scss"></style>
