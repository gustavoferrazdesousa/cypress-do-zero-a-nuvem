Cypress.Commands.add("preencherFormularioEEnviar", () => {
  cy.contains("Nome").type("Gustavo");
  cy.contains("Sobrenome").type("Ferraz de Sousa");
  cy.contains("E-mail").type("gustavoferrazdesousa@teste.com");
  cy.contains("Como podemos te ajudar?").type("Teste de elogio", "{delay,0");
  cy.contains("Telefone").type("45412240");
  cy.get("#phone-checkbox").click("");
  cy.contains("button", "Enviar").click();
  cy.contains("Mensagem enviada com sucesso").should("be.visible");
});

