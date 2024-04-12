<template>
  <div v-if="notMobile" style="height: 100%">
    <LandingPage />
  </div>
  <div v-else-if="!isInStandaloneMode" style="height: 100%">
    <MobileDownloadInstructions />
  </div>
  <div v-else style="height: 100%; display: flex; flex-direction: column">
    <router-view />
    <Modals />
    <FooterNav v-if="showFooter" />
  </div>
</template>

<script>
import Vuex from 'vuex';
import FooterNav from '@/components/FooterNav.vue';
import LandingPage from '@/components/LandingPage.vue';
import MobileDownloadInstructions from '@/components/MobileDownloadInstructions.vue';

import Modals from '@/components/Modals.vue';

export default {
  data() {
    return {};
  },
  components: {
    FooterNav,
    LandingPage,
    MobileDownloadInstructions,
    Modals,
  },
  methods: {
    ...Vuex.mapMutations(['setUser']),
    ...Vuex.mapActions(['fetchPlanners']),
    changePage(page) {
      this.selectedPage = page;
    },
  },
  computed: {
    ...Vuex.mapState(['user']),
    showFooter() {
      const route = this.$router.currentRoute.value.name;

      return !['login', 'signup'].includes(route);
    },
    notMobile() {
      if (process.env.NODE_ENV === 'development') return false;

      let hasTouchScreen = false;
      if ('maxTouchPoints' in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
      } else if ('msMaxTouchPoints' in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
      } else {
        const mQ = matchMedia?.('(pointer:coarse)');
        if (mQ?.media === '(pointer:coarse)') {
          hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
          hasTouchScreen = true; // deprecated, but good fallback
        } else {
          // Only as a last resort, fall back to user agent sniffing
          const UA = navigator.userAgent;
          hasTouchScreen =
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
        }
      }
      return !hasTouchScreen;
    },
    isInStandaloneMode() {
      if (process.env.NODE_ENV === 'development') return true;
      return window.matchMedia('(display-mode: standalone)').matches;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setUser(user);
      this.fetchPlanners();
    }
    // Using free service that will spin down due to inactivity
    // Call this endpoint to wake it up when the app is opened
    const wakeUpWebService = this.isInStandaloneMode && !this.notMobile;
    if (wakeUpWebService) {
      fetch('https://url-preview-generator.onrender.com/wake');
    }
  },
};
</script>

<style scoped>
.app-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
