<template>
  <div>
    <modal @close="$emit('close')">
      <template v-slot:header>
        <div class="calendar-title">New Recipe</div>
      </template>
      <template v-slot:body>
        <div class="form-body">
          <div class="form-group">
            <div class="label">Title</div>
            <input type="text" id="title" />
          </div>
          <div class="form-group">
            <div class="label">URL</div>
            <input type="text" id="url" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default">Cancel</button>
        <button class="btn btn-primary">Add</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  components: { Modal }
};
</script>

<style scoped>

</style>
