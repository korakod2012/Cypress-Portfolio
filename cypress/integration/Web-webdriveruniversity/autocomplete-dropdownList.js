/// <reference types="Cypress" />

describe("Auto complete", () => {
  it("select specific product via autocomplete list", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#autocomplete-textfield").invoke("removeAttr", "target").click();

    cy.get("#myInput").type("A");
    cy.get("#myInputautocomplete-list > *")
      .each(($el, index, $list) => {
        const prod = $el.text();
        const productToSelect = "Avacado";

        if (prod === productToSelect) {
          $el.trigger("click");

          cy.get("#submit-button").click();
          cy.url().should("include", productToSelect);
        }
      })
      .then(() => {
        cy.get("#myInput").type("g");
        cy.get("#myInputautocomplete-list > *").each(($el, index, $list) => {
          const prod = $el.text();
          const productToSelect = "Grapes";

          if (prod === productToSelect) {
            $el.trigger("click");

            cy.get("#submit-button").click();
            cy.url().should("include", productToSelect);
          }
        });
      });
  });
});
