<template>
  <div class="calendar">
    <div class="calendar-title">{{ currentMonth }}</div>
    <div class="calendar-body">
      <div
        class="day-container"
        v-for="(day, index) in weekDates"
        :key="`day-${index}`"
        :id="`day-${index}`"
        :class="dayContainerClass(day)"
      >
        {{ day.toLocaleString('default', { weekday: 'short' }) }} {{ day.getDate() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dayContainerClass(day) {
      const today = new Date();
      if (day.getDay() === today.getDay()) {
        return 'highlight-today';
      }

      return '';
    }
  },
  computed: {
    weekDates() {
      const today = new Date();
      const current = today;
      const week = new Array();

      // Starting Monday not Sunday
      current.setDate(current.getDate() - current.getDay() + 1);
      for (var i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return week;
    },
    currentMonth() {
      const today = new Date();
      return today.toLocaleString('default', { month: 'long' });
    }
  },
  mounted() {
    let now = new Date();
    const todayElement = document.getElementById(`day-${now.getDate() + 1}`);
    todayElement.scrollIntoView({ inline: 'start' });
  }
};
</script>

<style>
.calendar-title {
  padding: 20px;
  font-size: 28px;
  color: var(--black);
}

.calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-body {
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.calendar-body .day-container {
  min-width: 33.3%;
  border-right: 1px var(--secondary) solid;
  scroll-snap-align: start;
  padding: 8px;
}

.calendar-body .day-container:last-child {
  border: none;
}

.highlight-today {
  background-color: var(--tertiary);
}
</style>
