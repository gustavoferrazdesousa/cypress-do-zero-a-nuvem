### README do Projeto: Central de Atendimento ao Cliente TAT

## 📄 Descrição

Este projeto é uma aplicação de testes automatizados usando **Cypress** para garantir a qualidade da Central de Atendimento ao Cliente TAT. Ele abrange diversos cenários, desde a verificação de funcionalidades básicas até a validação de interações complexas no front-end da aplicação.

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado na sua máquina:

- **[Node.js](https://nodejs.org/):** versão LTS recomendada
- **[npm](https://www.npmjs.com/):** vem instalado junto com o Node.js
- **[Git](https://git-scm.com/):** para controle de versão

## 🛠️ Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/central-atendimento-tat.git
   ```

   Navegue até o diretório do projeto:

   ```bash
   cd central-atendimento-tat
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

## 🚀 Rodando os Testes

Após a instalação das dependências, você pode rodar os testes automatizados com Cypress usando os seguintes comandos:

- **Abrir o Cypress em modo interativo**:

  ```bash
  npm run cy:open
  ```

  Isso abrirá a interface do Cypress, onde você pode escolher e rodar os testes manualmente.

- **Rodar os testes em modo headless**:
  ```bash
  npm test
  ```
  Este comando executa todos os testes em segundo plano, sem abrir a interface gráfica.

## ⚙️ Estrutura do Projeto

- **`cypress/integration/`**: Contém os arquivos de teste.
- **`cypress/fixtures/`**: Armazena dados estáticos que podem ser usados nos testes.
- **`cypress/support/`**: Contém comandos customizados e configurações adicionais do Cypress.

## 📋 Testes Implementados

### Casos de Uso

1. **Verificação do Título da Aplicação**:

   - Verifica se o título da página está correto.

2. **Formulário**:

   - Preenchimento de campos obrigatórios e submissão.
   - Validação de e-mail com formatação inválida.
   - Validação de campos numéricos, como telefone.
   - Limpeza e preenchimento dos campos.

3. **Interações**:
   - Seleção de produtos por texto, valor e index.
   - Marcação de checkboxes e radio buttons.
   - Upload de arquivos, incluindo drag-and-drop e utilização de aliases.
   - Verificação da abertura da política de privacidade em uma nova aba.

## 📝 Outras Informações

- **Custom Commands**: Há um comando customizado chamado `cy.preencherFormularioEEnviar()` que facilita o preenchimento e envio do formulário.
- **Política de Privacidade**: Existem testes para garantir que a página de política de privacidade funcione corretamente, tanto abrindo em uma nova aba quanto removendo o atributo `target` para abrir na mesma aba.
