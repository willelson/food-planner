<template>
  <div
    class="recipe-image-box"
    :key="recipe.id"
    :style="{ backgroundImage: 'url(' + getImageUrl(recipe.image) + ')' }"
    @click="$emit('click')"
  >
    <div class="entry-title">{{ recipe.title }}</div>
  </div>
</template>

<script>
import { getImage } from '../database';

export default {
  emits: ['click'],
  props: ['recipe'],
    methods: {
    getImageUrl(id) {
      return getImage(id)
    },
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
.recipe-image-box:after {
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
</style>
