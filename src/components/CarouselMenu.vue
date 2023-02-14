<template>
  <ul class="scroll-container">
    <li
      v-for="column in imageColumns"
      v-bind:key="`col-${column[0].id}`"
      class="scroll-item"
    >
      <div
        v-for="image in column"
        :key="image.id"
        class="image-box"
        :style="{
          backgroundImage: `url('${image.url}')`
        }"
      ></div>
    </li>
  </ul>
</template>

<script>
import { images } from '../database';
export default {
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
  padding: 0 16px;
}
.scroll-item {
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
}

.scroll-item .calendar-entry:last-child {
  margin-bottom: 0px;
}

/* FLEXBOX LAYOUT */
.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
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

.image-box {
  aspect-ratio: 1 / 1;
  border: 1px solid white;
  border-radius: var(--border-radius);
  margin-bottom: var(--padding-sm);
  width: 100%;
  background-size: cover;
}
</style>
