<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Entry</div>
      </template>
      <template v-slot:body>
        <div class="add-to-calendar-form">
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
          <div class="form-group recipe-container">
            <div class="label">Recipe</div>
            <div class="recipe-grid">
              <RecipeImageBox
                v-for="recipe in recipes"
                :title="recipe.title"
                :id="recipe.id"
                :image="recipe?.image"
                :imageData="recipe?.imageData"
                :key="recipe.id"
                :selected="selectedRecipes.includes(recipe.id)"
                :faded="
                  selectedRecipes.length > 0 &&
                  !selectedRecipes.includes(recipe.id)
                "
                @click="toggleRecipeSelection(recipe.id)"
              />
            </div>
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
import Modal from '@/components/Modal.vue';
import RecipeImageBox from '@/components/RecipeImageBox.vue';
import { sameDay } from '../database';
import { db } from '@/firebase/config';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      weekdays: [],
      selectedDays: [],
      selectedRecipes: [],
    };
  },
  props: ['selectedDay', 'weekStart', 'open'],
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
      const selectionIndex = this.selectedDays.findIndex((d) =>
        sameDay(new Date(d), new Date(day))
      );
      if (selectionIndex >= 0) {
        this.selectedDays = [
          ...this.selectedDays.splice(0, selectionIndex),
          ...this.selectedDays.splice(selectionIndex + 1),
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
          ...this.selectedRecipes.splice(selectionIndex + 1),
        ];
      } else this.selectedRecipes.push(id);
    },
    async addRecipe() {
      if (this.selectedDays.length === 0) {
        alert('no day selected');
        return;
      }
      if (this.selectedRecipes.length === 0) {
        alert('no recipe selected');
        return;
      }

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
            recipe,
          };
          await addDoc(entriesRef, entry);

          this.selectedRecipes = [];
          this.selectedDays = [];
        });
      });
      this.$emit('entry-added');
      this.$emit('close');
    },
    getDayString(day) {
      return new Date(day).toLocaleString('default', {
        weekday: 'short',
      });
    },
    isSelected(day) {
      return this.selectedDays.some((d) => sameDay(new Date(d), new Date(day)));
    },
  },
  computed: {
    ...Vuex.mapState(['recipes', 'planner', 'user']),
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
  },
  watch: {
    selectedDay(newVal) {
      this.selectedDays = [newVal];
    },
  },
  mounted() {
    this.getRecipes();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped>
.week-container {
  display: flex;
}

.week-container .week-day {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-xs) var(--padding);
  width: 12%;
  color: var(--primary);
  margin: var(--padding-xs);
}

.week-day.selected {
  color: white;
  background-color: rgba(85, 117, 113, 0.75);
  border: 1px solid var(--primary);
  border-radius: var(--border-radius);
}

.recipe-grid {
  overflow-y: auto;
  height: 100%;
}

.recipe-container {
  overflow: hidden;
  flex: 1;
}

.add-to-calendar-form {
  flex-direction: column;
  display: flex;
}
</style>
