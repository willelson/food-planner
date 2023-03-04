import { createStore } from 'vuex';

// Firebase imports
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const store = createStore({
  state: {
    user: null,
    planner: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setPlanner(state, payload) {
      state.planner = payload;
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

      const testPlanner = querySnapshot.docs[0].data();
      context.commit('setPlanner', testPlanner);
    }
  }
});

export default store;
