// localstorage key constants
export const RECIPES = 'recipes';
export const CALENDAR_ENTRIES = 'calendar-entries';
export const SHOPPING_LIST = 'shopping-list';

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
    ...existingItems.slice(selectionIndex + 1),
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
      ...existingItems.slice(selectionIndex + 1),
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
      recipes: [],
    };
  }
};
