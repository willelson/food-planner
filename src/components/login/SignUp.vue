<template>
  <div class="login-box">
    <div class="title">Sign Up</div>
    <div class="form-group full-width">
      <input type="email" placeholder="email" v-model="email" />
    </div>
    <div class="form-group full-width">
      <input type="text" placeholder="name" v-model="name" />
    </div>
    <div class="form-group full-width">
      <input type="password" placeholder="password" v-model="password" />
    </div>
    <div class="centered">
      <button class="btn btn-primary" @click="signUpUser">Sign up</button>
    </div>
    <div class="centered switch-auth-text" style="margin-top: 8px">
      <span
        >Already have an account?
        <span class="switch-auth-link" @click="$emit('authModeChange', 'login')"
          >Log in</span
        ></span
      >
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...Vuex.mapMutations(['setUser']),
    async signUpUser() {
      const { email, password } = this;
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (response) {
          this.setUser(response.user);
        }
      } catch (err) {
        const msg = err?.code || 'Error signing up';
        console.error(msg);
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
