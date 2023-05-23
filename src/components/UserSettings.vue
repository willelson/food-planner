<template>
  <div class="page-container">
    <div class="page-title">User Settings</div>
    Hello, "{{ user.email }}"!
    <div>My planner: {{ planner?.name }}</div>
    <div>
      <button @click="logout" class="btn btn-primary">Logout</button>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export default {
  computed: {
    ...Vuex.mapState(['user', 'planner']),
  },
  methods: {
    ...Vuex.mapMutations(['setUser', 'setPlanner']),
    async logout() {
      await signOut(auth);

      this.setUser(null);
      this.setPlanner(null);
      localStorage.setItem('user', null);
    },
  },
};
</script>

<style></style>
