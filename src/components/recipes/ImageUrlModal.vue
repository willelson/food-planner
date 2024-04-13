<template>
  <modal @close="$emit('close')" :open="open" height="35%" :layered="true">
    <template v-slot:header>
      <div class="page-title">Image</div>
    </template>
    <template v-slot:body>
      <div class="form-group">
        <custom-text-area
          :value="image"
          @input="$emit('input', value)"
          id="image"
          placeholder="Image URL"
          class="form-input"
        ></custom-text-area>
      </div>
    </template>
    <template v-slot:footer>
      <button class="btn btn-default" @click="$emit('close')">Done</button>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import CustomTextArea from '@/components/utils/CustomTextArea.vue';

export default {
  emits: ['close', 'input'],
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
  },
  components: {
    Modal,
    CustomTextArea,
  },
};
</script>

<style></style>
