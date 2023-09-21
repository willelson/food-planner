<template>
  <div class="calendar page-container">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="page-title">{{ currentMonth }}</div>
      <div style="display: flex; align-items: center">
        <span
          style="color: var(--primary); margin-right: var(--padding)"
          @click="toggleEditMode"
        >
          {{ editMode ? 'done' : 'edit' }}</span
        >
        <i
          class="fa fa-plus"
          style="
            color: var(--black);
            margin-right: var(--padding);
            font-size: 24px;
          "
          aria-hidden="true"
          @click="showAddDropdown = true"
        ></i>
        <context-menu :show="showAddDropdown" @close="showAddDropdown = false">
          <template v-slot:body>
            <div class="context-menu">
              <div
                class="context-item"
                @click="
                  showAddToCalendar = true;
                  showAddDropdown = false;
                "
              >
                <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>Entry
              </div>
              <div
                class="context-item"
                @click="
                  showAddRecipeForm = true;
                  showAddDropdown = false;
                "
              >
                <i class="fa fa-cutlery" aria-hidden="true"></i>Recipe
              </div>
            </div>
          </template>
        </context-menu>
      </div>
    </div>
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
        <div class="day-entries">
          <RecipeImageBox
            v-for="entry in day.entries"
            :title="entry.recipe?.title"
            :id="entry.recipe?.id"
            :image="entry.recipe?.image"
            :imageData="entry.recipe?.imageData"
            :key="entry.recipe?.id"
            :deleteMode="editMode"
            @delete="deleteEntry(entry, index)"
            @click="recipeClicked"
          />
        </div>
      </div>
    </div>
  </div>
  <div>
    <AddToCalendar
      :selectedDay="selectedDay"
      :open="showAddToCalendar"
      @close="closeAddToCalendar"
      @entry-added="handleNewEntries"
    />
    <ViewEditRecipe
      :open="showViewEditRecipeForm"
      @close="recipeViewClosed"
      @recipe-updated="getWeekEntries"
      @recipe-deleted="getWeekEntries"
      :recipe="selectedRecipe"
    />
    <AddRecipe :open="showAddRecipeForm" @close="showAddRecipeForm = false" />
  </div>
</template>

<script>
import Vuex from 'vuex';
import { sameDay } from '../database';
import AddToCalendar from '@/components/AddToCalendar.vue';
import AddRecipe from '@/components/recipes/AddRecipe.vue';
import RecipeImageBox from '@/components/RecipeImageBox.vue';
import ViewEditRecipe from '@/components/recipes/ViewEditRecipe.vue';
import ContextMenu from '@/components/ContextMenu.vue';

import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';

import { db } from '@/firebase/config';

export default {
  components: {
    AddToCalendar,
    RecipeImageBox,
    ViewEditRecipe,
    AddRecipe,
    ContextMenu,
  },
  data() {
    return {
      timeoutId: null,
      selectedDay: null,
      calendarEntries: [],
      showAddToCalendar: false,
      editMode: false,
      selectedRecipe: null,
      showViewEditRecipeForm: false,
      showAddRecipeForm: false,
      showAddDropdown: false,
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
      this.showAddToCalendar = false;
    },
    onClick(day) {
      // Open modal upon double click
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => (this.timeoutId = null), 500);
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.selectedDay = day.date;
        this.showAddToCalendar = true;
        this.editMode = false;
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
        const entryData = { ...document.data(), id: document.id };

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
    async deleteEntry(entry, dayIndex) {
      await deleteDoc(doc(db, 'calendar-entries', entry.id));
      const dayEntries = this.calendarEntries[dayIndex].entries;
      const entryIndex = dayEntries.findIndex((e) => e.id === entry.id);
      const updatedEntries = [
        ...dayEntries.slice(0, entryIndex),
        ...dayEntries.slice(entryIndex + 1),
      ];

      this.calendarEntries[dayIndex] = {
        ...this.calendarEntries[dayIndex],
        entries: updatedEntries,
      };
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    recipeClicked(id) {
      this.selectedRecipe = { ...this.recipes.find((r) => r.id === id) };
      this.showViewEditRecipeForm = true;
    },
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'recipes']),
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
.calendar {
  display: flex;
  flex-direction: column;
}

.calendar-body {
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  position: relative;
}

.calendar-body .day-container {
  min-width: 33.3%;
  border-right: 1px var(--border) solid;
  scroll-snap-align: start;
  padding: 8px;
  padding-bottom: 0px;
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
  max-height: 100%;
  overflow: hidden;
  color: white;
  font-weight: bold;
  text-align: right;
  left: 0;
  bottom: 0;
  padding: 6px;
  z-index: 2;
}

.day-entries {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
<style scoped>
.context-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: white;
  z-index: 30;
  right: var(--padding);
  top: 20px;
  box-shadow: 0px 0px 28px var(--grey);
}

.context-menu .context-item {
  display: flex;
  gap: 6px;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: var(--padding);
}

.context-menu .context-item:last-child {
  border-bottom: none;
}
</style>
