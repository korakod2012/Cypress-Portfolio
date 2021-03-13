/// <reference types="Cypress" />

describe("Radio button", () => {
  before(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons")
      .invoke("removeAttr", "target")
      .click();
  });

  it("check specific radio button", () => {
    cy.get("#radio-buttons").find("[type='radio']").first().check();
    cy.get("#radio-buttons").find("[type='radio']").eq(1).check();
  });

  it("validate the states of specific radio button", () => {
    cy.get("[value='lettuce']").should("not.be.checked");
    cy.get("[value='pumpkin']").should("be.checked");

    cy.get("[value='lettuce']").check();
    cy.get("[value='lettuce']").should("be.checked");
    cy.get("[value='pumpkin']").should("not.be.checked");

    cy.get("[value='cabbage']").should("be.disabled");
  });
});
