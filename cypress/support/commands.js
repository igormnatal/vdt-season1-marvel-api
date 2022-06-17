
Cypress.Commands.add('setToken', function () {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'igornatal@qacademy.io',
            password: 'qa-cademy'
        },
        failOnStatusCode: false //responsabilidade do teste por conta do tester
    }).then(function (response) {
        expect(response.status).to.eql(200)
        cy.log(response.body.token)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast', function () {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/62ac7a1272424500166d82d9',
        failOnStatusCode: false //responsabilidade do teste por conta do tester
    }).then(function (response) {
        expect(response.status).to.eql(200)
    })
})

//POST requisição que testa o cadastro de personagens
Cypress.Commands.add('postCharacter', function(payLoad){
    cy.api({ //usando o pacote @bahmutov usa-se api ao invés de request
        method: 'POST',
        url: '/characters',
        body: payLoad,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false //responsabilidade do teste por conta do tester
    }).then(function(response){
        return response
    })
})