<template>
  <ul class="scroll-container">
    <li
      v-for="column in imageColumns"
      v-bind:key="`col-${column[0].id}`"
      class="scroll-item"
    >
      <RecipeImageBox
        v-for="{ id } in column"
        :id="id"
        :image="id"
        :key="id"
        :showTitle="false"
        :selected="id === selection"
        :faded="selection && id !== selection"
        @click="$emit('update:selection', id)"
      />
    </li>
  </ul>
</template>

<script>
import RecipeImageBox from './RecipeImageBox.vue';
import { images } from '../database';

export default {
  props: ['selection'],
  emits: ['update:selection'],
  components: {
    RecipeImageBox
  },
  data() {
    return {
      images: []
    };
  },
  computed: {
    imageColumns() {
      const result = [];
      const columnSize = 2;
      for (let i = 0; i < this.images.length; i += columnSize)
        result.push(this.images.slice(i, i + columnSize));
      return result;
    }
  },
  created() {
    this.images = images;
  }
};
</script>

<style scoped>
/* SCROLL SNAPPING */
.scroll-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: var(--padding-sm) var(--padding);
  margin-top: var(--padding-xs);
}
.scroll-item {
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
}

.scroll-item .recipe-image-box:last-child {
  margin-bottom: 0px;
}

/* FLEXBOX LAYOUT */
.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.scroll-container .scroll-item {
  margin-right: var(--padding-sm); /* fake gap */
  flex: 0 0 auto;
}

.scroll-item {
  width: 31%;
  display: flex;
  align-items: center;
}
</style>
