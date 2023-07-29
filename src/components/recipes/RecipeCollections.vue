<template>
  <div class="page-container">
    <div class="page-title">Recipes</div>
    <div class="recipe-grid">
      <div class="add-button recipe">
        <div class="add-text" @click="showAddRecipeForm = true">
          <i class="fa fa-plus" style="font-size: 28px" aria-hidden="true"></i>
          <div>Recipe</div>
        </div>
      </div>
      <div class="add-button collection">
        <div class="add-text" @click="() => console.log('add new collection')">
          <i class="fa fa-plus" style="font-size: 28px" aria-hidden="true"></i>
          <div>Collection</div>
        </div>
      </div>
      <div class="add-button all-recipes">
        <div class="add-text" @click="() => console.log('show all recipes')">
          <i class="fa fa-book" style="font-size: 28px" aria-hidden="true"></i>
          <div>All recipes</div>
        </div>
      </div>
    </div>
    <div style="padding: 0 var(--padding)">Collections</div>
    <div class="recipe-grid">
      <RecipeImageBox
        v-for="{ name, id } in collections"
        :title="name"
        :id="id"
        :key="id"
        @click="recipeBoxClicked"
      />
    </div>
    <AddRecipe :open="showAddRecipeForm" @close="recipeFormClosed" />
  </div>
</template>

<script>
import Vuex from 'vuex';
import AddRecipe from './AddRecipe.vue';
import RecipeImageBox from './../RecipeImageBox.vue';

export default {
  data() {
    return {
      showAddRecipeForm: false,
      showViewEditRecipeForm: false,
      selectedRecipe: null,
    };
  },
  methods: {
    ...Vuex.mapActions(['getCollections']),
    recipeFormClosed() {
      this.showAddRecipeForm = false;
      this.getCollections();
    },
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
    recipeBoxClicked(id) {
      this.$router.push({ name: 'collection', params: { id } });
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'collections']),
  },
  components: {
    AddRecipe,
    RecipeImageBox,
  },
  mounted() {
    this.getCollections();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped></style>
