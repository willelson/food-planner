import { createStore } from 'vuex';

// Firebase imports
import { auth, db } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
} from 'firebase/firestore';

import modalsModule from '@/store/modals.module';

const store = createStore({
  modules: {
    modals: modalsModule,
  },
  state: {
    user: null,
    planner: null,
    recipes: [],
    collections: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setPlanner(state, payload) {
      state.planner = payload;
    },
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setCollections(state, payload) {
      state.collections = payload;
    },
  },
  actions: {
    async logout(context) {
      await signOut(auth);

      context.commit('setUser', null);
    },
    async fetchPlanners(context) {
      const plannersRef = collection(db, 'planners');
      const { uid } = context.state.user;
      const q = query(plannersRef, where('creatorUID', '==', uid));
      const querySnapshot = await getDocs(q);

      const doc = querySnapshot.docs[0];
      if (!doc) {
        await context.dispatch('createPlanner');
      }
      const testPlanner = { ...doc.data(), id: doc.id };
      context.commit('setPlanner', testPlanner);
      context.dispatch('getRecipes');
      context.dispatch('getCollections');
    },
    async createPlanner(context) {
      await addDoc(collection(db, 'planners'), {
        creatorUID: context.state.user.uid,
        name: 'test',
      });
    },
    async getRecipes(context) {
      if (context.state.planner === null) return;
      const recipesRef = collection(db, 'recipes');
      const q = query(
        recipesRef,
        where('plannerId', '==', context.state.planner.id),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const fetchedRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipeData = doc.data();
        fetchedRecipes.push({ id: doc.id, ...recipeData });
      });

      context.commit('setRecipes', fetchedRecipes);
    },
    updateRecipe(context, recipe) {
      const { recipes } = context.state;
      const recipeIndex = recipes.findIndex((r) => r.id === recipe.id);
      const updatedRecipes = [
        ...recipes.slice(0, recipeIndex),
        recipe,
        ...recipes.slice(recipeIndex + 1),
      ];

      context.commit('setRecipes', updatedRecipes);
    },
    deleteRecipe(context, recipe) {
      const { recipes } = context.state;
      const recipeIndex = recipes.findIndex((r) => r.id === recipe.id);
      if (recipeIndex === -1) return;

      const updatedRecipes = [
        ...recipes.slice(0, recipeIndex),
        ...recipes.slice(recipeIndex + 1),
      ];

      context.commit('setRecipes', updatedRecipes);
    },

    async getCollections(context) {
      if (context.state.planner === null) return;
      const recipesRef = collection(db, 'collections');
      const q = query(
        recipesRef,
        where('plannerId', '==', context.state.planner.id)
      );
      const querySnapshot = await getDocs(q);

      const fetchedCollections = [];

      querySnapshot.forEach((doc) => {
        const collectionData = doc.data();
        fetchedCollections.push({ id: doc.id, ...collectionData });
      });

      context.commit('setCollections', fetchedCollections);
    },
  },
});

export default store;
