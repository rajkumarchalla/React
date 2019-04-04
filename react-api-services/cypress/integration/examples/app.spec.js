///<reference types="Cypress" />
import React from 'react'
import { Progress } from '../../../src/Progress';

context('GetData', () => {
describe('Button', () => {
  it('should render', function() {
    cy.visit('localhost:8000');
  })
  it('can be orange', () => {
    cy.visit('localhost:8000');
    cy.mount(<Progress />)
  })
 })
})