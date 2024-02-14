// store/scholarships.js

export const state = () => ({
  scholarships: [],
  scholarshipsapps: [],
  filterScolApplications: "pending",
  filterCriteria: {
    yearFilter: "Any",
    gradTypeFilter: "Any",
    studyAreaFilter: "Any",
  },
});

// ... rest of the module ...

// store/scholarships.js

export const getters = {
  getScholarshipsApplication: (state) => {
    const crt = state.filterScolApplications;
    return state.scholarshipsapps.filter((scholarshipApp) => {
      return scholarshipApp.status == crt;
    });
  },
  getFilteredScholarships: (state) => {
    const { yearFilter, gradTypeFilter, studyAreaFilter } =
      state.filterCriteria;
    return state.scholarships.filter((scholarship) => {
      // Apply your filtering logic here
      const yearMatch =
        scholarship.yearOfScholarship == yearFilter || yearFilter === "Any";
      const gradTypeMatch =
        scholarship.graduateType == gradTypeFilter || gradTypeFilter === "Any";
      const studyAreaMatch =
        scholarship.broadStudyArea == studyAreaFilter ||
        studyAreaFilter === "Any";
      return yearMatch && gradTypeMatch && studyAreaMatch;
    });
  },
};
// store/scholarships.js

export const mutations = {
  SET_YEAR_FILTER(state, filter) {
    state.filterCriteria.yearFilter = filter;
  },
  SET_GRAD_TYPE_FILTER(state, filter) {
    state.filterCriteria.gradTypeFilter = filter;
  },
  SET_STUDY_AREA_FILTER(state, filter) {
    state.filterCriteria.studyAreaFilter = filter;
  },
  SET_APP_STATUS(state, filter) {
    state.filterScolApplications = filter;
  },
  SET_DATA(state, data) {
    state.scholarships = data;
  },
  SET_DATAAPP(state, data) {
    state.scholarshipsapps = data;
  },
};

export const actions = {
  setYearFilter({ commit }, filter) {
    commit("SET_YEAR_FILTER", filter);
  },
  setGradTypeFilter({ commit }, filter) {
    commit("SET_GRAD_TYPE_FILTER", filter);
  },
  setStudyAreaFilter({ commit }, filter) {
    commit("SET_STUDY_AREA_FILTER", filter);
  },
  setAppStatusFilter({ commit }, filter) {
    commit("SET_APP_STATUS", filter);
  },
  async loadData({ commit }) {
    // Load data from the JSON file in the static folder
    // const jsonData = require("~/static/scholarshipList.json");
    const response = await this.$axios.get("/scholarships"); // Use a relative URL
    console.log(response.data);
    commit("SET_DATA", response.data);
  },
  async loadApplicationData({ commit }) {
    // Load data from the JSON file in the static folder
    // const jsonData = require("~/static/applications.json");
    const response = await this.$axios.get("scholarshipsApplications"); // Use a relative URL
    console.log(response.data);
    commit("SET_DATAAPP", response.data);
  },
  async addSchol({}, data) {
    console.log("Data Received for Schol add", data);
    const response = await this.$axios.post("scholarships", data); // Use a relative URL
    return "Sucessfully Added Data";
  },
  async applySchol({ state }, data) {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    data["scholName"] = state.scholarships.filter((scholarship) => {
      return scholarship._id == data["scholId"];
    })[0]["name"];
    data["cvFile"] = await toBase64(data["cvFile"]);
    data["recommendationLetterFile"] = await toBase64(
      data["recommendationLetterFile"]
    );

    console.log("Data Received for scho apply", data);
    const response = await this.$axios.post("scholarshipsApplications", data); // Use a relative URL
    console.log(response);
    return "Sucessfully Applied";
  },
  async approveSchol({ dispatch }, data) {
    console.log("Data Received for scho apply", data);
    const response = await this.$axios.put(
      `scholarshipsApplications/${data.id}`,
      { status: data.des }
    ); // Use a relative URL
    dispatch("loadApplicationData");
    return "Sucessfully Applied";
  },

  async deleteScolarship({dispatch},data){
    const response = await this.$axios.delete(`/scholarships/${data._id}`);
    dispatch("loadData");
    return response;
  }
};
