<template>
  <div class="page-container">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="page-title">Recipes</div>
      <div>
        <i
          class="fa fa-plus add-content-button"
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
                  setAddRecipeOpen(true);
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

    <div v-show="selectedTab === 'collections'" style="flex: 1 1 0%">
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
      <div v-if="collections?.length === 0" class="no-results">
        No collections
      </div>
    </div>
    <div v-show="selectedTab === 'all'" style="flex: 1 1 0%">
      <div class="recipe-grid">
        <RecipeImageBox
          v-for="{ title, image, id, imageData } in recipes"
          :title="title"
          :id="id"
          :image="image"
          :imageData="imageData"
          :key="id"
          @click="openRecipe(id)"
        />
      </div>
      <div v-if="recipes?.length === 0" class="no-results">No recipes</div>
    </div>
  </div>
  <div>
    <AddCollection
      :open="showAddCollectionForm"
      @close="collectionFormClosed"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RecipeImageBox from '@/components/utils/RecipeImageBox.vue';
import AddCollection from '@/components/recipes/AddCollection.vue';
import ContextMenu from '@/components/utils/ContextMenu.vue';

export default {
  data() {
    return {
      showAddCollectionForm: false,
      selectedTab: 'all',
      showAddDropdown: false,
    };
  },
  methods: {
    ...mapActions(['getCollections', 'getRecipes']),
    ...mapActions('modals', [
      'setAddRecipeOpen',
      'setViewEditRecipeOpen',
      'setSelectedRecipe',
    ]),
    collectionFormClosed() {
      this.showAddCollectionForm = false;
      this.getCollections();
    },
    openCollection(id) {
      this.$router.push({ name: 'collection', params: { id } });
    },
    openRecipe(id) {
      const selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.setSelectedRecipe(selectedRecipe);
      this.setViewEditRecipeOpen(true);
    },
    async refreshData() {
      await this.getRecipes();
      await this.getCollections();
    },
  },
  computed: {
    ...mapState(['planner', 'collections', 'recipes']),
    ...mapState('modal', ['viewEditRecipeOpen']),
  },
  components: {
    AddCollection,
    RecipeImageBox,
    ContextMenu,
  },
  mounted() {
    this.getRecipes();
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
