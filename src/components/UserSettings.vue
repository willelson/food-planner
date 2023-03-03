<template>
  <div>
    Hello {{ user.email }}
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export default {
  computed: {
    ...Vuex.mapState(['user'])
  },
  methods: {
    ...Vuex.mapMutations(['setUser']),
    async logout() {
      await signOut(auth);

      this.setUser(null);
      localStorage.setItem('user', null);
    }
  }
};
</script>

<style></style>
