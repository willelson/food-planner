<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Recipe</div>
      </template>
      <template v-slot:body>
        <div class="form-body">
          <div class="form-group" style="display: flex">
            <input
              v-model="url"
              id="url"
              placeholder="Paste recipe url to fetch"
              @paste="handleUrlPaste"
              class="form-input"
            />
            <button
              class="btn btn-default fetch-button"
              @click="fetchDataClick"
            >
              fetch
            </button>
          </div>

          <div>
            <div class="form-group">
              <custom-text-area
                :value="title"
                @input="(value) => (title = value)"
                type="text"
                id="title"
                placeholder="Title"
                :loading="contentLoading"
              ></custom-text-area>
            </div>
            <div class="form-group">
              <div
                class="image-box"
                :class="{ shimmerBG: contentLoading }"
                style="padding: var(--padding-xs) 0"
                :style="imageStyle"
              ></div>
              <input
                v-model="image"
                id="image"
                :class="{ shimmerBG: contentLoading }"
                placeholder="Image URL"
                class="form-input"
                :loading="contentLoading"
              />
            </div>
            <div class="form-group">
              <div class="label">Collection</div>
              <checkbox-list
                :selected="selectedCollections"
                @update="(value) => (selectedCollections = value)"
                :listItems="'collections'"
              ></checkbox-list>
              <div v-if="collections.length === 0" class="no-results">
                No collections
              </div>
            </div>
            <div class="form-group">
              <custom-text-area
                :value="description"
                @input="(value) => (description = value)"
                id="description"
                placeholder="Description"
                :loading="contentLoading"
              ></custom-text-area>
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
import { db } from '../../firebase/config';
import {
  addDoc,
  updateDoc,
  Timestamp,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';
import isUrl from 'is-url';

import Modal from '../Modal.vue';
// import LoadingSpinner from '../utils/LoadingSpinner.vue';
import CheckboxList from './CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  data() {
    return {
      title: null,
      url: null,
      image: null,
      description: null,
      selectedCollections: [],
      fetchContentDisabled: false,
      contentLoading: false,
      contentLoaded: false,
      manualEntry: false,
    };
  },
  props: ['open'],
  components: { Modal, CheckboxList, CustomTextArea },
  methods: {
    clearFields() {
      this.title = null;
      this.url = null;
      this.image = null;
      this.description = null;
      this.collections = [];
    },
    close() {
      this.$emit('close');
      this.clearFields();
      this.fetchContentDisabled = false;
      this.contentLoading = false;
      this.contentLoaded = false;
      this.manualEntry = false;
    },
    async addRecipe() {
      const { title, url, image, description } = this;
      const currentPlanner = { ...this.planner };
      const currentUser = { ...this.user };

      const recipeRef = await addDoc(collection(db, 'recipes'), {
        title,
        url,
        image,
        description,
        collections: this.selectedCollections,
        plannerId: currentPlanner.id,
        createdAt: Timestamp.fromDate(new Date()),
        addedBy: currentUser.uid,
      });

      for (let collectionId of this.selectedCollections) {
        const collectionRef = doc(db, 'collections', collectionId);
        const collection = await getDoc(collectionRef);
        const data = collection.data();
        const recipes = [...data.recipes, recipeRef.id];
        await updateDoc(collectionRef, { recipes });
      }

      this.close();
    },
    handleUrlPaste(event) {
      const url = event.clipboardData.getData('text');
      if (isUrl(url)) {
        this.fetchContent(url);
      }
    },
    fetchDataClick() {
      if (!isUrl(this.url)) {
        alert('Entered URL is not valid');
      } else {
        this.fetchContent(this.url);
      }
    },
    async fetchContent(url) {
      this.contentLoading = true;
      try {
        const res = await fetch(
          `https://url-preview-generator.onrender.com/preview?url=${url}`
        );
        const data = await res.json();

        this.contentLoading = false;
        this.contentLoaded = true;

        this.title = data.title;
        this.description = data.description;

        if (data.images.length > 0) {
          let filteredImages = data.images
            .filter((img) => !img.includes('.svg'))
            .filter((img) => !img.includes('_logo'));
          if (filteredImages.length > 0) {
            this.image = filteredImages[0];
          }
        } else {
          this.image = data.images[0];
        }
      } catch (err) {
        this.contentLoading = false;
        this.contentLoaded = false;
        alert('Unable to load this content, please try again later');
      }
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'user', 'collections']),
    imageStyle() {
      if (isUrl(this.image)) {
        return `background-image: url(${this.image})`;
      } else if (!this.contentLoading) {
        return 'background: #f6f6f6';
      }

      return '';
    },
    showAllFormFields() {
      return (this.contentLoaded || this.manualEntry) && !this.contentLoading;
    },
  },
};
</script>

<style lang="css" scoped src="@/assets/css/animation.css"></style>
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

.fetch-button {
  margin-right: 0;
}

.form-input {
  height: 40px;
  font-size: 16px;
  font-family: 'Noto Serif';
  padding: var(--padding-sm);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  width: 100%;
}
</style>
