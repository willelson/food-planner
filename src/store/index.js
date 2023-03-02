import { createStore } from 'vuex';

// Firebase imports
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
    async login(context, { email, password }) {
      // TODO: move to login component
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('setUser', response.user);
      } else {
        throw new Error('login failed');
      }
    },

    async logout(context) {
      await signOut(auth);

      context.commit('setUser', null);
    }
  }
});

export default store;
