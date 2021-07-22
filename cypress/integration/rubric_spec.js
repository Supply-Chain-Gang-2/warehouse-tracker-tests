describe('Rubric Form', () => {
    it('Navigates to Form Page', () => {

        cy.visit('http://localhost:3000')
        cy.contains('Grade a Student').click()
        cy.url().should('include', '/form')

    });

    it('Has proper fields', () => {

        cy.visit('http://localhost:3000/form')

        for (let field of text_fields) {
            cy.get(`[name="${field}"][type="text"]`)
        }

        for (let field of select_fields) {
            cy.get(`select[name="${field}"]`)
        }

        for (let field of score_fields) {
            cy.get(`[name="${field}"][type="number"]`)
        }

        for (let field of date_time_fields) {
            cy.get(`[name="${field}"][type="datetime-local"]`)
        }


    })

    it('Validates', () => {

        cy.visit('http://localhost:3000/form')

        cy.get('select[name="student"]').select('2')
        cy.get('select[name="proctor"]').select('1')
        cy.get('input[name="clarify_question"]').clear().type(7)
        cy.get('input:invalid').should('have.length', 1)
        cy.get('#clarify_question').then(($input) => {
            expect($input[0].validationMessage).to.eq('Value must be less than or equal to 2.')
        })
        cy.get('input[name="clarify_question"]').clear().type(2)
        cy.get('input:invalid').should('not.exist')

    })
})

describe('API Test', () => {
    it('Get Students', async () => {

        const url = apiUrl + '/rubrics/students/'
        const response = await cy.request(url)

        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('length').and.be.greaterThan(0)
        const student = response.body[0]
        expect(student.id);
        expect(student.username);
    })

    it('Get Proctors', async () => {

        const url = apiUrl + '/rubrics/proctors/'
        const response = await cy.request(url)

        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('length').and.be.greaterThan(0)
        const proctor = response.body[0]
        expect(proctor.id);
        expect(proctor.username);


    })

    it('Get Rubrics', async () => {

        const url = apiUrl + '/rubrics/'

        const response = await cy.request(url)

        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('length').and.be.greaterThan(0)

        const rubric = response.body[0]

        expect(rubric.id)
        expect(rubric.created_at)

        for (let field of fields) {
            expect(rubric[field])
        }
    })
})

const apiUrl = 'https://rubric-api-project.herokuapp.com/api/v1'

const select_fields = [
    "student",
    "proctor",
]

const date_time_fields = [
    "time_start",
    "time_end",
]
const text_fields = [
    "challenge",
    "interpret_question_notes",
    "solve_problem_notes",
    "analyze_solution_notes",
    "communicate_effectively_notes",
    "comments"
]

const score_fields = [
    "clarify_question",
    "inputs_outputs",
    "illustrate_problem",
    "optimal_structure",
    "working_algorithm",
    "syntactically_correct",
    "idiomatically_correct",
    "best_solution",
    "walkthrough_solution",
    "big_o",
    "testing",
    "thought_process",
    "terminology",
    "use_time",
    "overconfident",
    "underconfident",
    "whiteboard"]

const fields = [...text_fields, ...score_fields, ...select_fields, ...date_time_fields]

