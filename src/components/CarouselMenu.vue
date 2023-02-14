<template>
  <ul class="scroll-container">
    <li class="scroll-item">A</li>
    <li class="scroll-item">B</li>
    <li class="scroll-item">C</li>
    <li class="scroll-item">D</li>
    <li class="scroll-item">E</li>
    <li class="scroll-item">F</li>
    <li class="scroll-item">G</li>
  </ul>
</template>

<script>
export default {};
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
}

/* FLEXBOX LAYOUT */
.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center; /* vertically align children */
}
.scroll-container .scroll-item {
  margin-right: 8px; /* fake gap */
  flex: 0 0 auto;
}

.scroll-item {
  width: 40%;
  /* make it square */
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(0, 0, 0, 0.1);

  /* some basic styling */
  background: #ccc;
  border-radius: 8px;

  /* center contents */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
