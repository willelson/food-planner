<template>
  <div class="page-container">
    <div class="page-title" style="display: flex; align-items: center">
      <span
        style="
          margin-right: var(--padding-sm);
          color: var(--black);
          font-size: 20px;
        "
        ><i
          class="fa fa-arrow-left"
          @click="goBack"
          aria-hidden="true"
        ></i></span
      >{{ title }}
    </div>
    <div class="recipe-grid">
      <div class="add-button">
        <div class="add-text" @click="setAddRecipeOpen(true)">
          <i class="fa fa-plus" style="font-size: 28px" aria-hidden="true"></i>
          <div>Recipe</div>
        </div>
      </div>
      <RecipeImageBox
        v-for="recipe in recipes"
        :title="recipe.title"
        :id="recipe.id"
        :image="recipe?.image"
        :imageData="recipe?.imageData"
        :key="recipe.id"
        @click="recipeBoxClicked"
      />
    </div>
  </div>
  <div>
    <ViewEditRecipe
      :open="showViewEditRecipeForm"
      @close="recipeViewClosed"
      @recipe-updated="getCollectionRecipes"
      @recipe-deleted="getCollectionRecipes"
      :recipe="selectedRecipe"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RecipeImageBox from '@/components/RecipeImageBox.vue';
import ViewEditRecipe from '@/components/recipes/ViewEditRecipe.vue';

import {
  where,
  getDoc,
  getDocs,
  doc,
  collection,
  query,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  props: ['id'],
  data() {
    return {
      showAddRecipeForm: false,
      showViewEditRecipeForm: false,
      selectedRecipe: null,
      recipes: [],
      title: '',
    };
  },
  methods: {
    ...mapActions(['getRecipes']),
    ...mapActions('modals', ['setAddRecipeOpen']),
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
    recipeBoxClicked(id) {
      this.selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.showViewEditRecipeForm = true;
    },
    async getCollectionRecipes() {
      const recipesRef = collection(db, 'recipes');
      const collectionsRef = doc(db, 'collections', this.id);
      const docSnap = await getDoc(collectionsRef);

      const data = docSnap.data();

      this.title = data.title;

      if (data.recipes.length === 0) {
        this.recipes = [];
        return;
      }

      // This may have to executed in batches of 10
      const q = query(
        recipesRef,
        where('plannerId', '==', this.planner.id),
        where('__name__', 'in', data.recipes)
      );
      const querySnapshot = await getDocs(q);

      const fetchedRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipeData = doc.data();
        fetchedRecipes.push({ id: doc.id, ...recipeData });
      });

      this.recipes = fetchedRecipes;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState(['planner']),
  },
  components: {
    RecipeImageBox,
    ViewEditRecipe,
  },
  mounted() {
    this.getCollectionRecipes();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped></style>
