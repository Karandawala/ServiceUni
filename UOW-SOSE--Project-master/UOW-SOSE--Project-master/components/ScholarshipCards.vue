<template>
  <div>
    <v-card color="#F5F5F5" class="my-4" v-for="scholarship in scholarshipList">
      <!-- Card Content -->
      <v-card-title>
        {{ scholarship.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ scholarship.category }}
      </v-card-subtitle>
      <v-card-text>
        {{ scholarship.description }}
      </v-card-text>

      <!-- Expansion Panel -->
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Scholarship Details
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- Scholarship Details -->
            <v-row v-for="(detail, value) in scholarshipDetails" :key="value">
              <v-col cols="6">{{ detail }}:</v-col>
              <v-col cols="6">{{ scholarship[value] }}</v-col>
            </v-row>

            <!-- Application Criteria -->
            <v-subheader>Application Criteria</v-subheader>
            <v-row>
              <v-col cols="12">
                <ul>
                  <li v-for="criterion in scholarship.applicationCriteria">
                    {{ criterion }}
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mb-2">
              <v-btn
                :to="'scholarship/apply/' + scholarship._id"
                color="primary"
                dark
                rounded
              >
                <v-icon left> mdi-bookmark-check </v-icon>
                Apply for Scholarship
              </v-btn>

              <v-btn
                class="ml-3"
                @click="deleteConfirm = true"
                color="error"
                dark
                rounded
              >
                <v-icon left>mdi-delete </v-icon>
                Delete Scholarship
              </v-btn>

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
                    <v-btn
                      outlined
                      color="primary"
                      @click="deleteConfirm = false"
                      >No</v-btn
                    >
                    <v-btn outlined color="error" @click="deleteSchol(scholarship)"
                      >Yes</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    scholarshipList: Array, // Define the prop and its type
  },
  data() {
    return {
      deleteConfirm: false,
      scholarshipDetails: {
        openFrom: "Open from",
        openTo: "Open to",
        value: "Value",
        duration: "Duration",
        levelOfEnrolment: "Level of Enrolment",
        graduateType: "Graduate Type",
        numberAvailable: "Number Available",
        yearOfScholarship: "Year of Scholarship",
        degree: "Degree",
        offerType: "Offer Type",
        broadStudyArea: "Broad Study Area",
      },
    };
  },
  methods: {
    async deleteSchol(scol) {
      await this.$store.dispatch("scholarships/deleteScolarship", scol);
      this.deleteConfirm = false;
    },
  },
};
</script>
