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
            <img
              v-if="imageData"
              class="image-box"
              :src="imageData"
              style="object-fit: cover"
            />
            <div
              v-else
              class="image-box"
              style="padding: var(--padding-xs) 0"
              :style="imageStyle"
            >
              <div class="img-controls" @click="showImgUrl = true">
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </div>
            </div>
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
          </div>
        </div>
        <modal
          @close="showImgUrl = false"
          :open="showImgUrl"
          height="35%"
          :layered="true"
        >
          <template v-slot:header>
            <div class="page-title">Image</div>
          </template>
          <template v-slot:body>
            <div class="form-group">
              <custom-text-area
                :value="image"
                @input="(value) => (image = value)"
                id="image"
                placeholder="Image URL"
                class="form-input"
              ></custom-text-area>
            </div>
          </template>
          <template v-slot:footer>
            <button class="btn btn-default" @click="showImgUrl = false">
              Done
            </button>
          </template>
        </modal>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="submitUpdate">Update</button>
        <button class="btn btn-danger" @click="deleteRecipe">Delete</button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { db } from '@/firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import isUrl from 'is-url';
import { updateRecipe } from '@/components/recipes/helpers.js';

import Modal from '@/components/layout/Modal.vue';
import CheckboxList from '@/components/utils/CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  props: ['open'],
  data() {
    return {
      title: null,
      url: null,
      image: null,
      imageData: null,
      description: null,
      selectedCollections: [],
      initialCollections: [],
      showImgUrl: false,
    };
  },
  components: { Modal, CheckboxList, CustomTextArea },
  methods: {
    ...mapActions(['deleteRecipe', 'getRecipes']),
    ...mapActions('modals', ['setSelectedRecipe']),
    async submitUpdate() {
      const { title, url, image, description } = this;
      const updates = { title, url, image, description };
      updates.collections = this.selectedCollections;
      const { id } = this.selectedRecipe;
      updateRecipe(id, updates);

      this.getRecipes();
      this.close();
    },
    async deleteRecipe() {
      await deleteDoc(doc(db, 'recipes', this.selectedRecipe.id));
      this.close();
      this.getRecipes();
    },
    updateCollectionList(selections) {
      this.selectedCollections = selections;
    },
    close() {
      this.$emit('close');
      this.setSelectedRecipe(null);
    },
  },
  computed: {
    ...mapState('modals', ['selectedRecipe']),
    imageStyle() {
      if (isUrl(this.image)) {
        return `background-image: url(${this.image})`;
      }

      return 'background: #f6f6f6';
    },
  },
  watch: {
    selectedRecipe(newVal) {
      this.title = newVal?.title || '';
      this.url = newVal?.url || '';
      this.image = newVal?.image || '';
      this.imageData = newVal?.imageData || '';
      this.description = newVal?.description || '';
      this.selectedCollections = newVal?.collections;
      this.initialCollections = newVal?.collections;
    },
  },
};
</script>
<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped></style>
