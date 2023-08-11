<template>
  <ul class="scroll-container">
    <li
      v-for="(column, colIndex) in imageColumns"
      v-bind:key="`col-${colIndex}`"
      class="scroll-item"
    >
      <RecipeImageBox
        v-for="(image, index) in column"
        :id="`carousell-image-${colIndex}-${index}`"
        :image="image.url"
        :key="image.id"
        :showTitle="false"
        :selected="image.id === selection"
        :faded="selection && image.url !== selection"
        @click="$emit('update:selection', image.url)"
      />
    </li>
  </ul>
</template>

<script>
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import RecipeImageBox from '@/components/RecipeImageBox.vue';

export default {
  props: ['selection'],
  emits: ['update:selection'],
  components: {
    RecipeImageBox,
  },
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async getImages() {
      const imagesRef = collection(db, 'images');
      const querySnapshot = await getDocs(imagesRef);

      const fetchedImages = [];

      querySnapshot.forEach((doc) => {
        const imageData = doc.data();
        fetchedImages.push({ id: doc.id, ...imageData });
      });
      this.images = fetchedImages;
    },
  },
  computed: {
    imageColumns() {
      const result = [];
      const columnSize = 2;
      for (let i = 0; i < this.images.length; i += columnSize)
        result.push(this.images.slice(i, i + columnSize));
      return result;
    },
  },
  created() {
    this.getImages();
  },
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
