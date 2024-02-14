<template>
  <div>
    <v-row class="my-2" justify="center" align="center">
      <v-col cols="12">
        <v-card class="mb-3">
          <v-col cols="12">
            <v-row>
              <v-col>
                <h4 class="ml-4">Scholarships Managements</h4>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-btn
                  to="/scholarship/schols-applications"
                  small
                  dark
                  color="black"
                >
                  <v-icon>mdi-file-document</v-icon>
                  Manage Applications
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn to="/scholarship/add" small dark color="black">
                  <v-icon>mdi-plus</v-icon>
                  Add Schol
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
        <v-card>
          <v-card-title>Search Scholarships</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="yearFilter"
                  :items="years"
                  label="Year"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="gradTypeFilter"
                  :items="graduateTypes"
                  label="Graduate Type"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="studyAreaFilter"
                  :items="broadStudyAreas"
                  label="Broad Study Area"
                ></v-select>
              </v-col>
            </v-row>
            <!-- <v-btn @click="filteredScholarships" color="primary">Filter</v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mb-3"></v-divider>
    <ScholarshipCards :scholarshipList="scholarshipList" />
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    // Load sample data into the Vuex store when the component starts
    await store.dispatch("scholarships/loadData");
  },
  computed: {
    yearFilter: {
      get() {
        return this.$store.state.scholarships.filterCriteria.yearFilter;
      },
      set(value) {
        this.$store.dispatch("scholarships/setYearFilter", value);
      },
    },
    gradTypeFilter: {
      get() {
        return this.$store.state.scholarships.filterCriteria.gradTypeFilter;
      },
      set(value) {
        this.$store.dispatch("scholarships/setGradTypeFilter", value);
      },
    },
    studyAreaFilter: {
      get() {
        return this.$store.state.scholarships.filterCriteria.studyAreaFilter;
      },
      set(value) {
        this.$store.dispatch("scholarships/setStudyAreaFilter", value);
      },
    },
    scholarshipList() {
      return this.$store.getters["scholarships/getFilteredScholarships"];
    },
  },
  data() {
    return {
      selectedYear: null,
      selectedGraduateType: null,
      selectedBroadStudy: null,
      years: ["Any", "2025", "2024", "2023", "2022", "2021"], // Replace with your available years
      graduateTypes: ["Any", "Undergraduate", "Postgraduate"], // Replace with your graduate types
      broadStudyAreas: [
        "Any",
        "Law",
        "Engineering",
        "Science",
        "Business",
        "Health Sciences",
        "Fine Arts",
        "Social Sciences",
        "Computer Science",
        "Design",
        "Psychology",
        "Sports Management",
        "Economics",
      ],
    };
  },
  methods: {},
};
</script>
