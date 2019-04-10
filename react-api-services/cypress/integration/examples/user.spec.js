import React from 'react'
import { UserData } from '../../../src/UsersData';

<reference types="Cypress" />
context('UserData', () => {
  describe('Component', () => {
    it('fetches 3 users from remote API', () => {
      cy.mount(<UserData />)
      // fetching users can take a while
      cy.get('li', { timeout: 20000 }).should('have.length', 3)
    })
  })

  describe('Network State', () => {
    beforeEach(() => {
      cy.server()
      // cy.mount the component after defining routes in tests
      // preventing race conditions where you wait on untouched routes
    })

    it('can inspect real data ', () => {
      cy.route('/users?_limit=3').as('users')
      cy.mount(<UserData />)
      cy.wait('@users')
        .its('response.body')
        .should('have.length', 3)
    })

    it('can display mock response', () => {
      const users = [{ id: 1, name: 'foo' }]
      cy.route('GET', '/users?_limit=3', users).as('users')
      cy.mount(<UserData />)
      cy.get('li')
        .should('have.length', 1)
        .first()
        .contains('foo')
    })

    it('can inspect', () => {
      const users = [{ id: 1, name: 'foo' }]
      cy.route('GET', '/users?_limit=3', users).as('users')
      cy.mount(<UserData />)
      cy.wait('@users')
        .its('response.body')
        .should('deep.equal', users)
    })

    it('can delay and wait ', () => {
      const users = [{ id: 1, name: 'foo' }]
      cy.route({
        method: 'GET',
        url: '/users?_limit=3',
        response: users,
        delay: 1000
      }).as('users')
      cy.mount(<UserData />)
      cy.get('li').should('have.length', 0)
      cy.wait('@users')
      cy.get('li').should('have.length', 1)
    })
  })
})