<template>
  <div>
    <modal @close="close" :open="open">
      <template v-slot:header>
        <div class="page-title">New Recipe</div>
      </template>
      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <div class="label">Title</div>
            <input v-model="title" type="text" id="title" />
          </div>
          <div class="form-group">
            <div class="label">URL</div>
            <input v-model="url" type="text" id="url" />
          </div>
          <div class="form-group full-width">
            <div class="label">Photo</div>
            <CarouselMenu v-model:selection="image" />
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
import Modal from './Modal.vue';
import CarouselMenu from './CarouselMenu.vue';

import { idGenerator, RECIPES, addItem } from '../database';

export default {
  data() {
    return {
      title: null,
      url: null,
      image: null
    };
  },
  props: ['open'],
  components: { Modal, CarouselMenu },
  methods: {
    clearFields() {
      this.title = null;
      this.url = null;
      this.image = null;
    },
    close() {
      this.$emit('close');
      this.clearFields();
    },
    addRecipe() {
      const { title, url, image } = this;
      const newRecipe = { id: idGenerator(), title, url, image };
      addItem(RECIPES, newRecipe);

      this.close();
    }
  }
};
</script>

<style scoped></style>
