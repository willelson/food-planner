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
              @keyup="fetchDisabled = false"
              class="form-input"
            />
            <button
              class="btn btn-default fetch-button"
              :class="{ 'btn-disabled': fetchDisabled }"
              :disabled="fetchDisabled"
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
              <img
                v-if="imageData"
                class="image-box"
                :src="imageData"
                style="object-fit: cover"
              />
              <div
                v-else
                class="image-box"
                :class="{ shimmerBG: contentLoading }"
                style="padding: var(--padding-xs) 0"
                :style="imageStyle"
              >
                <div class="img-controls" @click="showImgUrl = true">
                  <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div class="form-group">
              <checkbox-list
                :selected="selectedCollections"
                @update="(value) => (selectedCollections = value)"
                :listItems="'collections'"
                title="Select Collections"
                placeholder="Select Collections..."
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
                :initialHeight="120"
              ></custom-text-area>
            </div>
          </div>
        </div>
        <image-url-modal
          @close="showImgUrl = false"
          :open="showImgUrl"
          :image="image"
          @input="(value) => (image = value)"
        ></image-url-modal>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="addRecipeHandler">Add</button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isUrl from 'is-url';
import { addRecipe } from '@/components/recipes/firebaseHelpers.js';

import Modal from '@/components/layout/Modal.vue';
import CheckboxList from '@/components/utils/CheckboxList.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';
import ImageUrlModal from '@/components/recipes/ImageUrlModal.vue';

export default {
  data() {
    return {
      title: null,
      url: null,
      image: null,
      imageData: null,
      description: null,
      selectedCollections: [],
      fetchContentDisabled: false,
      contentLoading: false,
      contentLoaded: false,
      manualEntry: false,
      showImgUrl: false,
      fetchDisabled: false,
    };
  },
  props: ['open'],
  components: {
    Modal,
    CheckboxList,
    CustomTextArea,
    ImageUrlModal,
  },
  methods: {
    ...mapActions(['getRecipes']),
    clearFields() {
      this.title = null;
      this.url = null;
      this.image = null;
      this.imageData = null;
      this.description = null;
      this.selectedCollections = [];
      this.source = null;
    },
    close() {
      this.$emit('close');
      this.clearFields();
      this.fetchContentDisabled = false;
      this.contentLoading = false;
      this.contentLoaded = false;
      this.manualEntry = false;
    },
    async addRecipeHandler() {
      const { title, url, image, imageData, description, source } = this;
      const newRecipe = { title, url, image, imageData, description, source };
      const currentPlanner = { ...this.planner };
      const currentUser = { ...this.user };

      addRecipe(
        newRecipe,
        currentUser,
        currentPlanner,
        this.selectedCollections
      );

      this.getRecipes();
      this.close();
    },
    handleUrlPaste(event) {
      const url = event.clipboardData.getData('text');
      if (isUrl(url)) {
        this.fetchContent(url);
        setTimeout(() => event.target.blur(), 50);
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
      this.fetchDisabled = true;

      const controller = new AbortController();
      const id = setTimeout(() => {
        controller.abort();
        throw Error('API timeout');
      }, 30000);

      try {
        const res = await fetch(
          `https://url-preview-generator.onrender.com/preview?url=${url}`,
          { signal: controller.signal }
        );
        clearTimeout(id);
        const data = await res.json();

        this.contentLoading = false;
        this.contentLoaded = true;

        this.title = data.title || '';
        this.description = data.description || '';
        this.source = data.source || '';
        this.image = data.image || '';
        this.imageData = data?.imageData || '';
      } catch (err) {
        this.contentLoading = false;
        this.contentLoaded = false;
        alert('Unable to load this content, please try again later');
      }
    },
  },
  computed: {
    ...mapState(['planner', 'user', 'collections']),
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
<style lang="css" scoped src="@/assets/css/recipes.css"></style>
<style scoped>
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
