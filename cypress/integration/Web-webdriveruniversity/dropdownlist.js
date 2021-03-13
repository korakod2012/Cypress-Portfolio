/// <reference types="Cypress" />

describe("Dropdown list", () => {
  it("select specific value via select dropdown lists", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons")
      .invoke("removeAttr", "target")
      .click();

    cy.get("#dropdowm-menu-1").select("c#");
    cy.get("#dropdowm-menu-2").select("testng").should("have.value", "testng");
    cy.get("#dropdowm-menu-3").select("jquery").contains("JQuery");

    cy.get("#dropdowm-menu-2").select("maven").should("have.value", "maven");
    cy.get("#dropdowm-menu-2").select("testng").should("have.value", "testng");
  });
});
