<template>
  <div class="calendar page-container">
    <div class="page-title">{{ currentMonth }}</div>
    <div class="calendar-body">
      <div
        class="day-container"
        v-for="(day, index) in calendarEntries"
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
          v-for="entry in day.entries"
          :title="entry.recipe?.title"
          :id="entry.recipe?.id"
          :image="entry.recipe?.image"
          :key="entry.recipe?.id"
        />
      </div>
    </div>
    <AddToCalendar
      :selectedDay="selectedDay"
      @close="closeAddToCalendar"
      @entry-added="handleNewEntries"
    />
  </div>
</template>

<script>
import Vuex from 'vuex';
import { sameDay } from '../database';
import AddToCalendar from './AddToCalendar.vue';
import RecipeImageBox from './RecipeImageBox.vue';

import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

import { db } from '../firebase/config';

export default {
  components: {
    AddToCalendar,
    RecipeImageBox,
  },
  data() {
    return {
      timeoutId: null,
      selectedDay: null,
      calendarEntries: [],
    };
  },
  methods: {
    ...Vuex.mapActions(['fetchPlanners']),
    dayContainerClass(day) {
      const today = new Date();
      if (new Date(day.date).getDay() === today.getDay()) {
        return 'highlight-today';
      }

      return '';
    },
    closeAddToCalendar() {
      this.selectedDay = null;
    },
    onClick(day) {
      // Open modal upon double click
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => (this.timeoutId = null), 500);
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.selectedDay = day.date;
      }
    },
    handleNewEntries() {
      this.getWeekEntries();
    },

    async getWeekEntries() {
      const entriesRef = collection(db, 'calendar-entries');
      const startfulldate = Timestamp.fromDate(new Date(this.weekDates[0]));
      const endfulldate = Timestamp.fromDate(new Date(this.weekDates[6]));

      let entries = this.weekDates.map((date) => ({
        date,
        entries: [],
      }));

      this.calendarEntries = entries;

      const id = this.planner?.id;
      if (!id) {
        await this.fetchPlanners();
      }
      const q = query(
        entriesRef,
        where('plannerId', '==', this.planner?.id),
        where('date', '>=', startfulldate),
        where('date', '<=', endfulldate)
      );

      const entriesSnapshot = await getDocs(q);

      entriesSnapshot.forEach(async (document) => {
        const entryData = document.data();

        const dateIndex = this.weekDates.findIndex((day) => {
          const entryDate = new Date(entryData.date.seconds * 1000);
          const weekDate = new Date(day);
          return sameDay(weekDate, entryDate);
        });

        entries = [
          ...entries.slice(0, dateIndex),
          {
            ...entries[dateIndex],
            entries: [...entries[dateIndex]['entries'], entryData],
          },
          ...entries.slice(dateIndex + 1),
        ];
        this.calendarEntries = entries;
      });
    },
  },
  computed: {
    ...Vuex.mapState(['planner']),
    weekDates() {
      const today = new Date();
      const current = today;
      const week = new Array();

      // Set the current date to the previous monday
      if (current.getDay() === 0) {
        current.setDate(current.getDate() - 6);
      } else {
        current.setDate(current.getDate() - current.getDay() + 1);
      }

      for (var i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return week;
    },
    currentMonth() {
      const today = new Date();
      return today.toLocaleString('default', { month: 'long' });
    },
  },
  async mounted() {
    let now = new Date();
    let todayIndex = now.getDay() - 1;

    // Set the Sunday index to 6 as we always want to start from Monday
    if (now.getDay() === 0) {
      todayIndex = 6;
    }

    await this.getWeekEntries();
    const todayElement = document.getElementById(`day-${todayIndex}`);
    todayElement.scrollIntoView({ inline: 'start' });
  },
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
