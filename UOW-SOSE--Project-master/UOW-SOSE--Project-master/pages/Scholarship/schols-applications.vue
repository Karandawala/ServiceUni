<template>
  <div>
    <v-row class="my-2" justify="center" align="center">
      <v-col cols="12">
        <v-card class="mb-3">
          <v-col cols="12">
            <v-row>
              <v-col>
                <h4 class="ml-4">Scholarships Applications</h4>
              </v-col>
              <v-col>
                <v-select
                  item-text="name"
                  item-value="value"
                  v-model="applicationTypeFiltered"
                  :items="status"
                  label="Application Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
     <v-container fluid style="height: 60vh;" class="grey lighten-2" v-if="applications.length==0">
     
      <v-row class="mt-10" align="center" justify="center">
        <v-col class="text-center">
          <v-icon size="100px">mdi-file-document-alert-outline</v-icon>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h3>No Application Data for the selected Filter</h3>
        </v-col>
      </v-row>
     </v-container>
     <v-container  class="grey lighten-2" v-else>
      <v-card
          v-for="application in applications"
          :ref="application.id"
          class="my-7"
        >
          <v-row>
            <v-col class="ml-4 mt-2">
              <h3>{{ application["scholName"] }}</h3></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-list dense>
                <!-- <v-subheader>REPORTS</v-subheader> -->
                <v-list-item class="my-1" v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-if="
                        item.text == 'cvFile' ||
                        item.text == 'recommendationLetterFile'
                      "
                    >
                      <span>{{ application[item.text].split("/")[1] }}</span>
                      <v-btn
                        icon
                        :href="
                          'http://localhost:3500/' +
                          application[item.text]
                        "
                        target="_blank"
                        small
                        color="blue"
                        ><v-icon small>mdi-open-in-new</v-icon></v-btn
                      >
                    </v-list-item-title>

                    <v-list-item-title
                      v-else
                      v-text="application[item.text]"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="7">
              <v-container>
                <h4>Description Provided <br /></h4>
                <p class="text-justify mt-2">
                  {{ application["additionalInfo"] }}
                </p></v-container
              >
            </v-col>
          </v-row>
          <v-card-actions v-if="application['status'] == 'pending'">
            <v-btn
              width="100px"
              @click="makeDecs(application['_id'], 'approved')"
              color="success"
              >Approve</v-btn
            >
            <v-btn
              width="100px"
              @click="makeDecs(application['_id'], 'rejected')"
              color="error"
              >Reject</v-btn
            >
          </v-card-actions>
          <v-card-actions v-if="application['status'] == 'approved'">
            <v-chip class="ma-2" color="success" outlined>
              <v-icon left> mdi-check-decagram-outline </v-icon>
              Application Approved
            </v-chip>
          </v-card-actions>
          <v-card-actions v-if="application['status'] == 'rejected'">
            <v-chip class="ma-2" color="error" outlined>
              <v-icon left> mdi-cancel </v-icon>
              Application Rejected
            </v-chip>
          </v-card-actions>
        </v-card>
     </v-container>
      </v-col></v-row
    >
  </div>
</template>
<script>
export default {
  async asyncData({ store }) {
    // Load sample data into the Vuex store when the component starts
    await store.dispatch("scholarships/loadApplicationData");
  },
  props: {
    cardData: Object, // Define the prop and its type
  },
  computed: {
    applications() {
      return this.$store.getters["scholarships/getScholarshipsApplication"];
    },
    applicationTypeFiltered: {
      get() {
        return this.$store.state.scholarships.filterScolApplications;
      },
      set(value) {
        this.$store.dispatch("scholarships/setAppStatusFilter", value);
        // this.$store.dispatch("scholarships/loadApplicationData");
      },
    },
  },
  data: () => ({
    show: false,
    status: [
      {
        name: "Pending Appliations",
        value: "pending",
      },
      {
        name: "Approved Appliations",
        value: "approved",
      },
      {
        name: "Rejected Appliations",
        value: "rejected",
      },
    ],
    items: [
      { text: "firstName", icon: "mdi-account" },
      { text: "lastName", icon: "" },
      { text: "email", icon: "mdi-email-fast-outline" },
      { text: "cvFile", icon: "mdi-file-document-outline" },
      { text: "recommendationLetterFile", icon: "mdi-file-document" },

      //   { text: "numberPeer", icon: "mdi-account-group-outline" },
    ],
  }),
  methods: {
    async makeDecs(id, des) {
      const data = {
        id: id,
        des: des,
      };
      await this.$store.dispatch("scholarships/approveSchol", data);
    },
  },
};
</script>
