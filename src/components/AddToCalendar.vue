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
              v-for="day in weekdays"
              class="week-day"
              :class="{ selected: selectedDays.includes(day.dayIndex) }"
              :key="day.dayIndex"
              @click="handleDaySelection(day.dayIndex)"
            >
              {{ day.label }}
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
import Modal from './Modal.vue';
import RecipeImageBox from './RecipeImageBox.vue';

import { getAll, RECIPES } from '../database';

export default {
  data() {
    return {
      weekdays: [
        {
          label: 'Mon',
          dayIndex: 1
        },
        {
          label: 'Tue',
          dayIndex: 2
        },
        {
          label: 'Wed',
          dayIndex: 3
        },
        {
          label: 'Thu',
          dayIndex: 4
        },
        {
          label: 'Fri',
          dayIndex: 5
        },
        {
          label: 'Sat',
          dayIndex: 6
        },
        {
          label: 'Sun',
          dayIndex: 0
        }
      ],
      selectedDays: [],
      recipes: [],
      selectedRecipes: []
    };
  },
  props: ['selectedDay'],
  emits: ['addRecipe', 'close'],
  components: { Modal, RecipeImageBox },
  methods: {
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
    addRecipe() {
      // Required otherwise days and recipes are Proxy objects...
      const days = JSON.parse(JSON.stringify(this.selectedDays));
      const recipes = JSON.parse(JSON.stringify(this.selectedRecipes));

      this.selectedDays = [];
      this.selectedRecipes = [];
      this.$emit('entry-added', days, recipes);
      this.$emit('close');
    }
  },
  computed: {
    open() {
      return this.selectedDay !== null;
    }
  },
  watch: {
    selectedDay(newVal) {
      this.selectedDays = [newVal];
    }
  },
  mounted() {
    this.recipes = getAll(RECIPES);
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
