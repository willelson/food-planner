<template>
  <div class="calendar">
    <div class="calendar-title">{{ currentMonth }}</div>
    <div class="calendar-body">
      <div
        class="day-container"
        v-for="(day, index) in calendarWeek"
        :key="`day-${index}`"
        :id="`day-${index}`"
        :class="dayContainerClass(day)"
      >
        <div class="day-title">
          {{ day.date.toLocaleString('default', { weekday: 'short' }) }}
          <span style="font-weight: bold">{{ day.date.getDate() }}</span>
        </div>
        <div class="calendar-entry" v-for="(meal, index) in day.meals" :key="`meal-${index}`" :style="{ backgroundImage: 'url(' + meal.image + ')' }">
          <div class="entry-title">{{meal.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendarWeek: [
        {
          date: new Date('2023-01-30T17:00:34.908Z'),
        },
        { date: new Date('2023-01-31T17:00:34.908Z') },
        {
          date: new Date('2023-02-01T17:00:34.908Z'),
          meals: [
            {
              title: 'Protein pancakes',
              image:
                'https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            },
            {
              title: 'Mash & Sprouts',
              image:
                'https://images.unsplash.com/photo-1628519842646-971123de6ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=638&q=80'
            },
            {
              title: 'No bake Flapjack',
              image:
                'https://images.unsplash.com/photo-1550436566-df63e63a1585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
            }
          ]
        },
        {
          date: new Date('2023-02-02T17:00:34.908Z'),
          meals: [
            {
              title: 'Chickpea Curry',
              image:
                'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            }
          ]
        },
        {
          date: new Date('2023-02-03T17:00:34.908Z'),
          meals: [
            {
              title: 'Protein pancakes',
              image:
                'https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            },
            {
              title: 'Ramen',
              image:
                'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
            }
          ]
        },
        { date: new Date('2023-02-04T17:00:34.908Z'), meals: [] },
        { date: new Date('2023-02-05T17:00:34.908Z') }
      ]
    };
  },
  methods: {
    dayContainerClass(day) {
      const today = new Date();
      if (day.date.getDay() === today.getDay()) {
        return 'highlight-today';
      }

      return '';
    }
  },
  computed: {
    weekDates() {
      const today = new Date();
      const current = today;
      const week = new Array();

      // Starting Monday not Sunday
      current.setDate(current.getDate() - current.getDay() + 1);
      for (var i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return week;
    },
    currentMonth() {
      const today = new Date();
      return today.toLocaleString('default', { month: 'long' });
    }
  },
  mounted() {
    let now = new Date();
    const todayElement = document.getElementById(`day-${now.getDate() + 1}`);
    todayElement.scrollIntoView({ inline: 'start' });
  }
};
</script>

<style>
.calendar-title {
  padding: 8px 0 0 8px;
  font-size: 24px;
  color: var(--black);
}

.calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-body {
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.calendar-body .day-container {
  min-width: 33.3%;
  border-right: 1px var(--border) solid;
  scroll-snap-align: start;
  padding: 8px;
}

.calendar-body .day-container:last-child {
  border: none;
}

.highlight-today {
  background: linear-gradient(white, var(--tertiary));
}

.day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-title {
  width: 100%;
  text-align: left;
  padding-bottom: 8px;
  display: flex;
    justify-content: space-between;
}

.calendar-entry {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid white;
  border-radius: 8px;
  margin-bottom: 8px;
  width: 100%;
  background-size: cover;
}
.calendar-entry:after {
  content: '';
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0)
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.6) 100%)
    repeat 0 0;
  z-index: 1;
  border-radius: 8px;
}
.entry-title {
  display: block;
  position: absolute;
  width: 100%;
  color: white;
  font-weight: bold;
  text-align: right;
  left: 0;
  bottom: 0;
  padding: 6px;
  z-index: 2;
}
</style>
