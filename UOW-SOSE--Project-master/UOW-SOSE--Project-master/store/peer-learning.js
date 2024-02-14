export const state = () => ({
  sessions: [],
});

export const getters = {
  getSessionsList: (state) => {
    return state.sessions;
  },
};

export const mutations = {
  SET_DATA(state, data) {
    state.sessions = data;
  },
};

export const actions = {
  async loadData({ commit }) {
    // Load data from the JSON file in the static folder
    // const jsonData = require("~/static/peerSessions");
    const response = await this.$axios.get("/peerSessions"); // Use a relative URL

    commit("SET_DATA", response.data);
  },

  async makeIntrest({ commit, rootState, dispatch }, data) {
    var dataNew = [];
    for (let index = 0; index < data.numberPeer.length; index++) {
      dataNew.push(data.numberPeer[index]);
    }
    console.log(dataNew);
    dataNew.push(rootState.user.userId);
    // var numberPeer = [];
    const response = await this.$axios.put(`/peerSessions/${data._id}`, {
      numberPeer: dataNew,
    }); // Use a relative URL
    dispatch("loadData");

    return response;
  },
  async deletePeerCard({ commit, rootState, dispatch }, data) {
    const response = await this.$axios.delete(`/peerSessions/${data._id}`);
    dispatch("loadData");
    return response;
  },
  async addSession({ rootState, dispatch }, data) {
    console.log("Data Received for Session add", data);
    var userAry = [];
    // userAry.push(rootState.user.userId);
    data["numberPeer"] = userAry;
    console.log(data);
    const response = await this.$axios.post("/peerSessions", data); // Use a relative URL

    dispatch("loadData");
    return "Sucessfully Added Data";
  },
};
