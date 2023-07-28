<template>
  <div class="collections">
    <div
      class="collection"
      v-for="collection in collections"
      :key="collection.id"
    >
      <input
        type="checkbox"
        @input="(event) => updateCollectionList(event, collection.id)"
      />
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
  emits: ['update:selected'],
  methods: {
    updateCollectionList(event, id) {
      let newSelections;
      if (event.target.checked) {
        newSelections = [...this.selected, id];
      } else {
        const index = this.selected.findIndex(
          (collectionId) => collectionId === id
        );
        newSelections = [
          ...this.selected.slice(0, index),
          ...this.selected.slice(index + 1),
        ];
      }

      this.$emit('update', newSelections);
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
