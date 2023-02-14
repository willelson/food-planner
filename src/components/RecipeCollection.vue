<template>
  <div class="page-container">
    <div class="page-title">Recipes</div>
    <div class="recipe-grid">
      <div class="add-button">
        <div class="add-text" @click="showAddRecipeForm = true">
          <i class="fa fa-plus" style="font-size: 28px;" aria-hidden="true"></i>
          <div>Add new</div>
        </div>
      </div>
      <div
        class="calendar-entry"
        v-for="(recipe, index) in recipes"
        :key="`recipe-${index}`"
        :style="{ backgroundImage: 'url(' + getImageUrl(recipe.image) + ')' }"
      >
        <div class="entry-title">{{ recipe.title }}</div>
      </div>
    </div>
    <AddRecipe :open="showAddRecipeForm" @close="showAddRecipeForm = false" />
  </div>
</template>

<script>
import { recipes, getImage } from '../database';
import AddRecipe from './AddRecipe.vue';

export default {
  data() {
    return {
      recipes,
      showAddRecipeForm: false,
    };
  },
  methods: {
    getImageUrl(id) {
      return getImage(id)
    }
  },
  components: {
    AddRecipe,
  },
};
</script>

<style scoped>
.recipe-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--grid-gap);
  padding: var(--padding)
}

.calendar-entry {
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
}

.add-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
