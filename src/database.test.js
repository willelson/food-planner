import * as db from './database.js';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock; // as unknown as Storage;

describe('constants', () => {
  test('recipes', () => {
    expect(db.RECIPES).toBe('recipes');
  });
});

describe('getAll', () => {
  const itemsInStorage = JSON.stringify([
    {
      id: 'rfiv8cmr',
      title: 'test',
      url: 'werwer',
      image: 'wwgnhyz7'
    },
    {
      id: 'vxjsun0b',
      title: 'Mash & sprouts',
      url: null,
      image: '7ogzjid5'
    }
  ]);

  // mocked items for the key argument
  const getItemsMock = jest.fn((key) => itemsInStorage);

  localStorage.getItem = getItemsMock;
  const key = db.RECIPES;

  const existingItems = db.getAll(key);
  expect(localStorage.getItem).toHaveBeenCalled();
  expect(localStorage.getItem).toHaveBeenCalledWith(key);

  const storageItems = JSON.parse(itemsInStorage);

  existingItems.forEach((item) => {
    const localStorageContainsItem =
      storageItems.findIndex((i) => i.id === item.id) > -1;
    expect(localStorageContainsItem).toBe(true);
  });

  expect(typeof existingItems).toBe('object');
  expect(existingItems.length).toEqual(2);
});

describe('addItem', () => {
  let itemsInStorage;
  beforeAll(() => {
    const { RECIPES } = db;
    itemsInStorage = JSON.stringify({
      recipes: [
        {
          id: 'rfiv8cmr',
          title: 'test',
          url: 'werwer',
          image: 'wwgnhyz7'
        },
        {
          id: 'vxjsun0b',
          title: 'Mash & sprouts',
          url: null,
          image: '7ogzjid5'
        }
      ]
    });

    const getItemsMock = jest.fn((key) => itemsInStorage[key]);
    localStorage.getItem = getItemsMock;
  });
  test('all existing items are fetched', () => {
    db.addItem(db.RECIPES, {});
    expect(localStorage.getItem).toHaveBeenCalledWith(db.RECIPES);
  });
  test('calls setItem with existing data and new item', () => {
    const newItem = {
      id: 'etytery3',
      title: 'New Recipe',
      url: null,
      image: '7ogzjid5'
    };

    const testCollection = db.RECIPES;
    const parsedItems = JSON.parse(itemsInStorage);

    const existingItems = parsedItems[testCollection];
    const itemsExpectedToBeAdded = [...existingItems, newItem];

    // localStorage returns array of objects stringified
    localStorage.getItem = jest.fn((key) => JSON.stringify(existingItems));

    db.addItem(testCollection, newItem);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      testCollection,
      JSON.stringify(itemsExpectedToBeAdded)
    );
  });
  test('generates ID for items without one', () => {});
});

describe('getOne', () => {});
describe('removeItem', () => {});
describe('updateItem', () => {});
describe('getEntryByDate', () => {});
