import { createStore } from 'vuex';

// Firebase imports
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async logout(context) {
      await signOut(auth);

      context.commit('setUser', null);
    }
  }
});

export default store;
