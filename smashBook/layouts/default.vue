<template>
  <v-app class="app">
    <Header />
    <v-main>
      <v-container fluid>
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
      dark: true
    }
  }
}
</script>

<style lang="scss">
#app {
  background-image: url(~assets/images/background/bg_allStar.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  min-height: 100vh;
  color: white;
}
</style>
