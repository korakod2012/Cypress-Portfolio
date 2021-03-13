class HomePage_PO {
  visitHomePage() {
    cy.visit(Cypress.env("web_homepage"));
  }

  getUrlHomePage() {
    cy.url().should("include", "automationteststore.com");
  }

  clickOn_LoginOrRegister() {
    cy.xpath("//a[text()='Login or register']").click();
  }

  getConfirmLoginPage() {
    cy.get(".maintext").should("contain.text", "Account Login");
  }
}
export default HomePage_PO;
