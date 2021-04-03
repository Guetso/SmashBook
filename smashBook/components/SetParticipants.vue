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
            <td class="px-0" v-if="participant.favChar">
              <CharacterCard :characterId="participant.favChar" />
            </td>
            <td v-else>
              <v-btn color="grey darken-3" dark :style="btnStyle">
                Choisir un perso
              </v-btn>
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
      this.participants = selectedPlayer
    },
  },
}
</script>

<style lang="scss"></style>
