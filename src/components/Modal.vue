<template>
  <div>
    <transition name="fade">
      <div
        class="mask"
        :class="{ 'layered-mask': layered }"
        v-if="open"
        @click="$emit('close')"
      ></div>
    </transition>

    <transition name="slide">
      <div class="modal" v-if="open" :style="`height: ${this.height}`">
        <div class="modal-header">
          <slot name="header"></slot>
          <i
            class="fa fa-times page-title"
            @click="$emit('close')"
            aria-hidden="true"
          ></i>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      default: false,
      type: Boolean,
    },
    height: {
      default: '85%',
      type: String,
    },
    layered: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: white;
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
}

.slide-enter-active {
  animation: slideup 0.5s;
}
.slide-leave-active {
  animation: slideup 0.5s reverse;
}

@keyframes slideup {
  0% {
    bottom: -90%;
  }
  100% {
    bottom: 0;
  }
}

.fade-enter-active {
  animation: fadein 0.5s;
}
.fade-leave-active {
  animation: fadein 0.5s reverse;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--black);
  opacity: 0.3;
  z-index: 3;
  top: 0;
  left: 0;
}

.layered-mask {
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--padding-sm) 0;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: var(--padding);
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
}
</style>
