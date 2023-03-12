<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Entry</div>
      </template>
      <template v-slot:body>
        <div class="form-group">
          <div class="label">Day</div>
          <div class="week-container">
            <div
              v-for="day in weekDates"
              class="week-day"
              :class="{ selected: isSelected(day) }"
              :key="day"
              @click="handleDaySelection(day)"
            >
              {{ getDayString(day) }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="label">Recipe</div>
          <div class="recipe-grid">
            <RecipeImageBox
              v-for="{ title, image, id } in recipes"
              :title="title"
              :id="id"
              :image="image"
              :key="id"
              :selected="selectedRecipes.includes(id)"
              :faded="
                selectedRecipes.length > 0 && !selectedRecipes.includes(id)
              "
              @click="toggleRecipeSelection(id)"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="addRecipe">Add</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from 'vuex';
import Modal from './Modal.vue';
import RecipeImageBox from './RecipeImageBox.vue';
import { sameDay } from '../database';
import { db } from '../firebase/config';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      weekdays: [],
      selectedDays: [],
      selectedRecipes: []
    };
  },
  props: ['selectedDay', 'weekStart'],
  emits: ['addRecipe', 'close'],
  components: { Modal, RecipeImageBox },
  methods: {
    ...Vuex.mapActions(['getRecipes']),
    close() {
      this.selectedDays = [];
      this.selectedRecipes = [];
      this.$emit('close');
    },
    addToCalendar() {
      this.close();
    },
    handleDaySelection(day) {
      const selectionIndex = this.selectedDays.findIndex((d) => d === day);
      if (selectionIndex >= 0) {
        this.selectedDays = [
          ...this.selectedDays.splice(0, selectionIndex),
          ...this.selectedDays.splice(selectionIndex + 1)
        ];
      } else {
        this.selectedDays.push(day);
      }
    },
    toggleRecipeSelection(id) {
      const selectionIndex = this.selectedRecipes.indexOf(id);

      if (selectionIndex >= 0) {
        this.selectedRecipes = [
          ...this.selectedRecipes.splice(0, selectionIndex),
          ...this.selectedRecipes.splice(selectionIndex + 1)
        ];
      } else this.selectedRecipes.push(id);
    },
    async addRecipe() {
      const currentPlanner = { ...this.planner };
      const currentUser = { ...this.user };
      this.selectedDays.forEach((day) => {
        this.selectedRecipes.forEach(async (recipeId) => {
          const entriesRef = collection(db, 'calendar-entries');
          const recipe = this.recipes.find((recipe) => recipe.id === recipeId);

          const entry = {
            recipeId,
            plannerId: currentPlanner.id,
            createdAt: Timestamp.fromDate(new Date()),
            date: Timestamp.fromDate(new Date(day)),
            addedBy: currentUser.uid,
            recipe
          };
          await addDoc(entriesRef, entry);
        });
      });
      this.$emit('entry-added');
      this.$emit('close');
    },
    getDayString(day) {
      return new Date(day).toLocaleString('default', {
        weekday: 'short'
      });
    },
    isSelected(day) {
      return this.selectedDays.some((d) => sameDay(d, day));
    }
  },
  computed: {
    ...Vuex.mapState(['recipes', 'planner', 'user']),
    open() {
      return this.selectedDay !== null;
    },
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
    }
  },
  watch: {
    selectedDay(newVal) {
      this.selectedDays = [newVal];
    }
  },
  mounted() {
    this.getRecipes();
  }
};
</script>

<style scoped>
.week-container {
  display: flex;
}

.week-container .week-day {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding);
  width: 12%;
  color: var(--primary);
  margin: var(--padding-xs);
}

.week-day.selected {
  color: white;
  background-color: var(--primary);
  border-radius: var(--border-radius);
  font-weight: bold;
}

.recipe-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--grid-gap);
  padding: var(--padding);
}
</style>
