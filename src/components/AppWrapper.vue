<template>
  <div class="app-wrapper">
    <CalendarView />
    <FooterNav />
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue';
import FooterNav from './FooterNav.vue';

export default {
  components: {
    CalendarView,
    FooterNav
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
