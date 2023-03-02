<template>
  <div style="height: 100%">
    <div class="app-wrapper" v-if="user">
      <CalendarView v-if="selectedPage === 'calendar'" />
      <RecipeCollection v-if="selectedPage === 'recipes'" />
      <ShoppingList v-if="selectedPage === 'shopping'" />
      <FooterNav v-model:page="selectedPage" />
    </div>
    <LoginPage v-else />
  </div>
</template>

<script>
import Vuex from 'vuex';
import CalendarView from './CalendarView.vue';
import RecipeCollection from './RecipeCollection.vue';
import ShoppingList from './ShoppingList.vue';
import FooterNav from './FooterNav.vue';
import LoginPage from './LoginPage.vue';

export default {
  data() {
    return {
      selectedPage: 'calendar'
    };
  },
  components: {
    CalendarView,
    RecipeCollection,
    ShoppingList,
    FooterNav,
    LoginPage
  },
  methods: {
    changePage(page) {
      this.selectedPage = page;
    }
  },
  computed: {
    ...Vuex.mapState(['user'])
  }
};
</script>

<style scoped>
.app-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
