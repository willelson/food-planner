<template>
  <textarea
    :id="id"
    :placeholder="placeholder"
    @keyup="resize"
    ref="text-area"
    :class="{ shimmerBG: loading }"
    :value="value"
    @input="handleInput"
    @paste="(e) => $emit('paste', e)"
  ></textarea>
</template>

<script>
export default {
  emits: ['input'],
  props: {
    value: {
      default: '',
      type: String,
    },
    id: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    initialHeight: {
      default: null,
      required: false,
      type: Number,
    },
    loading: {
      default: false,
      required: false,
      type: Boolean,
    },
  },

  methods: {
    resize() {
      const textArea = this.$refs['text-area'];
      const height = parseInt(textArea.scrollHeight) + 2;
      const heightString = String(height);
      textArea.style.height = heightString + 'px';
    },
    handleInput(event) {
      this.resize();
      this.$emit('input', event.target.value);
    },
  },
  watch: {
    value() {
      this.resize();
    },
  },
  mounted() {
    if (this.initialHeight) {
      const textArea = this.$refs['text-area'];
      textArea.style.height = String(this.initialHeight) + 'px';
    } else this.resize();
  },
};
</script>

<style lang="css" scoped src="@/assets/css/animation.css"></style>
<style scoped>
textarea {
  height: var(--default-input-height);
  font-size: 16px;
  font-family: 'Noto Serif';
  padding: var(--padding-sm);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  width: 100%;
  resize: none;
  overflow: hidden;
}
</style>
