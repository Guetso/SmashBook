<template>
  <v-app class="app">
    <IntroHeader />
    <v-main>
      <Nuxt class="app__content" />
    </v-main>
    <IntroFooter />
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
.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;
}
</style>
