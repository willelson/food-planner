<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Collection</div>
      </template>

      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <div class="label">Title</div>
            <custom-text-area
              :value="title"
              @input="(value) => (title = value)"
              type="text"
              id="title"
              placeholder="title"
            ></custom-text-area>
          </div>
          <div class="form-group">
            <div class="label">Recipes</div>
            <checkbox-list
              :selected="collectionRecipes"
              @update="(value) => (collectionRecipes = value)"
              :listItems="'recipes'"
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
import { db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

import Modal from '../Modal.vue';
import CheckboxList from './CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  data() {
    return {
      title: null,
      collectionRecipes: [],
    };
  },
  props: ['open'],
  components: { Modal, CheckboxList, CustomTextArea },
  methods: {
    clearFields() {
      this.title = null;
      this.collectionRecipes = [];
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

      await addDoc(collection(db, 'collections'), {
        title,
        recipes: collectionRecipes,
        plannerId: currentPlanner.id,
      });

      this.$emit('collection-added');
      this.close();
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
</style>
