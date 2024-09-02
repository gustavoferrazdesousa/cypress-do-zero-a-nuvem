/// <reference types="cypress" />

const { describe } = require('mocha')

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title('').should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.contains('Nome').type('Gustavo')
    cy.contains('Sobrenome').type('Ferraz de Sousa')
    cy.contains('E-mail').type('gustavoferrazdesousa@teste.com')
    cy.contains('Como podemos te ajudar?').type('Teste de elogio', '{delay,0')
    cy.contains('button', 'Enviar').click()
    cy.contains('Mensagem enviada com sucesso').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.contains('Nome').type('Gustavo')
    cy.contains('Sobrenome').type('Ferraz de Sousa')
    cy.contains('E-mail').type('gustavoferrazdesousa.teste.com')
    cy.contains('Como podemos te ajudar?').type('Teste de elogio', '{delay,0')
    cy.contains('button', 'Enviar').click()
    cy.contains('Valide os campos obrigatórios!').should('be.visible')

    cy.tick(3000)

    cy.contains('Valide os campos obrigatórios!').should('not.be.visible')
  })

  it('campo telefone não aceita caracteres não numéricos', () => {
    cy.get('#phone').type('ABCDEFG').should('not.have.value')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.contains('Nome').type('Gustavo')
    cy.contains('Sobrenome').type('Ferraz de Sousa')
    cy.contains('E-mail').type('gustavoferrazdesousa@teste.com')
    cy.get('#phone-checkbox').check()
    cy.contains('Como podemos te ajudar?').type('Teste de elogio', '{delay,0')
    cy.contains('button', 'Enviar').click()
    cy.contains('Valide os campos obrigatórios!').should('be.visible')

    cy.tick(3000)

    cy.contains('Valide os campos obrigatórios!').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gustavo')
      .should('have.value', 'Gustavo')
      .clear()
      .should('not.have.value')
    cy.get('#lastName')
      .type('Ferraz de Sousa')
      .should('have.value', 'Ferraz de Sousa')
      .clear()
      .should('not.have.value')
    cy.get('#email')
      .type('gustavoferrazdesousa@teste.com')
      .should('have.value', 'gustavoferrazdesousa@teste.com')
      .clear()
      .should('not.have.value')
    cy.get('#phone')
      .type('45412240')
      .should('have.value', '45412240')
      .clear()
      .should('not.have.value')
    cy.contains('button', 'Enviar').click()
    cy.contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.contains('Valide os campos obrigatórios!').should('be.visible')

    cy.tick(3000)

    cy.contains('Valide os campos obrigatórios!').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.preencherFormularioEEnviar()
    cy.contains('Mensagem enviada com sucesso').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu valor (value)', () => {
    cy.get('#product').select('Blog').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile')

    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it.only('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
})
