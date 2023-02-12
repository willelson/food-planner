<template>
  <div>
    <div class="mask" @click="this.$emit('close')"></div>
    <div class="modal">
      <div class="modal-header">
        <div class="calendar-title">New Recipe</div>
        <i
          class="fa fa-times calendar-title"
          @click="this.$emit('close')"
          aria-hidden="true"
        ></i>
      </div>
      <div class="form-group">
        <div>Title</div>
        <input type="text" id="title" />
      </div>
      <div class="form-group">
        <div>URL</div>
        <input type="text" id="url" />
      </div>
      <div class="controls">
        <button>Cancel</button>
        <button>Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  z-index: 4;
  background-color: white;
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
}

.modal-header i {
  padding-right: 8px;
}
</style>
