<template>
  <div>
    <div class="option" v-for="option in options" :key="option.id">
      <i
        v-if="isChecked(option.id)"
        class="fa fa-check-circle check-circle"
        aria-hidden="true"
        @click="removeFromSelected(option.id)"
      ></i>
      <i
        v-else
        class="fa fa-circle-o check-circle"
        aria-hidden="true"
        @click="addToSelected(option.id)"
      ></i>
      <span>{{ option.title }}</span>
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
    listItems: {
      default: '',
      type: String,
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
    ...Vuex.mapState(['collections', 'recipes']),
    options() {
      switch (this.listItems) {
        case 'collections':
          return this.collections;
        case 'recipes':
          return this.recipes;
        default:
          return [];
      }
    },
  },
};
</script>

<style scoped>
.option {
  display: flex;
  gap: var(--padding-sm);
}

.option .check-circle {
  padding-top: 2px;
}
</style>
