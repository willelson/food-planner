<template>
  <div>
    <div class="mask" @click="$emit('close')"></div>
    <div class="modal">
      <div class="modal-header">
        <slot name="header"></slot>
        <i
          class="fa fa-times calendar-title"
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  z-index: 4;
  background-color: white;
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--black);
  opacity: 0.3;
  z-index: 3;
  top: 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.modal-header i {
  padding-right: 8px;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px;
  display: flex;
  justify-content: center;
}
</style>
