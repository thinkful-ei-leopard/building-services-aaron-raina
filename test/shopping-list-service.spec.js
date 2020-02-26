const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service object', () => {
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
	
  before('clean db', () => db('shopping_list').truncate());
  afterEach('clean db', () => db('shopping_list').truncate());
  after('destroy db connection', () => db.destroy());
	

	
	context(`Given 'shopping_list' has data`, () => {
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
		
		it('getById) resolves an item with an id from \'shopping_list\' table', () => {
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
		
		it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
			const deleteId = 3
			return ShoppingListService.deleteItem(db, deleteId)
				.then(() => ShoppingListService.getAllItems(db))
				.then(allItems => {
					const expected = testItems
						.filter(item => item.id !== deleteId)
						.map(item => ({
							...item,
							checked:false,
						}))
					expect(allItems).to.eql(expected)
				});
		});

		it(`updateItem() updates an item from the 'shopping-list table`, () => {
			const idOfItemToUpdate = 2;
			const newItemData = {
				name: 'updated name',
				date_added: new Date(),
				price: '10.11',
				checked: true,
				category: 'Main',
			}
			return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
				.then(() => ShoppingListService.getById(db, idOfItemToUpdate))
				.then(item => {
					expect(item).to.eql({
						id: idOfItemToUpdate,
						...newItemData,
					})
				})
		})
	});

	context(`Given 'shopping_list' has no data`, () => {
		it(`getAllItems() resolves an empty array`, () => {
				return ShoppingListService.getAllItems(db)
					.then(actual => {
							expect(actual).to.eql([]);
					});
		});

		it('returns an empty array', () => {
			return ShoppingListService
				.getAllItems(db)
				.then(item => 
					expect(item).to.eql([]));
		});

		it('insertsItem() inserts record in db and returns item with new id', () => {
			const newItem = {
				name: 'insert test',
				price: '7.00',
				date_added: new Date(),
				checked: true,
				category: 'Main',
			};
			return ShoppingListService.insertItem(db, newItem)
				.then(actual => {
					expect(actual).to.eql({
						id: 1,
						name: newItem.name,
						price: newItem.price,
						date_added: newItem.date_added,
						checked: newItem.checked,
						category: newItem.category,
					})
				})
		}) 
	})
	
});
