<template>
  <div class="calendar page-container">
    <div class="calendar-header">
      <div class="page-title">{{ currentMonth }}</div>
      <div class="header-controls">
        <span class="edit-mode-toggle" @click="toggleEditMode">
          {{ editMode ? 'done' : 'edit' }}</span
        >
        <i
          class="fa fa-plus add-content-button"
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
                  setAddRecipeOpen(true);
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
        v-for="(day, index) in weekDays"
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
            @click="openRecipe(entry)"
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddToCalendar from '@/components/calendar/AddToCalendar.vue';
import RecipeImageBox from '@/components/utils/RecipeImageBox.vue';
import ContextMenu from '@/components/utils/ContextMenu.vue';

import {
  getWeeklyEntries,
  deleteEntry,
} from '@/components/calendar/firebaseHelpers';

export default {
  components: {
    AddToCalendar,
    RecipeImageBox,
    ContextMenu,
  },
  data() {
    return {
      timeoutId: null,
      selectedDay: null,
      showAddToCalendar: false,
      editMode: false,
      showAddDropdown: false,
      weekDays: [],
    };
  },
  methods: {
    ...mapActions(['fetchPlanners']),
    ...mapActions('modals', [
      'setAddRecipeOpen',
      'setViewEditRecipeOpen',
      'setSelectedRecipe',
    ]),
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
      if (!this.planner?.id) {
        await this.fetchPlanners();
      }

      const entries = await getWeeklyEntries(this.weekDays, this.planner.id);
      console.log(entries);

      entries.forEach((document) => {
        const entryData = { ...document.data(), id: document.id };
        // Find index in weekDays array to insert calendar entry by calculating the difference
        // in days between the calendar entry and the first day of the week
        const firstDayOfWeek = this.weekDays[0].date;
        const timeDifference = entryData.date.seconds * 1000 - firstDayOfWeek;
        let dayIndex = Math.round(timeDifference / (1000 * 3600 * 24));

        const { entries } = this.weekDays[dayIndex];
        const entryExistsInEntries = entries.find(
          (entry) => entry.id === entryData.id
        );
        if (!entryExistsInEntries) {
          entries.push(entryData);
        }
      });
    },
    async deleteEntry(entry, dayIndex) {
      await deleteEntry(entry.id);
      const dayEntries = this.weekDays[dayIndex].entries;
      const entryIndex = dayEntries.findIndex((e) => e.id === entry.id);
      const updatedEntries = [
        ...dayEntries.slice(0, entryIndex),
        ...dayEntries.slice(entryIndex + 1),
      ];

      this.weekDays[dayIndex] = {
        ...this.weekDays[dayIndex],
        entries: updatedEntries,
      };
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    openRecipe(entry) {
      this.setSelectedRecipe(entry.recipe);
      this.setViewEditRecipeOpen(true);
    },
    recipeViewClosed() {
      this.showViewEditRecipeForm = false;
      this.selectedRecipe = null;
    },
    setWeekDays() {
      const today = new Date();
      const current = today;

      // Set the current date to the previous monday
      if (current.getDay() === 0) {
        current.setDate(current.getDate() - 6);
      } else {
        current.setDate(current.getDate() - current.getDay() + 1);
      }

      for (var i = 0; i < 7; i++) {
        this.weekDays.push({
          date: new Date(current),
          entries: [],
        });
        current.setDate(current.getDate() + 1);
      }

      // Set the time for the first and last date as they are used for the query
      this.weekDays[0].date.setHours(0, 0, 0, 0);
      this.weekDays[6].date.setHours(23, 59, 59);
    },
  },
  computed: {
    ...mapState(['planner']),
    ...mapState('modals', ['addRecipeOpen', 'viewEditRecipeOpen']),
    currentMonth() {
      const today = new Date();
      return today.toLocaleString('default', { month: 'long' });
    },
  },
  mounted() {
    this.setWeekDays();
    this.$nextTick(() => {
      const todayElement = document.getElementById(`day-${todayIndex}`);
      todayElement.scrollIntoView({ inline: 'start' });
    });

    const now = new Date();
    let todayIndex = now.getDay() - 1;
    // Set the Sunday index to 6 as we always want to start from Monday
    if (now.getDay() === 0) {
      todayIndex = 6;
    }

    this.$nextTick(() => {
      const todayElement = document.getElementById(`day-${todayIndex}`);
      todayElement.scrollIntoView({ inline: 'start' });
    });

    this.getWeekEntries();
  },
};
</script>

<style>
.calendar {
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-header .header-controls {
  display: flex;
  align-items: center;
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

.edit-mode-toggle {
  color: var(--primary);
  margin-right: var(--padding);
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
