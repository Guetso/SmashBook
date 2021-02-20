<template>
  <v-app class="app">
    <IntroHeader />
    <v-main>
      <v-container fluid>
        <Nuxt class="app__content" />
        <SnackBar />
      </v-container>
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

<style lang="scss" scoped>
#app {
  background-image: url(~assets/images/background/bg_allStar.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  min-height: 100vh;
  color: white;
}
</style>
