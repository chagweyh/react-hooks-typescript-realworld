// import '@cypress/code-coverage/support';

const apiUrl = Cypress.env('apiUrl');

// a custom Cypress command to login using XHR call
// and then set the received token in the local storage
// can log in with default user or with a given one
Cypress.Commands.add('login', (user = Cypress.env('user')) => {
  cy.request('POST', `${apiUrl}/users/login`, {
    user: Cypress._.pick(user, ['email', 'password']),
  })
    .its('body.user.token')
    .should('exist')
    .then((token) => {
      localStorage.setItem('token', token);
      // with this token set, when we visit the page
      // the web application will have the user logged in
    });

  cy.visit('/');
});

// creates a user with email and password
// defined in cypress.json environment variables
// if the user already exists, ignores the error
// or given user info parameters
Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
  const defaults = {
    username: 'reactuser',
    // email, password
    ...Cypress.env('user'),
  };
  const user = Cypress._.defaults({}, options, defaults);
  cy.request({
    method: 'POST',
    url: `${apiUrl}/users`,
    body: {
      user,
    },
    failOnStatusCode: false,
  });
});
