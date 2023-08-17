<template>
  <div class="page-container">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="page-title">Recipes</div>
      <div>
        <i
          class="fa fa-plus"
          style="font-size: 24px; margin-right: var(--padding)"
          aria-hidden="true"
          @click="showAddDropdown = true"
        ></i>
        <context-menu :show="showAddDropdown" @close="showAddDropdown = false">
          <template v-slot:body>
            <div class="context-menu">
              <div
                class="context-item"
                @click="
                  showAddCollectionForm = true;
                  showAddDropdown = false;
                "
              >
                <i class="fa fa-list-alt" aria-hidden="true"></i>Collection
              </div>
              <div
                class="context-item"
                @click="
                  showAddRecipeForm = true;
                  showAddDropdown = false;
                "
              >
                <i class="fa fa-cutlery" aria-hidden="true"></i>Recipe
              </div>
            </div>
          </template>
        </context-menu>
      </div>
    </div>
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
    </div>

    <div v-show="selectedTab === 'collections'">
      <div class="recipe-grid">
        <RecipeImageBox
          v-for="{ title, id, color } in collections"
          :title="title"
          :id="id"
          :key="id"
          :color="color"
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
  </div>
  <div>
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
import AddRecipe from '@/components/recipes/AddRecipe.vue';
import RecipeImageBox from '@/components/RecipeImageBox.vue';
import AddCollection from '@/components/recipes/AddCollection.vue';
import ViewEditRecipe from '@/components/recipes/ViewEditRecipe.vue';
import ContextMenu from '@/components/ContextMenu.vue';

export default {
  data() {
    return {
      showAddRecipeForm: false,
      showViewEditRecipeForm: false,
      showAddCollectionForm: false,
      selectedRecipe: null,
      selectedTab: 'collections',
      showAddDropdown: false,
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
    ContextMenu,
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

.context-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: white;
  z-index: 30;
  right: var(--padding);
  top: 10px;
  box-shadow: 0px 0px 28px var(--grey);
}

.context-menu .context-item {
  display: flex;
  gap: 6px;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: var(--padding);
}

.context-menu .context-item:last-child {
  border-bottom: none;
}
</style>
