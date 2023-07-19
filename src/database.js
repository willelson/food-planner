// localstorage key constants
export const RECIPES = 'recipes';
export const CALENDAR_ENTRIES = 'calendar-entries';
export const SHOPPING_LIST = 'shopping-list';

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

// Database util functions
export const idGenerator = () => Math.random().toString(36).substring(2, 10);

export const sameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const getAll = (key) => {
  let existingItems = localStorage.getItem(key);

  if (!existingItems) {
    existingItems = [];
  } else {
    existingItems = JSON.parse(existingItems);
  }

  const itemsToReturn = JSON.parse(JSON.stringify(existingItems));
  return itemsToReturn;
};

export const getOne = (key, id, identifier = 'id') => {
  const existingItems = getAll(key);
  return existingItems.find((item) => item[identifier] === id);
};

export const addItem = (key, newItem) => {
  const existingItems = getAll(key);
  if (!newItem?.id) {
    newItem.id = idGenerator();
  }

  localStorage.setItem(key, JSON.stringify([...existingItems, newItem]));
};

export const removeItem = (key, itemToRemove, identifier = 'id') => {
  const existingItems = getAll(key);

  const selectionIndex = existingItems.findIndex(
    (item) => item[identifier] === itemToRemove[identifier]
  );

  const updatedItems = [
    ...existingItems.slice(0, selectionIndex),
    ...existingItems.slice(selectionIndex + 1)
  ];

  localStorage.setItem(key, JSON.stringify(updatedItems));
};

export const updateItem = (key, itemToUpdate, identifier = 'id') => {
  const existingItems = getAll(key);

  if (!itemToUpdate?.id) {
    itemToUpdate.id = idGenerator();
  }

  const selectionIndex = existingItems.findIndex(
    (item) => item[identifier] === itemToUpdate[identifier]
  );

  let updatedItems = [];

  if (selectionIndex > -1) {
    updatedItems = [
      ...existingItems.slice(0, selectionIndex),
      itemToUpdate,
      ...existingItems.slice(selectionIndex + 1)
    ];
  } else {
    updatedItems = [...existingItems, itemToUpdate];
  }

  localStorage.setItem(key, JSON.stringify(updatedItems));
};

export const getEntryByDate = (date) => {
  const existingItems = getAll(CALENDAR_ENTRIES);

  const existingEntry = existingItems.find((entry) => {
    const isSameDay = sameDay(new Date(entry.date), new Date(date));
    return isSameDay;
  });

  if (existingEntry) return existingEntry;
  else {
    return {
      date,
      recipes: []
    };
  }
};
