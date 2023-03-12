import { createStore } from 'vuex';

// Firebase imports
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const store = createStore({
  state: {
    user: null,
    planner: null,
    recipes: []
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
    }
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
      const testPlanner = { ...doc.data(), id: doc.id };
      context.commit('setPlanner', testPlanner);
      context.dispatch('getRecipes');
    },
    async getRecipes(context) {
      if (context.state.planner === null) return;
      const recipesRef = collection(db, 'recipes');
      const q = query(
        recipesRef,
        where('plannerId', '==', context.state.planner.id)
      );
      const querySnapshot = await getDocs(q);

      const fetchedRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipeData = doc.data();
        fetchedRecipes.push({ id: doc.id, ...recipeData });
      });

      context.commit('setRecipes', fetchedRecipes);
    }
  }
});

export default store;
