<template>
  <div>
    <h2>Podium :</h2>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-center">
              Joueur
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(participant, index) in match.participations"
            :key="participant.id"
            class="text-left"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <v-select
                v-model="podium[index].participation_id"
                :items="participantsArray"
                :item-value="participantsId"
                :item-text="participantsName"
                placeholder="Choisir le joueur"
              ></v-select>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      podium: [],
    }
  },
  computed: {
    ...mapGetters({ players: 'player/players' }),
    participantsArray() {
      let participantArray = []
      this.match.participations.forEach((participant) => {
        participantArray.push(participant)
      })
      return participantArray
    },
  },
  created() {
    for (let i = 0; i < this.match.participations.length; i++) {
      const podiumObject = {}
      podiumObject.place = i + 1
      podiumObject.participation_id = null
      this.podium.push(podiumObject)
    }
  },
  watch: {
    podium: {
       deep: true,
       handler:'emitChange'
    }
  },
  methods: {
    participantsId(item) {
      return item.id
    },
    participantsName(item) {
      return this.players.find((player) => player.id === item.player_id).name
    },
    emitChange() {
      this.$emit('podiumChange', this.podium)
    }
  },
}
</script>

<style></style>
