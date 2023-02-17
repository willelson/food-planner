export const recipes = [
  {
    id: 'dssfka6f',
    title: 'Protein pancakes',
    image: 'ujn7jzns'
  },
  {
    id: 'pabd76zq',
    title: 'Chickpea Curry',
    image: 'zjju44d1'
  },
  {
    id: 'w2nxa9wj',
    title: 'No bake Flapjack',
    image: 'fyrew3y2'
  },
  {
    id: 'js8heb5s',
    title: 'Mash & Sprouts',
    image: '7ogzjid5'
  },
  {
    id: 'lsopej2g',
    title: 'Ramen',
    image: 'wwgnhyz7'
  }
];

export const idGenerator = () => Math.random().toString(36).substring(2, 10);

export const calendarEntries = [
  {
    date: 'Sat Feb 11 2023 07:36:27 GMT+0000',
    recipes: ['lsopej2g', 'pabd76zq']
  },
  {
    date: 'Sun Feb 12 2023 07:36:27 GMT+0000',
    recipes: ['w2nxa9wj']
  },
  {
    date: 'Mon Feb 13 2023 07:36:27 GMT+0000',
    recipes: ['w2nxa9wj', 'pabd76zq']
  },
  {
    date: 'Tue Feb 14 2023 07:36:27 GMT+0000',
    recipes: ['js8heb5s']
  }
];

export const images = [
  {
    id: 'ujn7jzns',
    url: 'https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=220&q=40'
  },
  {
    id: 'zjju44d1',
    url: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=370&q=40'
  },
  {
    id: 'fyrew3y2',
    url: 'https://images.unsplash.com/photo-1550436566-df63e63a1585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=168&q=40'
  },
  {
    id: '7ogzjid5',
    url: 'https://images.unsplash.com/photo-1628519842646-971123de6ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=160&q=40'
  },
  {
    id: 'wwgnhyz7',
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=145&q=40'
  },
  {
    id: 'i5f8kpfy',
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=40'
  },
  {
    id: '899sxcc8',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=240&q=40'
  },
  {
    id: 'l749wo84',
    url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=225&q=40'
  },
  {
    id: 'censvz1g',
    url: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=349&q=40'
  },
  {
    id: '11h7c8wp',
    url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=346&q=40'
  },
  {
    id: '76f60tv8',
    url: 'https://images.unsplash.com/photo-1529589510304-b7e994a92f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=194&q=40'
  },
  {
    id: 'k20axwca',
    url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=292&q=40'
  },
  {
    id: 'b55rae7m',
    url: 'https://images.unsplash.com/photo-1533321942807-08e4008b2025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=230&q=40'
  }
];

export const getImage = (id) => {
  const image = images.find((img) => img.id === id);

  if (!image) return '';
  return image.url;
};

export const getRecipes = () => {
  let existingRecipes = localStorage.getItem('recipes');

  if (!existingRecipes) {
    existingRecipes = [];
  } else {
    existingRecipes = JSON.parse(existingRecipes);
  }

  return existingRecipes;
};