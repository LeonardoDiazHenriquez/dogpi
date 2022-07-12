const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Dog.create({ height: '10 - 15' });
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its a valid weight', () => {
        Dog.create({ weight: '20 - 25' });
      });
    });
    describe('lifespan', () => {
      it('should throw an error if lifespan is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid lifespan')))
          .catch(() => done());
      });
      it('should work when its a valid lifespan', () => {
        Dog.create({ lifespan: '10 - 100' });
      });
    });
    describe('temperaments', () => {
      it('should throw an error if temperaments is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid temperaments')))
          .catch(() => done());
      });
      it('should work when its a valid temperaments', () => {
        Dog.create({ temperaments: 'Funny, Good' });
      });
    });
    describe('image', () => {
      it('should throw an error if image is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid image')))
          .catch(() => done());
      });
      it('should work when its a valid image', () => {
        Dog.create({ image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg' });
      });
    });
  });
});
