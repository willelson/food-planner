<template>
  <div
    class="recipe-image-box"
    :class="{ 'show-title': showTitle, selected, faded }"
    :key="id"
    :style="{ backgroundImage: 'url(' + getImageUrl(imageId) + ')' }"
    @click="$emit('click')"
  >
    <div v-if="showTitle" class="entry-title">{{ title }}</div>
  </div>
</template>

<script>
import { getImage } from '../database';

export default {
  emits: ['click'],
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    imageId: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    faded: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getImageUrl(id) {
      return getImage(id);
    }
  }
};
</script>

<style scoped>
.recipe-image-box {
  position: relative;
  aspect-ratio: 1 / 1;
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
</style>
