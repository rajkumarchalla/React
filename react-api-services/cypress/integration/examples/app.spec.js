///<reference types="Cypress" />
import React from 'react'
import { Users } from '../../../src/Users';
import { shallow, mount } from 'enzyme';

context('Unit Test of component', () => {
describe('load html page', () => {
 it('should render', function() {
   cy.visit('localhost:3000');
 })
 it('users data', () => {
   cy.visit('localhost:3000');
   cy.contains('Front-End-SDK TDD')
   cy.mount(<Users />)
 })
 Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
 });
 it('login check',() => {
  cy.visit('localhost:3000');
  cy.get('#username').type('bob@burgers.com')
  cy.get('#password').type('password123{enter}')
  cy.contains('Login').should('be.visible') 
  cy.get('button').click() 
});
it.only('Progress check',() => {
  cy.visit('localhost:3000');
  cy.get('div.progress')
  .should('have.class','progress-bar').and('have.attr','aria-valuemin')
});

describe("Background Color test and font family", () => {
  it('Verify the backgroud color, this should work', () => {
     cy.visit('localhost:3000')
     cy.get('#root')
       .should('have.css', 'background-color')
       .and('eq', 'rgb(242, 228, 125)')
  })
  it('check fornt family', () => {
    cy.get('.sc-bwzfXH')                         
    .should('be.visible')                
    .should('have.css', 'font-family')   // yields 'sans-serif'
    .and('match', /Helvetica Neue/) 
 })
})
})
Cypress.on('uncaught:exception', (err, runnable) => {
 return false;
});
})