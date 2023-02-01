<template>
  <div class="calendar">
    <div class="calendar-title">Calendar</div>
    <div class="day-container">
      <div
        class="day"
        v-for="(day, index) in weekDates"
        :key="`day-${index}`"
        :id="`day-${index}`"
      >
        {{ getDayString(index) }} {{ day.getDate() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getDayString(index) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days[index];
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
    }
  },
  mounted() {
    let now = new Date();
    const todayElement = document.getElementById(`day-${now.getDate()}`);
    todayElement.scrollIntoView({inline: "start"});
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

.day-container {
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.day-container .day {
  min-width: 33.3%;
  border-right: 2px var(--secondary) solid;
  scroll-snap-align: start;
}

.day-container .day:last-child {
  border: none;
}
</style>
