<template>
  <div class="page-container">
    <div class="calendar-title">Recipes</div>
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
        :style="{ backgroundImage: 'url(' + recipe.image + ')' }"
      >
        <div class="entry-title">{{ recipe.title }}</div>
      </div>
    </div>
    <AddRecipe v-if="showAddRecipeForm" @close="showAddRecipeForm = false" />
  </div>
</template>

<script>
import { recipes } from '../database';
import AddRecipe from './AddRecipe.vue';

export default {
  data() {
    return {
      recipes,
      showAddRecipeForm: false,
    };
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
  padding: 8px;
  gap: 16px;
}

.calendar-entry {
  margin-bottom: 0px;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0px;
  border: 1px solid white;
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
  background-color: #e5e5e5;
}

.add-button i {
  margin-left: 4px;
}

.add-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
