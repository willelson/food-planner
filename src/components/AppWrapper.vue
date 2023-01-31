<template>
  <div class="app-wrapper">
  <CalendarView />
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue'

export default {
  components: {
    CalendarView
  }

}
</script>

<style scoped>
.app-wrapper {
  height: 100%;
}
</style>