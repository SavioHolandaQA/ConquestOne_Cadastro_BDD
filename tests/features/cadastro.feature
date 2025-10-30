Feature: Cadastro de novo usuário

  Scenario: Realizar cadastro no site
    Given que estou na página de cadastro
    When eu preencho o formulário de cadastro
    Then o cadastro deve ser realizado corretamente
