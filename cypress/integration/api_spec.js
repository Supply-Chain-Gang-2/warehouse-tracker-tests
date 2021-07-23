/// <reference types="cypress" />

// login just once using API
let token

before(function fetchUser() {
    cy.request('POST', '/api/token/', {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
    })
        .its('body')
        .then((res) => {
            token = res
        })
})

// but set the token before visiting the page
// so the app thinks it is already authenticated
beforeEach(function setUser() {
    cy.visit('/', {
        onBeforeLoad(win) {
            // and before the page finishes loading
            // set the user object in local storage
            win.localStorage.setItem('token', JSON.stringify(token))
        },
    })
})


describe('JWT', () => {
    it('makes authenticated list request', () => {
        // we can make authenticated request ourselves
        // since we know the token
        cy.request({
            url: '/api/v1/warehouses',
            auth: {
                bearer: token.access,
            },
        })
            .its('body')
            .should('deep.equal', [
                {
                    "id": 16,
                    "name": "24/7 Hammocks",
                    "description": "Hammocks for the discerning lounger",
                    "measurement_unit": "feet",
                    "length": 10,
                    "width": 10,
                    "height": 10,
                    "lane_width_size": 1,
                    "shelf_length": 1,
                    "shelf_depth": 2,
                    "shelf_height": 2,
                    "owner": 12
                }
            ])
    })

    it('makes authenticated detail request', () => {
        // we can make authenticated request ourselves
        // since we know the token
        cy.request({
            url: '/api/v1/warehouses/16/',
            auth: {
                bearer: token.access,
            },
        })
            .its('body')
            .should('deep.equal', {

                "id": 16,
                "name": "24/7 Hammocks",
                "description": "Hammocks for the discerning lounger",
                "measurement_unit": "feet",
                "length": 10,
                "width": 10,
                "height": 10,
                "lane_width_size": 1,
                "shelf_length": 1,
                "shelf_depth": 2,
                "shelf_height": 2,
                "owner": 12
            }
            )
    })

})
