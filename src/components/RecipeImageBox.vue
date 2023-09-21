<template>
  <div
    class="recipe-image-box"
    :class="{ 'show-title': showTitle, selected, faded }"
    :key="id"
    @click="$emit('click', id)"
  >
    <div v-if="usesColor" :style="colorStyle"></div>
    <img v-else :src="imageSrc" />
    <div v-if="deleteMode" class="delete-btn" @click="deleteClicked">
      <i class="fa fa-times" style="font-size: 20px"></i>
    </div>
    <div class="title-box">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
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
    imageData: {
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
    color: {
      type: String,
      default: '',
    },
  },
  methods: {
    deleteClicked() {
      this.$emit('delete');
    },
  },
  computed: {
    boxStyle() {
      let style = {};
      if (this.image) {
        style = { backgroundImage: 'url(' + this.image + ')' };
      } else if (this.color) {
        style = { backgroundColor: this.color };
      }

      return style;
    },
    imageSrc() {
      if (this.imageData) return this.imageData;
      else return this.image;
    },
    usesColor() {
      return !this.imageData && !this.image;
    },
    colorStyle() {
      let color = this.color;
      if (!color) color = 'var(--grey)';

      return `height: 60%; width: 100%; background-color: ${color}`;
    },
  },
};
</script>

<style scoped>
.recipe-image-box {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 24vh;
  background-color: white;
}

.title-box {
  overflow: hidden;
  padding: var(--padding-sm);
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  flex: 1;
}

.title-box p {
  margin: 0;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
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

img {
  object-fit: cover;
  height: 60%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>
