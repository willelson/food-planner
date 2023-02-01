<template>
  <div class="app-wrapper">
    <CalendarView v-show="selectedPage === 'calendar'" />
    <RecipeCollection v-show="selectedPage === 'recipes'" />
    <ShoppingList v-show="selectedPage === 'shopping'" />
    <FooterNav v-model:page="selectedPage"/>
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue';
import RecipeCollection from './RecipeCollection.vue';
import ShoppingList from './ShoppingList.vue';
import FooterNav from './FooterNav.vue';

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
    FooterNav
  },
  methods: {
    changePage(page) {
      this.selectedPage = page;
    }
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
