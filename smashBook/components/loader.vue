<template>
  <div id="loader">
    <atom-spinner :animation-duration="1000" :size="120" :color="'#ff1d5e'" />
  </div>
</template>

<script>
// To use minified css and js files instead of .vue single file components:
// import 'epic-spinners/dist/lib/epic-spinners.min.css'
// import {AtomSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'

import { AtomSpinner } from 'epic-spinners'
export default {
  components: {
    AtomSpinner,
  },
}
</script>

<style lang="scss" scoped>
#loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
}
</style>
