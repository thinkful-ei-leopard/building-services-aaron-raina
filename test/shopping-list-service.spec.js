const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe(`Shopping List service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'first test item',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '11.00',
      category: 'Main'
    },
    {
      id: 2,
      name: 'second test item',
      date_added: new Date('2100-04-22T16:28:32.615Z'),
      price: '131.00',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'third test item',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '1.00',
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'fourth test item',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '114.00',
      category: 'Breakfast'
    } 
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
	
  before(() => db('shopping_list').truncate());
  
  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`with shopping_list data present`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });


    it(`getAllItems() resolves all items from 'shopping-list' table`, () => {
    	const expectedItems = testItems.map(item => ({
    	...item,
    	checked: false,
    	})); 
    	return ShoppingListService.getAllItems(db)
    		.then(actual => {
    				expect(actual).to.eql(expectedItems);
    	});
    });

    it(`getById) resolves an item with an id from 'shopping_list' table`, () => {
      const secondId = 2;
      const secondTestItem = testItems[secondId - 1];
      return ShoppingListService.getById(db, secondId)
        .then(actual => {
          expect(actual).to.eql({
            id: secondId,
            name: secondTestItem.name,
            date_added: secondTestItem.date_added,
            price: secondTestItem.price,
            category: secondTestItem.category,
            checked: false,
          });
        });  
    });
  });
});