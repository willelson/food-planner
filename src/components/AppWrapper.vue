<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <router-view />
    <FooterNav v-if="showFooter" v-model:page="selectedPage" />
  </div>
</template>

<script>
import Vuex from 'vuex';
import FooterNav from '@/components/FooterNav.vue';

export default {
  data() {
    return {
      selectedPage: 'calendar',
    };
  },
  components: {
    FooterNav,
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
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setUser(user);
      this.fetchPlanners();
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
