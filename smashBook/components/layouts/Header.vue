<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title class="header__title">Le Smash Book</v-toolbar-title>
      <img src="~/assets/images/icons/iconsHeader.svg" />
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2 no-active d-md-none"
        x-large
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon color="yellow darken-1">
          mdi-controller-classic
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="secondary"
      mobile-breakpoint="960"
      right
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="me.imageUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ me.name }}</v-list-item-title>

        <v-btn class="d-md-none" icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
    }
  },
  computed: {
    ...mapGetters({ me: 'player/data' }),
  },
  methods: {
    breakPoint() {
      if (this.$vuetify.breakpoint.width < 960) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    },
  },
  mounted() {
    this.breakPoint()
  },
}
</script>

<style lang="scss" scoped>
.header {
  &__title {
    text-transform: uppercase;
    font-size: 3rem;
    font-family: $logo;
  }
}
img {
  width: 5rem;
  margin: auto 1rem;
}
.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.v-list-item__title {
  font-size: initial;
}
</style>
