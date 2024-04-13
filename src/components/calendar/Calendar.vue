<template>
  <div class="calendar">
    <div class="month-indicator">
      <div>
        <button @click="decrementYear"><<</button>
        <button @click="decrementMonth"><</button>
      </div>
      <time datetime="2019-02"> {{ calendarTitle }} </time>
      <div>
        <button @click="incrementMonth">></button>
        <button @click="incrementYear">>></button>
      </div>
    </div>
    <div class="day-of-week">
      <div v-for="day in days">{{ day }}</div>
    </div>
    <div class="date-grid">
      <button :style="firstDayButtonStyle">
        <time datetime="day">{{ daysOfTheMonth[0].getDate() }}</time>
      </button>
      <button v-for="day in daysOfTheMonth.slice(1)">
        <time datetime="day">{{ day.getDate() }}</time>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    initialDate: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      date: this.initialDate,
    };
  },
  computed: {
    daysOfTheMonth() {
      var days = [];
      var tempDate = new Date(this.date.getYear(), this.date.getMonth(), 1);

      while (tempDate.getMonth() === this.firstDayOfMonth.getMonth()) {
        days.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
      }
      return days;
    },
    firstDayOfMonth() {
      return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    },
    calendarTitle() {
      return `${this.date.toLocaleString("default", {
        month: "long",
      })} ${this.date.getFullYear()}`;
    },
    firstDayButtonStyle() {
      return `grid-column: ${this.firstDayOfMonth.getDay()}`;
    },
  },
  methods: {
    incrementMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        1
      );
    },
    decrementMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() - 1,
        1
      );
    },
    incrementYear() {
      this.date = new Date(
        this.date.getFullYear() + 1,
        this.date.getMonth(),
        1
      );
    },
    decrementYear() {
      this.date = new Date(
        this.date.getFullYear() - 1,
        this.date.getMonth(),
        1
      );
    },
  },
};
</script>

<style scoped>
.calendar {
  width: 300px;
}

/* For the month */
.month-indicator {
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

/* CSS grid used for the dates */
.day-of-week,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* Styles for the weekday/weekend header */
.day-of-week {
  margin-top: 1.25em;
}

.day-of-week > * {
  text-align: center;
}

/* Dates */
.date-grid {
  margin-top: 0.5em;
}

/* Style for each day */
.date-grid button {
  /* position: relative; */
  border: 0;
  width: 4.5ch;
  height: 4.5ch;
  border-radius: 50%;
  background-color: transparent;
  color: "1b1e23";
}

.date-grid button:hover,
.date-grid button:focus {
  outline: none;
  background-color: #808080;
  color: white;
}

.date-grid button:active,
.date-grid button.is-selected {
  background-color: var(--teal-100);
  color: var(--teal-900);
}
</style>
