<template>
  <div class="login-page centered">
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
          <span
            class="switch-auth-link"
            @click="$router.push({ name: 'login' })"
            >Log in</span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { auth } from '@/firebase/config';
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
          this.$router.push({ name: 'calendar' });
        }
      } catch (err) {
        const msg = err?.code || 'Error signing up';
        console.error(msg);
        alert(msg);
      }
    },
  },
};
</script>

<style lang="css" scoped src="@/assets/css/login.css"></style>
<style scoped></style>
