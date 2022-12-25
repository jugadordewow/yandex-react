describe('Проверка модального окна ингредиента', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Открытие модального окна', function () {
    cy.contains('Флюоресцентная булка').click();
    cy.get('[class^=modal_modal_wrapepr__]').as('modal');
    cy.get('@modal').children('[class^=ingridient-details_ingridient_detailes_page_heading__]').contains('Детали ингридиента').should('exist');
    cy.get('@modal').contains('Флюоресцентная булка R2-D3');
    cy.get('@modal').contains('Калории,ккал');
    cy.get('@modal').contains('643');
    cy.get('@modal').contains('44');
    cy.get('@modal').contains('85');
    cy.get('[class^=btn-close]').click();
    cy.get('[class^=modal_modal_wrapepr__]').should('not.exist');
  });

});