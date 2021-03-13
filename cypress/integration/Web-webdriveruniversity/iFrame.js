/// <reference types="Cypress" />

describe("Handling IFrame & Modals", () => {
  it("Handle webdriveruni iframe and modal", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#iframe").invoke("removeAttr", "target").click();
    cy.get("#frame").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).as("iframe");
    });

    cy.get("@iframe").find("#button-find-out-more").click();

    cy.get("@iframe").find("#myModal").as("modal");

    cy.get("@modal").should(($expectedText) => {
      const text = $expectedText.text();
      expect(text).to.include("Welcome to webdriveruniversity.");
    });

    cy.get("@modal").contains("Close").click();
  });
});
