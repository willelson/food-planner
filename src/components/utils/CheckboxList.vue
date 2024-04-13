<template>
  <div>
    <div class="input-container">
      <div class="selected-bubbles">
        <div v-if="selectedLabels.length === 0" class="placeholder">
          {{ placeholder }}
        </div>
        <div
          v-else
          class="selection"
          v-for="item in selectedLabels"
          :key="`bubble-${item}`"
        >
          {{ item }}
        </div>
      </div>
      <i class="fa fa-chevron-down" aria-hidden="true" @click="open = true"></i>
    </div>
    <modal @close="open = false" :open="open" :height="'65%'" :layered="true">
      <template v-slot:header>
        <div class="page-title">{{ title }}</div>
      </template>
      <template v-slot:body>
        <div class="options">
          <div
            class="option"
            v-for="option in options"
            :key="option.id"
            @click="clickHandler(option.id)"
          >
            <i
              v-if="isChecked(option.id)"
              class="fa fa-check-circle check-circle"
              aria-hidden="true"
            ></i>
            <i
              v-else
              class="fa fa-circle-thin check-circle"
              aria-hidden="true"
            ></i>
            <span
              class="option-title"
              :class="{ checked: isChecked(option.id) }"
              >{{ option.title }}</span
            >
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-default" @click="open = false">Done</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from 'vuex';

import Modal from '@/components/layout/Modal.vue';

export default {
  data() {
    return {
      open: false,
    };
  },
  props: {
    selected: {
      default: () => [],
      type: Array,
    },
    listItems: {
      default: '',
      type: String,
    },
    title: {
      default: 'Select',
      type: String,
    },
    placeholder: {
      default: 'Select...',
      type: String,
    },
  },
  emits: ['update'],
  components: {
    Modal,
  },
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
    clickHandler(id) {
      if (this.isChecked(id)) {
        this.removeFromSelected(id);
      } else {
        this.addToSelected(id);
      }
    },
  },

  computed: {
    ...Vuex.mapState(['collections', 'recipes']),
    options() {
      // pass in as a prop?
      switch (this.listItems) {
        case 'collections':
          return this.collections;
        case 'recipes':
          return this.recipes;
        default:
          return [];
      }
    },
    selectedLabels() {
      const labels = [];
      for (const id of this.selected) {
        const option = this.options.find((o) => o.id === id);
        labels.push(option.title);
      }
      return labels;
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

.option .fa-circle-o {
  color: var(--grey);
}

.option .fa-circle-check {
  color: var(--primary);
}

.option-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #8e8a81;
  transition: color 0.2s ease;
}

.input-container {
  padding: var(--padding-sm);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  width: 100%;
  display: flex;
}

.options {
  padding: var(--padding);
}
.option-title.checked {
  color: var(--black);
}

.selected-bubbles {
  flex: 1;
  display: flex;
  gap: 4px;
  display: flex;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
  overflow: hidden;
}

.selection {
  border-radius: var(--border-radius);
  color: var(--black);
  background: var(--tertiary);
  padding: 4px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.placeholder {
  color: var(--placeholder);
}
</style>
