// https://on.cypress.io/api

describe('WJH-Rechner', () => {
  it('good-case funktioniert und berechnet richtig', () => {
    cy.visit('/')

    cy.contains('Einverständnisabfrage')
    cy.get('#einverstaendnisabfrage-confirm-button').click()
    cy.contains('Einverständnisabfrage').should('not.exist')

    cy.contains('Familieneinkommen')
    cy.get('#familieneinkommen-field').type('5000')
    cy.get('#personen-field').clear().type('3')
    cy.get('#grunddaten-next-button').click()

    cy.contains('Kosten der Unterkunft')
    cy.get('#miete-field').type('1900')
    cy.get('#groesse-wohnung-field').clear().type('85')
    cy.get('#uebersteigendes-einkommen').contains('1473');
    cy.get('#wohnung-next-button').click()

    cy.contains('Geschwisterkinder')
    cy.get('#kitakosten-geschwister-field').type('900')
    cy.get('#eigenanteil').contains('172');
    cy.get('#kitakosten-next-button').click()
    
    cy.get('#ergebnis-eigenanteil').contains('172');
    cy.get('#kitakosten-field').type('900')
    cy.get('#ergebnis-foerderung').contains('728');
    cy.get('#ergebnis-nicht-gefoerdert').contains('172');
  })
})
