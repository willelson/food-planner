<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Recipe</div>
      </template>
      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <div class="label">URL</div>
            <input v-model="url" type="text" id="url" @paste="fetchContent" />
            <div style="display: flex; justify-content: end">
              <button class="btn btn-default fetch-button" @click="manualEntry = true">
                enter manually
              </button>
              <button class="btn btn-primary fetch-button" @click="fetchData">
                fetch recipe
              </button>
            </div>
          </div>

          <div
            v-if="contentLoading"
            style="display: flex; justify-content: center"
          >
            <loading-spinner></loading-spinner>
          </div>

          <div v-if="showAllFormFields">
            <div class="form-group">
              <div class="label">Title</div>
              <textarea v-model="title" type="text" id="title"></textarea>
            </div>
            <div class="form-group">
              <div class="label">Image</div>
              <div class="image-box" :style="imageStyle"></div>
            </div>
            <div class="form-group">
              <div class="label">Description</div>
              <textarea v-model="description" type="text" id="title"></textarea>
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
import { addDoc, Timestamp, collection } from 'firebase/firestore';

import Modal from '../Modal.vue';
import LoadingSpinner from '../utils/LoadingSpinner.vue';

export default {
  data() {
    return {
      title: null,
      url: null,
      image: null,
      description: null,
      fetchContentDisabled: false,
      contentLoading: false,
      contentLoaded: false,
      manualEntry: false
    };
  },
  props: ['open'],
  components: { Modal, LoadingSpinner },
  methods: {
    clearFields() {
      this.title = null;
      this.url = null;
      this.image = null;
      this.description = null;
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

      await addDoc(collection(db, 'recipes'), {
        title,
        url,
        image,
        description,
        plannerId: currentPlanner.id,
        createdAt: Timestamp.fromDate(new Date()),
        addedBy: currentUser.uid,
      });

      this.close();
    },
    async fetchContent(event) {
      const url = event.clipboardData.getData('text');
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
        console.log(err);
        console.log('error fetching content');
        this.contentLoading = false;
        this.contentLoaded = false;
        alert('Unable to load this content, please try again later');
      }
    },
  },
  computed: {
    ...Vuex.mapState(['planner', 'user']),
    imageStyle() {
      if (this.image) {
        return `background-image: url(${this.image})`;
      } else return '';
    },
    showAllFormFields() {
      return ((this.contentLoaded || this.manualEntry) && !this.contentLoading)
    }
  },
};
</script>

<style scoped>
.image-box {
  position: relative;
  border: 1px solid orange;
  border-radius: 8px;
  margin-bottom: 8px;
  aspect-ratio: 1 / 1;
  width: 50%;
  background-size: cover;
}

.fetch-button {
  margin-right: 0;
  margin-top: 8px;
}
</style>
