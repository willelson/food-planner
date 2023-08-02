<template>
  <div
    class="recipe-image-box"
    :class="{ 'show-title': showTitle, selected, faded }"
    :key="id"
    :style="boxStyle"
    @click="$emit('click', id)"
  >
    <div v-if="showTitle" class="entry-title">{{ title }}</div>
    <div v-if="deleteMode" class="delete-btn" @click="deleteClicked">
      <i class="fa fa-times" style="font-size: 20px"></i>
    </div>
  </div>
</template>

<script>
import { getImage } from '../database';

export default {
  emits: ['click'],
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    faded: {
      type: Boolean,
      default: false,
    },
    deleteMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImageUrl(id) {
      return getImage(id);
    },
    deleteClicked() {
      this.$emit('delete');
    },
  },
  computed: {
    boxStyle() {
      if (this.image) {
        return { backgroundImage: 'url(' + this.image + ')' };
      }
      const randomColours = [
        '#ffd313',
        '#ff7300',
        '#e70038',
        '#442bd4',
        '#fb54ad',
        '#66ff00',
        '#08e8de',
      ];

      const index = Math.floor(Math.random() * randomColours.length);
      return { backgroundColor: randomColours[index] };
    },
  },
};
</script>

<style scoped>
.recipe-image-box {
  position: relative;
  padding-top: 100%;
  border: 1px solid white;
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
  background-size: cover;
}
.show-title:after {
  content: '';
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0)
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.6) 100%)
    repeat 0 0;
  z-index: 1;
  border-radius: 8px;
}

.selected {
  border: 3px solid var(--primary);
  box-shadow: 0 0 8px var(--primary);
}

.faded {
  opacity: 0.7;
}

.delete-btn {
  position: absolute;
  background-color: var(--danger);
  padding: 0 var(--padding-xs);
  border-top-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 5;
}
</style>
