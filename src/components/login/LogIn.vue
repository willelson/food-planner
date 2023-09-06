<template>
  <div class="login-page centered">
    <div class="login-box">
      <div class="title">Login</div>
      <div class="form-group full-width">
        <input type="text" placeholder="email" v-model="email" />
      </div>
      <div class="form-group full-width">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <div class="centered">
        <button class="btn btn-primary" @click="login">Login</button>
      </div>
      <div class="centered switch-auth-text" style="margin-top: 8px">
        <span
          >New here?
          <span
            class="switch-auth-link"
            @click="$router.push({ name: 'signup' })"
            >Sign up</span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...Vuex.mapMutations(['setUser']),
    ...Vuex.mapActions(['getPlanners']),
    async login() {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        this.setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.getPlanners();
        this.$router.push({ name: 'calendar' });
      } catch (err) {
        const msg = err?.code || 'Error logging in';
        alert(msg);
      }
    },
  },
};
</script>

<style lang="css" scoped src="@/assets/css/login.css"></style>
<style scoped></style>
