<template>
  <div class="collections">
    <div
      class="collection"
      v-for="collection in collections"
      :key="collection.id"
    >
      <i
        v-if="isChecked(collection.id)"
        class="fa fa-check-circle"
        aria-hidden="true"
        @click="removeFromSelected(collection.id)"
      ></i>
      <i
        v-else
        class="fa fa-circle-o"
        aria-hidden="true"
        @click="addToSelected(collection.id)"
      ></i>
      <span>{{ collection.name }}</span>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  props: {
    selected: {
      default: () => [],
      type: Array,
    },
  },
  emits: ['update'],
  methods: {
    addToSelected(id) {
      this.$emit('update', [...this.selected, id]);
    },
    removeFromSelected(id) {
      const index = this.selected.findIndex(
        (collectionId) => collectionId === id
      );
      const newSelections = [
        ...this.selected.slice(0, index),
        ...this.selected.slice(index + 1),
      ];
      this.$emit('update', newSelections);
    },
    isChecked(id) {
      return this.selected.includes(id);
    },
  },

  computed: {
    ...Vuex.mapState(['collections']),
  },
};
</script>

<style scoped>
.collection {
  display: flex;
  align-items: center;
}

.collection input[type='checkbox'] {
  width: auto;
}
</style>
