// const knex = require('knex');
// const ArticlesService = require('../src/articles-service');


// describe('Articles service object', () => {
//   let db;
//   const testArticles = [
//     {
//       id: 1,
//       date_published: new Date('2029-01-22T16:28:32.615Z'),
//       title: 'First test post!',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
//     },
//     {
//       id: 2,
//       date_published: new Date('2100-05-22T16:28:32.615Z'),
//       title: 'Second test post!',
//       content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
//     },
//     {
//       id: 3,
//       date_published: new Date('1919-12-22T16:28:32.615Z'),
//       title: 'Third test post!',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
//     },
//   ];

//   before('setup db', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     });
//   });

//   before('clean db', () => db('blogful_articles').truncate());
//   afterEach('clean db', () => db('blogful_articles').truncate());
//   after('destroy db connection', () => db.destroy());

//   describe('getAllArticles()', () => {
//     it('returns an empty array', () => {
//       return ArticlesService
//         .getAllArticles(db)
//         .then(articles => 
//           expect(articles).to.eql([]));
//     });
//     context('with data present', () => {
//       beforeEach('insert test articles', () =>
//         db('blogful_articles')
//           .insert(testArticles)
//       );

//       it('returns all test articles', () => {
//         return ArticlesService
//           .getAllArticles(db)
//           .then(articles => expect(articles).to.eql(testArticles));
//       });
//     });
//   });

  //   describe('insertArticle()' , () => {
  //     it('inserts record in db and returns article with new id', () => {
  //       // New article to use as subject of our test
  //       const newArticle = {
  //         title: 'Test new title',
  //         content: 'Test new content',
  //         date_published: new Date('2020-01-01T00:00:00.000Z'),
  //       };

  //       return ArticlesService.insertArticle(db, newArticle)
  //         .then(actual => {
  //           expect(actual).to.eql({
  //             id: 1,
  //             title: newArticle.title,
  //             content: newArticle.content,
  //             date_published: newArticle.date_published,
  //           });
  //         });
  //     });

  //     it('throws not-null constraint error if title not provided', () => {
  //       const newArticle = {
  //         content: 'Test new content',
  //         date_published: new Date('2020-01-01T00:00:00.000Z'),
  //       };
  //     return ArticlesService 
  //     .insertArticle(db, newArticle)
  //     .then(
  //         () => expect.fail('db should throw error'),
  //         err => expect(err.message).to.include('not-null')
  //             );
  //         });
  //     });

  //   describe('getById()', () => {
  //     it('should return undefined', () => {
  //       return ArticlesService
  //         .getById(db, 999)
  //         .then(article => expect(article).to.be.undefined);
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () => 
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should return existing article', () => {
  //         const expectedArticleId = 3;
  //         const expectedArticle = testArticles.find(a => a.id === expectedArticleId);
  //         return ArticlesService.getById(db, expectedArticleId)
  //           .then(actual => expect(actual).to.eql(expectedArticle));
  //       });
  //     });
  //   });

  //   describe('deleteArticle()', () => {
  //     it('should return 0 rows affected', () => {
  //       return ArticlesService
  //         .deleteArticle(db, 999)
  //         .then(rowsAffected => expect(rowsAffected).to.eq(0));
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () => 
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should return 1 row affected and record is removed from db', () => {
  //         const deletedArticleId = 1;

  //         return ArticlesService
  //           .deleteArticle(db, deletedArticleId)
  //           .then(rowsAffected => {
  //             expect(rowsAffected).to.eq(1);
  //             return db('blogful_articles').select('*');
  //           })
  //           .then(actual => {
  //             // copy testArticles array with id 1 filtered out
  //             const expected = testArticles.filter(a => a.id !== deletedArticleId);
  //             expect(actual).to.eql(expected);
  //           });
  //       });
  //     });
  //   });

  //   describe('updateArticle()', () => {
  //     it('should return 0 rows affected', () => {
  //       return ArticlesService
  //         .updateArticle(db, 999, { title: 'new title!' })
  //         .then(rowsAffected => expect(rowsAffected).to.eq(0));
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () => 
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should successfully update an article', () => {
  //         const updatedArticleId = 1;
  //         const testArticle = testArticles.find(a => a.id === updatedArticleId);
  //         // make copy of testArticle in db, overwriting with newly updated field value
  //         const updatedArticle = { ...testArticle, title: 'New title!' };

//         return ArticlesService
//           .updateArticle(db, updatedArticleId, updatedArticle)
//           .then(rowsAffected => {
//             expect(rowsAffected).to.eq(1)
//             return db('blogful_articles').select('*').where({ id: updatedArticleId }).first();
//           })
//           .then(article => {
//             expect(article).to.eql(updatedArticle);
//           });
//       });
//     });
//   });
// });