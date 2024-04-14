<template>
  <div class="page-container">
    <div class="page-title">User Settings</div>
    Hello, "{{ user?.email }}"!
    <div>My planner: {{ planner?.name }}</div>
    <div>
      <button @click="logout" class="btn btn-primary">Logout</button>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { SHOPPING_LIST } from '../database';

export default {
  computed: {
    ...Vuex.mapState(['user', 'planner']),
  },
  methods: {
    ...Vuex.mapActions([
      'setUser',
      'setPlanner',
      'setRecipes',
      'setCollections',
    ]),
    async logout() {
      await signOut(auth);

      this.setUser(null);
      this.setPlanner(null);
      this.setRecipes(null);
      this.setCollections(null);
      localStorage.setItem('user', null);
      localStorage.setItem(SHOPPING_LIST, null);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style></style>
