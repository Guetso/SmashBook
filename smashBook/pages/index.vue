<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Liste des personnages:</h2>
    <ul>
      <li v-for="character in characters" :key="character.id">
        {{ character.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      characters: []
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/characters')
      .then((response) => {
        this.characters = response.data.characters
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style></style>
