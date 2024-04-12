export default {
  namespaced: true,
  state: {
    addRecipeOpen: false,
  },
  mutations: {
    SET_ADD_RECIPE_OPEN(state, openState) {
      state.addRecipeOpen = openState;
    },
  },
  actions: {
    setAddRecipeOpen({ commit }, openState) {
      commit('SET_ADD_RECIPE_OPEN', openState);
    },
  },
};