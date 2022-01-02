<template>
  <v-container fluid>
    <div v-if="loading">Wait...</div>
    <v-data-iterator
      v-else
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Chercher"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Trier par"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title
                class="subheading d-flex justify-space-between font-weight-bold"
              >
                <div>{{ formatedDate(item.createdAt) }}</div>
                <div v-if="item.participations.length > 2">MELEE</div>
                <div v-else>DUEL</div>
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    v-if="key !== 'Participations'"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ translatedKey(key) }}:
                  </v-list-item-content>

                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    <div
                      v-if="
                        key !== 'Participations' &&
                          key !== 'Session' &&
                          key !== 'Creator'
                      "
                    >
                      {{ item[toLowerCase(key)] }}
                    </div>

                    <div v-if="key === 'Session'">
                      {{ item[toLowerCase(key)].date }}
                    </div>

                    <v-list-group
                      v-if="key === 'Participations'"
                      :value="false"
                      class="pa-0"
                    >
                      <template v-slot:activator>
                        <v-list-item-title class="myfont">
                          {{ translatedKey(key) }}
                        </v-list-item-title>
                      </template>

                      <v-list-item
                        v-for="(participation, index) in item['participations']"
                        :key="participation.id"
                      >
                        <v-list-item-content>
                          <div class="podium_place">
                            <span>{{ index + 1 }}</span>
                            <ParticipantCard
                              :participant="participation"
                              :displayChar="true"
                            />
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>

                    <v-list-group
                      v-if="key === 'Participations'"
                      :value="false"
                      class="pa-0"
                    >
                      <template v-slot:activator>
                        <v-list-item-title class="myfont">
                          Kills
                        </v-list-item-title>
                      </template>
                      <v-list-group
                        :value="false"
                        sub-group
                        class="pa-0"
                        v-for="participation in item['participations']"
                        :key="participation.id"
                      >
                        <template v-slot:activator>
                          <v-list-item-content>
                            <div class="d-flex align-center">
                              <ParticipantCard
                                :participant="participation"
                                :displayChar="true"
                                class="mr-5"
                              />
                              <div>
                                =
                                <v-icon color="pink darken-1">
                                  mdi-target-account
                                </v-icon>
                                {{ getTotalKills(participation.stocks) }}
                              </div>
                            </div>
                          </v-list-item-content>
                        </template>
                        <v-list-item
                          v-for="(stock, index) in participation.stocks"
                          :key="index"
                        >
                          <v-list-item-content>
                            <div class="d-flex align-center">
                              <v-list-item-icon class="mr-2">
                                <v-icon
                                  v-text="'mdi-arrow-right-bottom'"
                                  size="30"
                                >
                                </v-icon>
                              </v-list-item-icon>
                              <ParticipantCard
                                :participant="
                                  findParticipation(
                                    item['participations'],
                                    stock.to_participation_id
                                  )
                                "
                                :displayChar="true"
                              />
                              <div class="ml-5">
                                <v-icon color="pink darken-1">
                                  mdi-target-account
                                </v-icon>
                                {{ stock.stock }}
                              </div>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-group>
                    </v-list-group>

                    <!--                     <v-list-group
                      v-if="key === 'Participations'"
                      :value="false"
                      class="pa-0"
                    >
                      <template v-slot:activator>
                        <v-list-item-title class="myfont">
                          Kills
                        </v-list-item-title>
                      </template>
                      <v-list-item
                        v-for="participation in item['participations']"
                        :key="participation.id"
                      >
                        <v-list-item-content>
                          <div class="d-flex align-center">
                            <ParticipantCard
                              :participant="participation"
                              :displayChar="true"
                              class="mr-5"
                            />
                            <div>x 5</div>
                          </div>
                          <v-list-item
                            v-for="(stock, index) in participation.stocks"
                            :key="index"
                          >
                            <v-list-item-content>
                              <div class="d-flex align-center">
                                <v-list-item-icon class="mr-2">
                                  <v-icon
                                    v-text="'mdi-arrow-right-bottom'"
                                    size="30"
                                  >
                                  </v-icon>
                                </v-list-item-icon>
                                <ParticipantCard
                                  :participant="
                                    findParticipation(
                                      item['participations'],
                                      stock.to_participation_id
                                    )
                                  "
                                  :displayChar="true"
                                />
                                <div class="ml-5">x {{ stock.stock }}</div>
                              </div>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group> -->

                    <div v-if="key === 'Creator'">
                      {{ item[toLowerCase(key)].name }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Matchs par page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} / {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import dayjs from 'dayjs'
export default {
  async fetch() {
    await this.getMatches()
  },
  data() {
    return {
      loading: false,
      itemsPerPageArray: [6, 18, 42],
      page: 1,
      itemsPerPage: 6,
      search: '',
      filter: {},
      sortDesc: false,
      sortBy: 'createdAt',
      keys: ['Session', 'CreatedAt', 'Stocks', 'Participations', 'Creator'],
      items: [],
      totalItems: 0,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'CreatedAt')
    },
  },
  methods: {
    async getMatches() {
      this.loading = true
      await this.$Result
        .getPaginedList(this.itemsPerPage, this.page)
        .then((response) => {
          this.items = response.matches.rows || []
          this.totalItems = response.matches.count
        })
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },
    async nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
      await this.getMatches()
    },
    async formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
      await this.getMatches()
    },
    async updateItemsPerPage(number) {
      this.itemsPerPage = number
      await this.getMatches()
    },
    formatedDate(createdAt) {
      return dayjs(createdAt).format('[Le] DD/MM/YY [à] HH:mm')
    },
    toLowerCase(key) {
      return key.charAt(0).toLowerCase() + key.slice(1)
    },
    translatedKey(key) {
      let translatedKey = ''
      switch (key) {
        case 'Session_id':
          translatedKey = 'Session'
          break
        case 'Participations':
          translatedKey = 'Podium'
          break
        case 'Creator':
          translatedKey = 'Créé par'
          break
        default:
          translatedKey = key
      }
      return translatedKey
    },
    findParticipation(participationsArray, participationId) {
      return participationsArray.find(
        (participant) => participant.id === participationId
      )
    },
    getTotalKills(stocksArray) {
      return stocksArray.reduce((total, item) => item.stock + total, 0)
    },
  },
}
</script>

<style lang="scss">
.v-list-group__header {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.myfont {
  font-size: 16px !important;
  font-weight: initial !important;
  line-height: initial !important;
}

.podium_place {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
