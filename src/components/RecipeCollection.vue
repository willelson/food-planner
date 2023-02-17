<template>
  <div class="page-container">
    <div class="page-title">Recipes</div>
    <div class="recipe-grid">
      <div class="add-button">
        <div class="add-text" @click="showAddRecipeForm = true">
          <i class="fa fa-plus" style="font-size: 28px" aria-hidden="true"></i>
          <div>Add new</div>
        </div>
      </div>
      <RecipeImageBox
        v-for="{ title, image, id } in recipes"
        :title="title"
        :id="id"
        :image-id="image"
        :key="id"
      />
    </div>
    <AddRecipe :open="showAddRecipeForm" @close="recipeFormClosed" />
  </div>
</template>

<script>
import { getRecipes } from '../database';
import AddRecipe from './AddRecipe.vue';
import RecipeImageBox from './RecipeImageBox.vue';

export default {
  data() {
    return {
      recipes: [],
      showAddRecipeForm: false
    };
  },
  methods: {
    recipeFormClosed() {
      this.showAddRecipeForm = false;
      this.recipes = getRecipes();
    }
  },
  components: {
    AddRecipe,
    RecipeImageBox
  },
  mounted() {
    this.recipes = getRecipes();
  }
};
</script>

<style scoped>
.recipe-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--grid-gap);
  padding: var(--padding);
}

.recipe-image-box {
  margin-bottom: 0px;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-sm) 0px;
  border: 1px solid white;
  border-radius: var(--border-radius);
  width: 100%;
  background-color: var(--border);
  aspect-ratio: 1/1;
}

.add-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
