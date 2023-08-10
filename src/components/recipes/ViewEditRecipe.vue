<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">View/Edit Recipe</div>
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
            <div
              class="image-box"
              style="padding: var(--padding-xs) 0"
              :style="imageStyle"
            ></div>
          </div>
          <div class="form-group" style="padding: 0 var(--padding)">
            <div style="text-align: right">
              <a :href="url" target="_blank" class="hyperlink"
                >Source <i class="fa fa-external-link" aria-hidden="true"></i
              ></a>
            </div>
          </div>
          <div class="form-group">
            <checkbox-list
              :selected="selectedCollections"
              @update="updateCollectionList"
              :listItems="'collections'"
              title="Collections"
              placeholder="No collections selected..."
            ></checkbox-list>
          </div>
          <div class="form-group">
            <custom-text-area
              :value="description"
              @input="(value) => (description = value)"
              type="text"
              id="title"
              placeholder="Description"
            ></custom-text-area>
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
import { db } from '../../firebase/config';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import isUrl from 'is-url';

import Modal from '../Modal.vue';
import CheckboxList from './CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  props: ['recipe', 'open'],
  data() {
    return {
      title: null,
      url: null,
      image: null,
      description: null,
      selectedCollections: [],
      initialCollections: [],
    };
  },
  components: { Modal, CheckboxList, CustomTextArea },
  methods: {
    ...Vuex.mapActions(['updateRecipe', 'deleteRecipe']),
    async submitUpdate() {
      const recipeRef = doc(db, 'recipes', this.recipe.id);
      const { title, url, image, description } = this;
      const updates = {
        title,
        url,
        image,
        description,
        collections: this.selectedCollections,
      };
      await updateDoc(recipeRef, updates);

      this.updateRecipe({ ...this.recipe, ...updates });
      this.removeRecipeFromCollections();
      this.$emit('recipe-updated');
      this.close();
    },
    async deleteRecipe() {
      await deleteDoc(doc(db, 'recipes', this.recipe.id));
      this.close();
      this.$emit('recipe-deleted');
    },
    async removeRecipeFromCollections() {
      // collections recipe has been removed from
      const outdatedCollections = this.initialCollections.filter(
        (collection) => !this.selectedCollections.includes(collection)
      );
      const currentRecipeId = this.recipe.id;

      for (let collectionId of outdatedCollections) {
        const collectionRef = doc(db, 'collections', collectionId);
        const collection = await getDoc(collectionRef);
        const data = collection.data();

        const index = data.recipes.findIndex(
          (recipeId) => recipeId === currentRecipeId
        );

        const recipes = [
          ...data.recipes.slice(0, index),
          ...data.recipes.slice(index + 1),
        ];
        await updateDoc(collectionRef, { recipes });
      }

      if (outdatedCollections.length > 0) {
        this.$emit('recipe-deleted');
      }
    },
    updateCollectionList(selections) {
      this.selectedCollections = selections;
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    imageStyle() {
      if (isUrl(this.image)) {
        return `background-image: url(${this.image})`;
      } else if (!this.contentLoading) {
        return 'background: #f6f6f6';
      }

      return '';
    },
  },
  watch: {
    recipe(newVal) {
      this.title = newVal?.title;
      this.url = newVal?.url;
      this.image = newVal?.image;
      this.description = newVal?.description;
      this.selectedCollections = newVal?.collections;
      this.initialCollections = newVal?.collections;
    },
  },
};
</script>
<style scoped>
.image-box {
  position: relative;
  width: 100%;
  height: 220px;
  background-size: cover;
  margin-bottom: 8px;
  margin-left: -16px;
  width: calc(100% + 32px);
}
</style>
