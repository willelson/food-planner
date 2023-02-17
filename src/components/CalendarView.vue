<template>
  <div class="calendar page-container">
    <div class="page-title">{{ currentMonth }}</div>
    <div class="calendar-body">
      <div
        class="day-container"
        v-for="(day, index) in weekDates"
        :key="`day-${index}`"
        :id="`day-${index}`"
        :class="dayContainerClass(day)"
        @click="onClick(day)"
      >
        <div class="day-title">
          {{
            new Date(day.date).toLocaleString('default', { weekday: 'short' })
          }}
          <span style="font-weight: bold">{{
            new Date(day.date).getDate()
          }}</span>
        </div>
        <RecipeImageBox
          v-for="{ title, image, id } in day.recipes"
          :title="title"
          :id="id"
          :image-id="image"
          :key="id"
        />
      </div>
    </div>
    <AddToCalendar :selectedDay="selectedDay" @close="closeAddToCalendar" />
  </div>
</template>

<script>
import { recipes, calendarEntries } from '../database';
import AddToCalendar from './AddToCalendar.vue';
import RecipeImageBox from './RecipeImageBox.vue';

export default {
  components: {
    AddToCalendar,
    RecipeImageBox
  },
  data() {
    return {
      timeoutId: null,
      selectedDay: null
    };
  },
  methods: {
    dayContainerClass(day) {
      const today = new Date();
      if (day.date.getDay() === today.getDay()) {
        return 'highlight-today';
      }

      return '';
    },
    openAddToCalendar() {},
    closeAddToCalendar() {
      this.selectedDay = null;
    },
    onClick(day) {
      // Open modal updon double click
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => (this.timeoutId = null), 500);
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.selectedDay = day;
      }
    }
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
          recipes: dayRecipes
        });
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
    let todayIndex = now.getDay() - 1;

    // Set the Sunday index to 6 as we always want to start from Monday
    if (now.getDay() === 0) {
      todayIndex = 6;
    }

    const todayElement = document.getElementById(`day-${todayIndex}`);
    this.$nextTick(() => todayElement.scrollIntoView({ inline: 'start' }));
  }
};
</script>

<style>
.page-title {
  padding: var(--padding-sm) var(--padding);
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
