<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">View/Edit Recipe</div>
      </template>
      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <div class="label">Title</div>
            <textarea
              v-model="title"
              type="text"
              id="title"
              placeholder="title"
            ></textarea>
          </div>
          <div class="form-group">
            <img :src="image" style="max-width: 80%; max-height: 160px" />
          </div>
          <div class="form-group">
            <div class="label">Description</div>
            <textarea
              v-model="description"
              type="text"
              id="title"
              placeholder="description"
            ></textarea>
          </div></div
      ></template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="submitUpdate">Update</button>
        <button class="btn btn-danger" @click="deleteRecipe">Delete</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { db } from '../firebase/config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Modal from './Modal.vue';

export default {
  props: ['recipe', 'open'],
  data() {
    return {
      title: null,
      url: null,
      image: null,
      description: null,
    };
  },
  components: { Modal },
  methods: {
    ...Vuex.mapActions(['updateRecipe', 'deleteRecipe']),
    async submitUpdate() {
      const recipeRef = doc(db, 'recipes', this.recipe.id);
      const { title, url, image, description } = this;
      const updates = { title, url, image, description };
      await updateDoc(recipeRef, updates);

      this.updateRecipe({ ...this.recipe, title, url, image, description });
      this.close();
    },
    async deleteRecipe() {
      await deleteDoc(doc(db, 'recipes', this.recipe.id));
      this.close();
      this.$emit('recipe-deleted');
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    recipe(newVal) {
      this.title = newVal?.title;
      this.url = newVal?.url;
      this.image = newVal?.image;
      this.description = newVal?.description;
    },
  },
};
</script>
