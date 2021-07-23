describe('ui login', () => {
    it("should log in", () => {
        cy.visit('/accounts/login')
        cy.get('input[name="username"]').type(Cypress.env('username'))
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get("form").submit()
        cy.contains('Log Out')
        cy.contains('Hi changox!')


    });
});

describe('Warehouse Tracker', () => {
    it('Loads Home Page', () => {

        cy.visit('/')
        cy.contains('Warehouse Tracker');
        cy.contains('Analyze Optimize Organize');
        cy.contains('Manage your warehouse or storeroom at the click of a button')

    });

    it('Links work', () => {
        cy.visit('/')
        cy.contains('About Us').click()
        cy.url().should('include', '/about')
        cy.contains('Tool Info').click()
        cy.url().should('include', '/tool_info')
        cy.contains('My Warehouses').click()
        cy.url().should('include', '/my_warehouses')
        cy.contains('Log In').click()
        cy.url().should('include', '/accounts/login')

    });

    it('About Page', () => {
        cy.visit('/about')

        cy.contains('Skyler Johnson')
        cy.contains('Hunter Britten')
        cy.contains('Zach Hornung')
        cy.contains('Kyle Hoac')

    });
});
