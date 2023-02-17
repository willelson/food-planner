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
              :class="{ selected: selectedDays.includes(day) }"
              :key="day"
              @click="handleDaySelection(day)"
            >
              {{ day }}
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
              :image-id="image"
              :key="id"
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

import { getRecipes } from '../database';

export default {
  data() {
    return {
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      selectedDays: [],
      recipes: []
    };
  },
  props: ['selectedDay'],
  components: { Modal, RecipeImageBox },
  methods: {
    close() {
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
    }
  },
  computed: {
    open() {
      return this.selectedDay !== null;
    }
  },
  mounted() {
    this.recipes = getRecipes();
  }
};
</script>

<style scoped>
.week-container {
  display: flex;
  flex-wrap: wrap;
}

.week-container .week-day {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding);
  width: 22%;
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
