describe('POST /characters', function () {
    it('deve cadastrar um personagem', function () {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function(){
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ["vingadores costa oesta","irmandade de mutantes"],
            active: true
        }

        before(function(){
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
            })
        })
        it('não deve cadastrar duplicado', function(){
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
            })

        })
    })

    it.only('deve validar campos obrigatórios - Name', function () {
        const character = {
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.eql('"name" is required')
            })
    })

    it.only('deve validar campos obrigatórios - Alias', function () {
        const character = {
            name: 'Wanda Maximoff',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.eql('"alias" is required')
            })
    })

    it.only('deve validar campos obrigatórios - Team', function () {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.eql('"team" is required')
            })
    })
    it.only('deve validar campos obrigatórios - Active', function () {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                cy.log(response.body.validation.body.message)
                expect(response.body.validation.body.message).to.eql('"active" is required')
            })
    })
})