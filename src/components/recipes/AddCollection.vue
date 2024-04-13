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
                  selectedColor && selectedColor !== color
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
        <button class="btn btn-primary" @click="addCollectionHandler">
          Add
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { colors } from '@/components/recipes/constants';
import { addCollection } from '@/components/recipes/helpers.js';

import Modal from '@/components/Modal.vue';
import CheckboxList from '@/components/utils/CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  data() {
    return {
      title: null,
      collectionRecipes: [],
      colors,
      selectedColor: null,
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
    async addCollectionHandler() {
      const { title, collectionRecipes, selectedColor } = this;
      const currentPlanner = { ...this.planner };

      const newCollection = {
        title,
        recipes: collectionRecipes,
        plannerId: currentPlanner.id,
        color: selectedColor,
      };

      addCollection(newCollection);
      this.close();
    },
    colorSelection(colour) {
      if (colour === this.selectedColor) this.selectedColor = null;
      else this.selectedColor = colour;
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
