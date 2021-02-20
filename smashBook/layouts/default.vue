<template>
  <v-app>
    <Header />
    <v-main>
      <v-container id="mainContainer" fluid>
        <Nuxt class="app__content" />
        <SnackBar />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dark: true,
    }
  },
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: white;
}
#mainContainer {
  padding: 0;
}
</style>
