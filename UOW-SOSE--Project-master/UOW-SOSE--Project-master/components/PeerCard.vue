<template>
  <v-hover v-slot="{ hover }">
    <v-card
      rounded
      :class="{ 'custom-elevation': hover }"
      max-height="450"
      :color="hover ? '#E8EAF6' : ''"
      min-width="330"
      max-width="344"
    >
      <v-card-title>
        {{ cardData.name }} <v-spacer></v-spacer>
        <v-btn
          @click="deleteConfirm = true"
          v-if="hover"
          flat
          icon
          color="primary"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>

      <v-dialog v-model="deleteConfirm" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">
            <v-icon size="100px" class="mx-auto" color="error"
              >mdi-close-circle-outline</v-icon
            >
          </v-card-title>
          <v-card-text class="mt-4">
            <h2 class="text-center">Confirm Delete ?</h2>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click="deleteConfirm = false"
              >No</v-btn
            >
            <v-btn outlined color="error" @click="deleteCard(cardData)"
              >Yes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-subtitle>
        <v-list :color="hover ? '#E8EAF6' : ''">
          {{ cardData.subname }}
          <!-- <br />
        {{ cardData.location }} -->
        </v-list>
      </v-card-subtitle>

      <v-list :color="hover ? '#E8EAF6' : ''" disabled dense>
        <!-- <v-subheader>REPORTS</v-subheader> -->
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-if="item.text == 'numberPeer'"
                >{{
                  cardData[item.text].length
                }}
                Participants</v-list-item-title
              >
              <v-list-item-title
                v-else
                v-text="cardData[item.text]"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Expansion Panel -->
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Session Details </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text>
              {{ cardData.description }}
            </v-card-text>
            <v-row justify="center" align="center" class="mb-2">
              <v-btn
                v-if="!checkForList(cardData['numberPeer'])"
                color="primary"
                dark
                @click="makeInt(cardData)"
                rounded
              >
                <v-icon left> mdi-check-outline </v-icon>
                I am Intrested
              </v-btn>
              <v-chip v-else dark color="green" text-color="white">
                <v-avatar class="mr-3">
                  <v-icon>mdi-check-circle-outline</v-icon>
                </v-avatar>
                Enrolled
              </v-chip>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    cardData: Object, // Define the prop and its type
  },
  data: () => ({
    show: false,
    deleteConfirm: false,
    items: [
      { text: "Time", icon: "mdi-clock" },
      { text: "Date", icon: "mdi-calendar-today-outline" },
      { text: "location", icon: "mdi-map-marker-circle" },
      { text: "numberPeer", icon: "mdi-account-group-outline" },
    ],
  }),
  methods: {
    async makeInt(cardData) {
      await this.$store.dispatch("peer-learning/makeIntrest", cardData);
    },
    async deleteCard(cardData) {
      await this.$store.dispatch("peer-learning/deletePeerCard", cardData);
      this.deleteConfirm = false;
    },
    checkForList(List) {
      const usid = this.$store.getters["user/getUID"];
      return List.includes(usid);
    },
  },
};
</script>
