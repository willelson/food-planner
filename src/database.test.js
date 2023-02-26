import * as db from './database.js';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('constants', () => {
  test('recipes', () => {
    expect(db.RECIPES).toBe('recipes');
  });
});

describe('getAll', () => {
  let itemsInStorage = {};
  beforeEach(() => {
    const { RECIPES } = db;
    itemsInStorage[RECIPES] = [
      {
        id: 'XXXrfiv8cmr',
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
    ];

    // mocked items for the key argument
    const getItemsMock = jest.fn((key) => JSON.stringify(itemsInStorage[key]));
    localStorage.getItem = getItemsMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('All recipes are fetched', () => {
    const key = db.RECIPES;

    const existingItems = db.getAll(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);

    existingItems.forEach((item) => {
      const localStorageContainsItem =
        itemsInStorage[key].findIndex((i) => i.id === item.id) > -1;
      expect(localStorageContainsItem).toBe(true);
    });

    expect(typeof existingItems).toBe('object');
    expect(existingItems.length).toEqual(2);
  });
});

describe('addItem', () => {
  let itemsInStorage;
  beforeEach(() => {
    const { RECIPES } = db;
    itemsInStorage = {
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
    };

    // localStorage returns array of objects stringified
    const getItemsMock = jest.fn((key) => JSON.stringify(itemsInStorage[key]));
    localStorage.getItem = getItemsMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
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

    const existingItems = itemsInStorage[testCollection];
    const itemsExpectedToBeAdded = [...existingItems, newItem];

    db.addItem(testCollection, newItem);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      testCollection,
      JSON.stringify(itemsExpectedToBeAdded)
    );
  });
  test('generates ID for items without one', () => {});
});

describe('getOne', () => {
  let itemsInStorage = {};
  beforeAll(() => {
    const { CALENDAR_ENTRIES } = db;
    const entries = [
      {
        date: '2023-02-22T20:23:15.962Z',
        recipes: ['t2sflix0', 'rfiv8cmr', 'vxjsun0b'],
        id: 'q0pm1mvv'
      },
      {
        date: '2023-02-23T06:09:02.493Z',
        recipes: ['vxjsun0b', 't2sflix0'],
        id: 'e2opalnu'
      }
    ];

    itemsInStorage[CALENDAR_ENTRIES] = entries;

    const getItemsMock = jest.fn((key) => itemsInStorage[key]);
    localStorage.getItem = getItemsMock;
  });
  test('generates ID for items without one', () => {});
});
describe('removeItem', () => {});

describe('updateItem', () => {});

describe('getEntryByDate', () => {});
