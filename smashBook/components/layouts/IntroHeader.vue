<template>
  <v-app-bar app>
    <v-toolbar-title class="header__title">Le Smash Book</v-toolbar-title>
    <img src="~/assets/images/icons/iconsHeader.svg" />
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  &__title {
    text-transform: uppercase;
    font-size: 3rem;
    font-family: $logo;
  }
}
img{
  width: 5rem;
  margin: auto 1rem;
}
</style>
