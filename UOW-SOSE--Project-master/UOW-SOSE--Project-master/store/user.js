export const state = () => ({
    userId: "6505ab5a087d062fb9858416",
  });
  
  export const getters = {
    getUID: (state) => {
      return state.userId;
    },
  };
  
  export const mutations = {
    SET_UID(state, data) {
      state.userId = data;
    },
  };
  