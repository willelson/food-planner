<template>
  <div class="page-container">
    <div class="page-title">Recipes</div>
    <div class="recipe-grid">
      <div class="add-button">
        <div class="add-text" @click="showAddRecipeForm = true">
          <i class="fa fa-plus" style="font-size: 28px" aria-hidden="true"></i>
          <div>Recipe</div>
        </div>
      </div>
      <RecipeImageBox
        v-for="{ title, image, id } in recipes"
        :title="title"
        :id="id"
        :image="image"
        :key="id"
        @click="recipeBoxClicked"
      />
    </div>
    <AddRecipe :open="showAddRecipeForm" @close="recipeFormClosed" />
    <ViewEditRecipe
      :open="showViewEditRecipeForm"
      @close="recipeViewClosed"
      @recipe-deleted="getRecipes"
      :recipe="selectedRecipe"
    />
  </div>
</template>

<script>
import Vuex from 'vuex';
import AddRecipe from './AddRecipe.vue';
import RecipeImageBox from './../RecipeImageBox.vue';
import ViewEditRecipe from './ViewEditRecipe.vue';

export default {
  data() {
    return {
      showAddRecipeForm: false,
      showViewEditRecipeForm: false,
      selectedRecipe: null,
    };
  },
  methods: {
    ...Vuex.mapActions(['getRecipes']),
    recipeFormClosed() {
      this.showAddRecipeForm = false;
      this.getRecipes();
    },
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
    recipeBoxClicked(id) {
      this.selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.showViewEditRecipeForm = true;
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'recipes']),
  },
  components: {
    AddRecipe,
    RecipeImageBox,
    ViewEditRecipe,
  },
  mounted() {
    this.getRecipes();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped>
</style>
