/// <reference types="Cypress" />

describe("Test mouse action", () => {
  it("Scroll element into view", () => {
    cy.visit("http://webdriveruniversity.com/");
    // cy.get("#actions").invoke("removeAttr", "target").click();
    cy.get("#actions").scrollIntoView().invoke("removeAttr", "target").click();
  });

  it.only("Should be aple drag and drop item", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#actions").scrollIntoView().invoke("removeAttr", "target").click();

    cy.get("#draggable").trigger("mousedown", { which: 1 });

    cy.get("#droppable")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });
});
