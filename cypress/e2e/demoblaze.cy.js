/// <reference types='cypress' />
const { faker } = require('@faker-js/faker');
function assertAllert(alertMessage) {
  cy.on('window:alert', (alert) => {
    expect(alert).to.eq(alertMessage);
  });
}
describe('checkout demoblaze', () => {
  const testData = {
    username: 'Qwerty123456789',
    password: '123456789',
    name: faker.person.firstName(),
    country: faker.location.country(),
    city: faker.location.city(),
    month: faker.date.month(),
    year: 2024,
    creditCard: Math.random().toString().slice(2, 18),
  };

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('Assert registration', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(testData.name + testData.city);
    cy.wait(1000);
    cy.get('#sign-password').type(testData.name + 123323);
    cy.contains('.btn', 'Sign up').click();
    cy.wait(1000);
    assertAllert('Sign up successful.');
  });
  it('Assert sign in', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type(testData.username);
    cy.wait(2000);
    cy.get('#loginpassword').type(testData.password);
    cy.contains('.btn', 'Log in').click();
    cy.get('#nameofuser').should('contain', 'Welcome Qwerty123456789');
  });
  it('add samsung to cart', () => {
    cy.contains('.hrefch', 'Samsung galaxy s6').click();
    cy.contains('.btn', 'Add to cart').click();
    assertAllert('Product added');
  });
});
