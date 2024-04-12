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
        @click="openRecipe(recipe.id)"
      />
    </div>
  </div>
  <div></div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RecipeImageBox from '@/components/RecipeImageBox.vue';

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
      selectedRecipe: null,
      recipes: [],
      title: '',
    };
  },
  methods: {
    ...mapActions(['getRecipes']),
    ...mapActions('modals', [
      'setAddRecipeOpen',
      'setViewEditRecipeOpen',
      'setSelectedRecipe',
    ]),
    openRecipe(id) {
      const selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.setSelectedRecipe(selectedRecipe);
      this.setViewEditRecipeOpen(true);
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
  },
  mounted() {
    this.getCollectionRecipes();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped></style>
