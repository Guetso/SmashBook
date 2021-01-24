<template>
  <div>
    <h1>Hello World !</h1>
    <h2>Liste des personnages:</h2>
    <ul v-if="characters">
      <li v-for="character in characters" :key="character.id">
        {{ character.name }}
      </li>
    </ul>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      characters: [],
      error: '',
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/characters')
      .then((response) => {
        this.characters = response.data.characters
      })
      .catch((error) => {
        this.error = error.response.data.error
      })
  }
}
</script>

<style></style>
