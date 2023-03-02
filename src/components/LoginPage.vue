<template>
  <div class="login-page centered">
    <!-- <div class="login-box" v-if="authMode === 'login'">
      <div class="title">Login</div>
      <div class="form-group full-width">
        <input type="text" placeholder="email" />
      </div>
      <div class="form-group full-width">
        <input type="password" placeholder="password" />
      </div>
      <div class="centered">
        <button class="btn btn-primary" @click="addRecipe">Login</button>
      </div>
      <div class="centered switch-auth-text" style="margin-top: 8px">
        <span
          >New here?
          <span class="switch-auth-link" @click="authMode = 'signUp'"
            >Sign up</span
          ></span
        >
      </div>
    </div>
    <div class="login-box" v-else>
      <div class="title">Sign Up</div>
      <div class="form-group full-width">
        <input type="email" placeholder="email" />
      </div>
      <div class="form-group full-width">
        <input type="text" placeholder="name" />
      </div>
      <div class="form-group full-width">
        <input type="password" placeholder="password" />
      </div>
      <div class="centered">
        <button class="btn btn-primary" @click="addRecipe">Sign up</button>
      </div>
      <div class="centered switch-auth-text" style="margin-top: 8px">
        <span
          >Already have an account?
          <span class="switch-auth-link" @click="authMode = 'login'"
            >Log in</span
          ></span
        >
      </div>
    </div> -->
    <LogIn v-if="authMode === 'login'" @authModeChange="changeAuthMode" />
    <SignUp v-else @authModeChange="changeAuthMode" />
  </div>
</template>

<script>
import LogIn from './login/LogIn.vue';
import SignUp from './login/SignUp.vue';

export default {
  data() {
    return {
      authMode: 'login'
    };
  },
  components: {
    LogIn,
    SignUp
  },
  methods: {
    changeAuthMode(newMode) {
      this.authMode = newMode;
    }
  }
};
</script>

<style scoped>
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
  padding-top: 0px;
}
</style>
