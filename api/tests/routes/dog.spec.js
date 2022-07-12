/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Firulais #1',
  height: Math.floor(Math.random() * 499) + 'cm - 500cm',
  weight: Math.floor(Math.random() * 50) + 1 + 'kg - 3000kg',
  lifespan: Math.floor(Math.random() * 49) + 1 + ' años - 50 años',
  image: 'http://localhost:3000/static/media/imgTest.2f53adf2.jpg',
  temperaments: 'Fun,Loving'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
