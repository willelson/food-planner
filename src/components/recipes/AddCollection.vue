<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Collection</div>
      </template>

      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <custom-text-area
              :value="title"
              @input="(value) => (title = value)"
              type="text"
              id="title"
              placeholder="Title"
            ></custom-text-area>
          </div>
          <div class="form-group">
            <div class="label">Colour</div>
            <div class="colour-selection">
              <div
                v-for="color in colors"
                :key="color"
                class="color"
                @click="colorSelection(color)"
                :style="[
                  `background: ${color}`,
                  selectedColour && selectedColour !== color
                    ? 'opacity: 0.5'
                    : '',
                ]"
              ></div>
            </div>
          </div>
          <div class="form-group">
            <div class="label">Recipes</div>
            <checkbox-list
              :selected="collectionRecipes"
              @update="(value) => (collectionRecipes = value)"
              :listItems="'recipes'"
              title="Select Recipes"
              placeholder="Select Recipes..."
            ></checkbox-list>
            <div v-if="recipes.length === 0" class="no-results">No recipes</div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <button class="btn btn-default" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="addCollection">Add</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

import Modal from '@/components/Modal.vue';
import CheckboxList from '@/components/utils/CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

const colors = [
  '#ffd313',
  '#ff7300',
  '#e70038',
  '#fb54ad',
  '#442bd4',
  '#08e8de',
  '#66ff00',
];

export default {
  data() {
    return {
      title: null,
      collectionRecipes: [],
      colors,
      selectedColour: null,
    };
  },
  props: ['open'],
  components: { Modal, CheckboxList, CustomTextArea },
  methods: {
    clearFields() {
      this.title = null;
      this.collectionRecipes = [];
      this.color = null;
    },
    close() {
      this.$emit('close');
      this.clearFields();
    },
    async addCollection() {
      const { title, collectionRecipes } = this;
      const currentPlanner = { ...this.planner };

      if (!title) {
        alert('Title must not be empty');
        return;
      }

      let color = this.selectedColour;
      if (!color) color = Math.floor(Math.random() * colors.length);

      const collectionRef = await addDoc(collection(db, 'collections'), {
        title,
        color,
        recipes: collectionRecipes,
        plannerId: currentPlanner.id,
      });

      // iterate through recipes and add collection
      for (const recipeId of collectionRecipes) {
        const recipeRef = doc(db, 'recipes', recipeId);
        const recipe = await getDoc(recipeRef);
        const data = recipe.data();
        const collections = [...data.collections, collectionRef.id];
        await updateDoc(recipeRef, { collections });
      }

      this.$emit('collection-added');
      this.close();
    },
    colorSelection(colour) {
      if (colour === this.selectedColour) this.selectedColour = null;
      else this.selectedColour = colour;
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'user', 'recipes']),
  },
};
</script>

<style scoped>
textarea {
  height: 36px;
  overflow-y: hidden;
}

.colour-selection {
  display: flex;
  justify-content: space-around;
  align-items: centers;
}
.color {
  height: 12vw;
  width: 12vw;
  transition: opacity 0.2s linear;
}
</style>
