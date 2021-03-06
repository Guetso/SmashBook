<template>
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
          <td>{{ participant.name }}</td>
          <td>{{ participant.character }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
    }
  },
}
</script>

<style lang="scss">
.tabHeader{
  font-size: 2rem;
}
</style>
