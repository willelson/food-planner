<template>
  <div class="page-container">
    <div class="page-title">Recipes</div>
    <div class="tab-pane">
      <div
        :class="['tab', { selected: selectedTab === 'collections' }]"
        @click="selectedTab = 'collections'"
      >
        Collections
      </div>
      <span>/</span>
      <div
        :class="['tab', { selected: selectedTab === 'all' }]"
        @click="selectedTab = 'all'"
      >
        All
      </div>
      <div style="margin-left: auto; padding: 2px 0">
        <i
          class="fa fa-plus"
          style="font-size: 1.3em"
          aria-hidden="true"
          @click="addButtonClick"
        ></i>
      </div>
    </div>

    <div v-show="selectedTab === 'collections'">
      <div class="recipe-grid">
        <RecipeImageBox
          v-for="{ title, id } in collections"
          :title="title"
          :id="id"
          :key="id"
          @click="openCollection"
        />
      </div>
      <div v-if="collections.length === 0" class="no-results">
        No collections
      </div>
    </div>
    <div v-show="selectedTab === 'all'">
      <div class="recipe-grid">
        <RecipeImageBox
          v-for="{ title, image, id } in recipes"
          :title="title"
          :id="id"
          :image="image"
          :key="id"
          @click="openRecipe"
        />
      </div>
      <div v-if="recipes.length === 0" class="no-results">No recipes</div>
    </div>
    <AddRecipe :open="showAddRecipeForm" @close="recipeFormClosed" />
    <AddCollection
      :open="showAddCollectionForm"
      @close="collectionFormClosed"
    />
    <ViewEditRecipe
      :open="showViewEditRecipeForm"
      @close="recipeViewClosed"
      @recipe-updated="getCollections"
      @recipe-deleted="getCollections"
      :recipe="selectedRecipe"
    />
  </div>
</template>

<script>
import Vuex from 'vuex';
import AddRecipe from './AddRecipe.vue';
import RecipeImageBox from './../RecipeImageBox.vue';
import AddCollection from './AddCollection.vue';
import ViewEditRecipe from './ViewEditRecipe.vue';

export default {
  data() {
    return {
      showAddRecipeForm: false,
      showViewEditRecipeForm: false,
      showAddCollectionForm: false,
      selectedRecipe: null,
      selectedTab: 'collections',
    };
  },
  methods: {
    ...Vuex.mapActions(['getCollections', 'getRecipes']),
    recipeFormClosed() {
      this.showAddRecipeForm = false;
      this.getRecipes();
    },
    collectionFormClosed() {
      this.showAddCollectionForm = false;
      this.getCollections();
    },
    openCollection(id) {
      this.$router.push({ name: 'collection', params: { id } });
    },
    openRecipe(id) {
      this.selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.showViewEditRecipeForm = true;
    },
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
    addButtonClick() {
      if (this.selectedTab === 'collections') this.showAddCollectionForm = true;
      else if (this.selectedTab === 'all') this.showAddRecipeForm = true;
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'collections', 'recipes']),
  },
  components: {
    AddRecipe,
    AddCollection,
    RecipeImageBox,
    ViewEditRecipe,
  },
  mounted() {
    this.getCollections();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped>
.tab-pane {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 var(--padding);
  width: 100%;
}

.tab {
  padding: 2px 0;
}

.tab.selected {
  color: var(--primary);
  border-bottom: 1px solid var(--primary);
}

.no-results {
  padding-top: 100px;
}
</style>
