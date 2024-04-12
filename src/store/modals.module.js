export default {
  namespaced: true,
  state: {
    addRecipeOpen: false,
    viewEditRecipeOpen: false,
    selectedRecipe: null,
  },
  mutations: {
    SET_ADD_RECIPE_OPEN(state, openState) {
      state.addRecipeOpen = openState;
    },
    SET_VIEW_EDIT_RECIPE_OPEN(state, openState) {
      state.viewEditRecipeOpen = openState;
    },
    SET_SELECTED_RECIPE(state, recipe) {
      state.selectedRecipe = recipe;
    },
  },
  actions: {
    setAddRecipeOpen({ commit }, openState) {
      commit('SET_ADD_RECIPE_OPEN', openState);
    },
    setViewEditRecipeOpen({ commit }, openState) {
      commit('SET_VIEW_EDIT_RECIPE_OPEN', openState);
    },
    setSelectedRecipe({ commit }, recipe) {
      commit('SET_SELECTED_RECIPE', recipe);
    },
  },
};
