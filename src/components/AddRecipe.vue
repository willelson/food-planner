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
import Vuex from 'vuex';
import { db } from '../firebase/config';
import { addDoc, Timestamp, collection } from 'firebase/firestore';

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
    clearFields() {
      this.title = null;
      this.url = null;
      this.image = null;
    },
    close() {
      this.$emit('close');
      this.clearFields();
    },
    async addRecipe() {
      const { title, url, image } = this;
      const currentPlanner = { ...this.planner };
      const currentUser = { ...this.user };

      const docRef = await addDoc(collection(db, 'recipes'), {
        title,
        url,
        image,
        plannerId: currentPlanner.id,
        createdAt: Timestamp.fromDate(new Date()),
        addedBy: currentUser.uid
      });

      this.close();
    }
  },
  computed: {
    ...Vuex.mapState(['planner', 'user'])
  }
};
</script>

<style scoped></style>
