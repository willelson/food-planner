<template>
  <div class="calendar">
    <div class="calendar-title">Calendar</div>
    <div class="day-container">
      <div class="day">Sun 30</div>
      <div class="day">Mon 31</div>
      <div class="day">Tue 1</div>
      <div class="day">Mon 2</div>
      <div class="day">Wed 3</div>
      <div class="day">Thu 4</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
  .calendar-title {
    padding: 20px;
    font-size: 28px;
    color: var(--black);
  }

  .calendar {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .day-container {
    display: flex;
    flex: 1;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .day-container .day {
    min-width: 33.3%;
    border-right: 2px var(--secondary) solid;
    scroll-snap-align: start;
  }

  .day-container .day:last-child {
    border: none;
  }</style>
