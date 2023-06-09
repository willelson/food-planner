<template>
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
          @click="$emit('authModeChange', 'signUp')"
          >Sign up</span
        ></span
      >
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  emits: ['authModeChange'],
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
        this.getPlanners;
      } catch (err) {
        const msg = err?.code || 'Error logging in';
        alert(msg);
      }
    },
  },
};
</script>

<style scoped>
/* @import '/src/assets/css/login.css'; */
/* TODO import fromm css file */

.login-page {
  height: 100%;
  background-color: var(--primary);
  background: linear-gradient(30deg, var(--primary) 0%, var(--tertiary) 100%);
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary);
  font-weight: bold;
  font-size: 22px;
  padding-bottom: var(--padding-sm);
}

.login-box {
  padding: var(--padding);
  border-radius: 24px;
  background-color: white;
  width: 80%;
}

.switch-auth-text {
  padding-top: 0px;
  font-size: 14px;
}

.switch-auth-link {
  color: var(--primary);
  cursor: pointer;
}

.form-group {
  padding-top: 0px !important;
}
</style>
