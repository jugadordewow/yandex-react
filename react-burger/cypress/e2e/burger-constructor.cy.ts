describe('Проверка конструктора', () => {
  before(function (){
    cy.visit('http://localhost:3000')
  })

  it('Добавление ингредиента в конструктор', function () {
    cy.get('[class^=burger-ingridients_card_items_wrapper__]').contains('Флюоресцентная булка').should('not.exist');
    cy.contains('Флюоресцентная булка').trigger('dragstart');
    cy.get('[class^=burger-constructor_constructorBlock__]').trigger('drop');
    cy.get('[class^=burger-constructor_constructorBlock__]').contains('Флюоресцентная булка').should('exist');
    cy.get('[class^=burger-ingridients_card_items_wrapper__]').contains('Соус традиционный галактический').should('exist');
    cy.contains('Соус традиционный галактический').trigger('dragstart');
    cy.get('[class^=burger-constructor_constructorBlock__]').trigger('drop');
    cy.get('[class^=burger-constructor_constructorBlock__]').contains('Соус традиционный галактический').should('exist');
  });

  it('Оформление заказа без авторизации', function () {
    cy.get('button').contains('Заказать').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('Оформление заказа с авторизацией', function () {
    cy.get('[class^=input__container]').first().get('[class^=input__icon]').first().click();
    cy.get('input[name="email"]').type('malich.dest@citilink.ru');
    cy.get('input[name="password"]').type('test21');
    cy.get('button').contains('Войти').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('[class^=burger-ingridients_card_items_wrapper__]').contains('Флюоресцентная булка').should('exist');
    cy.contains('Флюоресцентная булка').trigger('dragstart');
    cy.get('[class^=burger-constructor_constructorBlock__]').trigger('drop');
    cy.get('[class^=burger-constructor_constructorBlock__]').contains('Флюоресцентная булка').should('exist');
    cy.get('[class^=burger-ingridients_card_items_wrapper__]').contains('Соус традиционный галактический').should('exist');
    cy.contains('Соус традиционный галактический').trigger('dragstart');
    cy.get('[class^=burger-constructor_constructorBlock__]').trigger('drop');
    cy.get('[class^=burger-constructor_constructorBlock__]').contains('Соус традиционный галактический').should('exist');
    cy.get('button').contains('Заказать').click().wait(18000);
    cy.get('[class^=modal_modal_wrapepr__]').as('Modal').should('exist');
    cy.get('[class^=order-details-id]').should('exist');
  });

  it('Закрытие модального окна', function () {
    cy.get('[class^=btn-close]').click();
    cy.get('[class^=modal_modal_wrapepr__]').should('not.exist');
  });

})


