const meals = [
  {
    id: 'dssfka6f',
    title: 'Protein pancakes',
    image:
      'https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: 'pabd76zq',
    title: 'Chickpea Curry',
    image:
      'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
  },
  {
    id: 'w2nxa9wj',
    title: 'No bake Flapjack',
    image:
      'https://images.unsplash.com/photo-1550436566-df63e63a1585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
  },
  {
    id: 'js8heb5s',
    title: 'Mash & Sprouts',
    image:
      'https://images.unsplash.com/photo-1628519842646-971123de6ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=638&q=80',
  },
  {
    id: 'lsopej2g',
    title: 'Ramen',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  },
];

export const idGenerator = () =>
  Math.random()
    .toString(36)
    .substring(2, 10);

const calendarEntries = [
  {
    date: 'Sat Feb 11 2023 07:36:27 GMT+0000',
    meals: ['lsopej2g', 'pabd76zq'],
  },
  {
    date: 'Sun Feb 12 2023 07:36:27 GMT+0000',
    meals: ['w2nxa9wj'],
  },
  {
    date: 'Mon Feb 13 2023 07:36:27 GMT+0000',
    meals: ['w2nxa9wj', 'pabd76zq'],
  },
  {
    date: 'Tue Feb 14 2023 07:36:27 GMT+0000',
    meals: ['js8heb5s'],
  },
];

const database = {
  meals,
  calendarEntries,
};

export default database;
