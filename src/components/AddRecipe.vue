<template>
  <div>
    <modal @close="cancel" :open="open">
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
            <carousel-menu v-model:selection="image"> </carousel-menu>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="cancel">Cancel</button>
        <button class="btn btn-primary">Add</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import CarouselMenu from './CarouselMenu.vue';

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
    cancel() {
      this.$emit('close');
      this.title = null;
      this.url = null;
      this.image = null;
    }
  }
};
</script>

<style scoped></style>
