/// <reference types="Cypress" />

describe("Test file upload via webdriveruni", () => {
  it("Upload a file....", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#file-upload").invoke("removeAttr", "target").click();

    cy.fixture("laptop.png", "base64").then((fileContent) => {
      cy.get("#myFile").attachFile(
        {
          fileContent,
          fileName: "laptop.png",
          mimeType: "image/png",
        },
        {
          uploadType: "input",
        }
      );
    });
    cy.get("#submit-button").click();
  });

  it("Upload No file....", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#file-upload").invoke("removeAttr", "target").click();

    cy.get("#submit-button").click();
  });
});
