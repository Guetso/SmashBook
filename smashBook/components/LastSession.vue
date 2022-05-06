<template>
  <div class="last rounded-lg" v-if="lastOneObject">
    <h3 class="lastTitle">
      <div class="d-flex align-center justify-center flex-wrap">
        Dernière session :
        <div class="d-flex">
          <div class="matchCounter ">
            {{ lastOneObject.matchesCount }}
          </div>
          <span>matchs</span>
        </div>
      </div>
      <div class="date d-none d-sm-flex">{{ sessionDate }}</div>
    </h3>
    <div class="date d-sm-none">{{ sessionDate }}</div>
    <v-card class="d-block d-sm-none pa-2 mt-5 mb-8 mx-2" color="grey darken-4">
      <v-simple-table dark>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="(participatingPlayer, index) in sortedPlayersResults"
              :key="index"
              :class="isUser(participatingPlayer.id) ? 'isUser' : 'isNotUser'"
            >
              <table class="d-flex justify-space-between overflow-hidden">
                <tr
                  class="playerRow d-flex flex-column align-center justify-space-around"
                >
                  <div class="crownIcon elevation-24">
                    <v-icon
                      :color="podiumIconColor(index + 1)"
                      :small="index + 1 > 1"
                    >
                      mdi-crown
                    </v-icon>
                  </div>
                  <td>
                    <PlayerLogo
                      :player="
                        participatingPlayers.find(
                          (playerResults) =>
                            playerResults.id === participatingPlayer.id
                        )
                      "
                    />
                  </td>
                </tr>
                <tr
                  class="d-flex flex-column align-center justify-space-around"
                >
                  <td>
                    <v-icon class="player__stocks" color="green darken-1">
                      mdi-clipboard-check-multiple
                    </v-icon>
                  </td>
                  <td>{{ playerParticipations(participatingPlayer.id) }}</td>
                </tr>
                <tr
                  class="d-flex flex-column align-center justify-space-around"
                  v-for="(place, index) in lastOneObject.playersResults"
                  :key="index"
                >
                  <td>
                    <v-icon
                      class="player__first"
                      :color="podiumIconColor(index + 1)"
                    >
                      mdi-podium-gold
                    </v-icon>
                  </td>
                  <td>
                    {{
                      lastOneObject.playersResults.find(
                        (playerResults) =>
                          playerResults.id === participatingPlayer.id
                      ).podiums[`${index + 1}`]
                    }}
                  </td>
                </tr>
                <tr
                  class="d-flex flex-column align-center justify-space-around"
                >
                  <td>
                    <v-icon class="player__stocks" color="pink darken-1">
                      mdi-target-account
                    </v-icon>
                  </td>
                  <td>
                    {{
                      lastOneObject.playersResults.find(
                        (playerResults) =>
                          playerResults.id === participatingPlayer.id
                      ).stocksCount
                    }}
                  </td>
                </tr>
              </table>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card class="d-none d-sm-block pa-2 mt-5 mb-8 mx-2" color="grey darken-4">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-center">
                <v-icon class="player__stocks" color="green darken-1">
                  mdi-clipboard-check-multiple
                </v-icon>
              </th>
              <th
                v-for="(place, index) in sortedPlayersResults"
                :key="index"
                class="text-center"
              >
                <v-icon
                  class="player__first"
                  :color="podiumIconColor(index + 1)"
                >
                  mdi-podium-gold
                </v-icon>
              </th>
              <th class="text-center">
                <v-icon class="player__stocks" color="pink darken-1">
                  mdi-target-account
                </v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participatingPlayer, index) in sortedPlayersResults"
              :key="index"
              :class="isUser(participatingPlayer.id) ? 'isUser' : 'isNotUser'"
            >
              <td class="playerRow">
                <div class="crownIcon crownIcon--desktop">
                  <v-icon :color="podiumIconColor(index + 1)">
                    mdi-crown
                  </v-icon>
                </div>
                <PlayerLogo
                  :player="
                    participatingPlayers.find(
                      (playerResults) =>
                        playerResults.id === participatingPlayer.id
                    )
                  "
                />
              </td>
              <td class="text-center">
                {{ playerParticipations(participatingPlayer.id) }}
              </td>
              <td
                v-for="(place, index) in sortedPlayersResults"
                :key="index"
                class="text-center"
              >
                {{
                  lastOneObject.playersResults.find(
                    (playerResults) =>
                      playerResults.id === participatingPlayer.id
                  ).podiums[`${index + 1}`]
                }}
              </td>
              <td class="text-center">
                {{
                  lastOneObject.playersResults.find(
                    (playerResults) =>
                      playerResults.id === participatingPlayer.id
                  ).stocksCount
                }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  props: {
    lastOneObject: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({ characters: 'characters/charactersList' }),
    ...mapGetters({ players: 'player/players', myData: 'player/myData' }),
    participatingPlayers() {
      const playersArray = []
      this.lastOneObject.playersId.forEach((playerId) => {
        playersArray.push(this.players.find((player) => player.id === playerId))
      })
      return playersArray
    },
    sessionDate() {
      return dayjs(this.lastOneObject.date).format('DD/MM/YY')
    },
    sortedPlayersResults() {
      const sortedPlayersResults = [...this.lastOneObject.playersResults]
      return sortedPlayersResults.sort((a, b) => {
        let i = 1
        if (a.podiums[`${i}`] > b.podiums[`${i}`]) {
          return -1
        } else if (a.podiums[`${i}`] < b.podiums[`${i}`]) {
          return 1
        } else {
          while (a.podiums[`${i}`] === b.podiums[`${i}`]) {
            i++
            if (!a.podiums[`${i}`]) {
              if (a.stocksCount > b.stocksCount) {
                return -1
              }
              if (a.stocksCount < b.stocksCount) {
                return 1
              }
              return 0
            } else {
              if (a.podiums[`${i}`] !== b.podiums[`${i}`]) {
                return b.podiums[`${i}`] - a.podiums[`${i}`]
              }
            }
          }
        }
      })
    },
  },
  methods: {
    translatedPlace(number) {
      let podiumPlace = ''
      switch (number) {
        case 1:
          podiumPlace = '1er'
          break
        case 2:
          podiumPlace = '2nd'
          break
        case 3:
          podiumPlace = '3ème'
          break
        case 4:
          podiumPlace = '4ème'
          break
        case 5:
          podiumPlace = '5ème'
          break
        case 6:
          podiumPlace = '6ème'
          break
        case 7:
          podiumPlace = '7ème'
          break
        case 8:
          podiumPlace = '8ème'
          break
      }
      return podiumPlace
    },
    podiumIconColor(place) {
      let podiumIconColor = ''
      switch (place) {
        case 1:
          podiumIconColor = 'yellow darken-1'
          break
        case 2:
          podiumIconColor = 'grey lighten-3'
          break
        case 3:
          podiumIconColor = 'brown'
          break
        default:
          podiumIconColor = 'blue-grey'
      }
      return podiumIconColor
    },
    playerParticipations(playerId) {
      let participationsCount = 0
      const playerResults = this.lastOneObject.playersResults.find(
        (playerResults) => playerResults.id === playerId
      )
      for (const key in playerResults.podiums) {
        participationsCount += playerResults.podiums[key]
      }
      return participationsCount
    },
    isUser(playerId) {
      return playerId === this.myData.id
    },
  },
}
</script>

<style lang="scss" scoped>
.last {
  padding: 0.5rem;
  margin: 1.5rem;
  max-width: 100%;
  @media screen and (min-width: 800px) {
    max-width: 70%;
    padding: 2rem;
    margin: auto;
  }
  border-left: solid 1px rgba(255, 255, 255, 0.12);
  border-right: solid 1px rgba(255, 255, 255, 0.12);
}
.lastTitle {
  font-family: $logo;
  font-weight: 400;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;

  .matchCounter {
    font-family: unset;
    background-color: #fdd835;
    border-radius: 50%;
    width: 3rem;
    text-align: center;
    color: black;
    margin: auto 1rem;
  }
}

.isUser {
  background-color: #131313;
}

.date {
  margin: 1rem;
  font-weight: 400;
  font-family: $logo;
  text-align: right;
}

.playerRow {
  position: relative;
  .crownIcon {
    position: absolute;
    right: 0;
    z-index: 1;
    &--desktop {
      left: 50%;
      right: 50%;
      @media screen and (min-width: 1264px) {
        right: 70%;
        left: 30%;
      }
    }
  }
}
</style>
