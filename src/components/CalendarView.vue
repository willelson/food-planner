<template>
  <div class="calendar page-container">
    <div class="calendar-title">{{ currentMonth }}</div>
    <div class="calendar-body">
      <div
        class="day-container"
        v-for="(day, index) in weekDates"
        :key="`day-${index}`"
        :id="`day-${index}`"
        :class="dayContainerClass(day)"
      >
        <div class="day-title">
          {{
            new Date(day.date).toLocaleString('default', { weekday: 'short' })
          }}
          <span style="font-weight: bold">{{
            new Date(day.date).getDate()
          }}</span>
        </div>
        <div
          class="calendar-entry"
          v-for="(recipe, index) in day.recipes"
          :key="`recipe-${index}`"
          :style="{ backgroundImage: 'url(' + recipe.image + ')' }"
        >
          <div class="entry-title">{{ recipe.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { recipes, calendarEntries } from '../database';

export default {
  data() {
    return {};
  },
  methods: {
    dayContainerClass(day) {
      const today = new Date();
      if (day.date.getDay() === today.getDay()) {
        return 'highlight-today';
      }

      return '';
    },
  },
  computed: {
    weekDates() {
      const today = new Date();
      const current = today;
      const week = new Array();

      const sameDay = (d1, d2) => {
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      };

      // Starting Monday not Sunday
      // Set the current date to the previous monday
      if (current.getDay() === 0) {
        current.setDate(current.getDate() - 6);
      } else {
        current.setDate(current.getDate() - current.getDay() + 1);
      }
      for (var i = 0; i < 7; i++) {
        const entry = calendarEntries.find((entry) =>
          sameDay(new Date(entry.date), current)
        );
        let dayRecipes = [];

        if (entry) {
          dayRecipes = entry.recipes.map((id) =>
            recipes.find((recipe) => recipe.id === id)
          );
        }

        week.push({
          date: new Date(current),
          recipes: dayRecipes,
        });
        current.setDate(current.getDate() + 1);
      }

      return week;
    },
    currentMonth() {
      const today = new Date();
      return today.toLocaleString('default', { month: 'long' });
    },
  },
  mounted() {
    let now = new Date();
    let todayIndex = now.getDay() - 1;

    // Set the Sunday index to 6 as we always want to start from Monday
    if (now.getDay() === 0) {
      todayIndex = 6;
    }

    const todayElement = document.getElementById(`day-${todayIndex}`);
    this.$nextTick(() => todayElement.scrollIntoView({ inline: 'start' }));
  },
};
</script>

<style>
.calendar-title {
  padding: 8px 0 0 8px;
  font-size: 24px;
  color: var(--primary);
  font-weight: bold;
}

.calendar {
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
  border-right: 1px var(--border) solid;
  scroll-snap-align: start;
  padding: 8px;
}

.calendar-body .day-container:last-child {
  border: none;
}

.highlight-today {
  background: linear-gradient(white, var(--tertiary));
}

.day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-title {
  width: 100%;
  text-align: left;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
}

.calendar-entry {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid white;
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
  background-size: cover;
}
.calendar-entry:after {
  content: '';
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0)
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.6) 100%)
    repeat 0 0;
  z-index: 1;
  border-radius: 8px;
}
.entry-title {
  display: block;
  position: absolute;
  width: 100%;
  color: white;
  font-weight: bold;
  text-align: right;
  left: 0;
  bottom: 0;
  padding: 6px;
  z-index: 2;
}
</style>
