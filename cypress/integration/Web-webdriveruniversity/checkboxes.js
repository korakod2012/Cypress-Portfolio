/// <reference types="Cypress" />

describe("Verify checkboxes", () => {
  beforeEach(() => {
    // cy.visit("http://webdriveruniversity.com/");
    // cy.visit("/");
    cy.navigateTo_WebDriverUni_Checkbox_page();
    // cy.get("#dropdown-checkboxes-radiobuttons")
    //   .invoke("removeAttr", "target")
    //   .click();
  });

  it("Check and validate checkbox", () => {
    // cy.get("#checkboxes > :nth-child(1) > input").check();
    // cy.get("#checkboxes > :nth-child(1) > input").check().should("be.checked");

    cy.get("#checkboxes > :nth-child(1) > input").as("option-1");

    cy.get("@option-1").check().should("be.checked");
  });

  it("UnCheck and validate uncheck box", () => {
    cy.get(":nth-child(5) > input").as("option-3");

    cy.get("@option-3").uncheck().should("not.be.checked");
  });

  it("Multiple checkbox", () => {
    cy.get("input[type='checkbox']")
      .check(["option-1", "option-2", "option-3", "option-4"])
      .should("be.checked");
  });
});
