// Copyright (c) 2019 Applitools
// https://github.com/cypress-io/cypress-example-realworld

describe('Conduit Login', () => {
  before(() => cy.registerUserIfNeeded());
  beforeEach(() => {
    cy.visit('/');
    // we are not logged in
  });

  it('does not work with wrong credentials', () => {
    cy.contains('a.nav-link', 'Sign in').click();

    cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('input[type="password"]').type('no-such-user');
    cy.get('button[type="submit"]').click();

    // error message is shown and we remain on the login page
    cy.contains('.error-messages li', 'email or password is invalid');
    cy.url().should('contain', '/login');
  });

  it('logs in', () => {
    cy.contains('a.nav-link', 'Sign in').click();

    const user = Cypress.env('user');
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // when we are logged in, there should be two feeds
    cy.contains('button.nav-link', 'Your Feed').should(
      'not.have.class',
      'active',
    );
    cy.contains('button.nav-link', 'Global Feed').should(
      'have.class',
      'active',
    );
    // url is /
    cy.url().should('not.contain', '/login');
  });
});
