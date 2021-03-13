class AccountLogin_PO {
  visitAccountLogin_Page() {
    cy.visit("/index.php?rt=account/login");
  }

  getFrameNewCustomer() {
    cy.get(".newcustomer").should("contain.text", "I am a new customer.");
  }

  clickContinue_Button() {
    cy.get("[title='Continue']").click();
  }

  getConfirmCreateAccountPage() {
    cy.get(".maintext").should("contain.text", "Create Account");
  }

  getReturningCustomer() {
    cy.get(".returncustomer").should("contain.text", "Returning Customer");
  }

  clickLogin_Button() {
    cy.get("[title='Login']").click();
  }

  clickForgotPassword_Button() {
    cy.xpath("//a[text()='Forgot your password?']").click();
  }

  getForgotPassword() {
    cy.get(".maintext").should("contain.text", "Forgot Your Password?");
  }

  clickForgotLogin_Button() {
    cy.xpath("//a[text()='Forgot your login?']").click();
  }

  getForgotLogin() {
    cy.get(".maintext").should("contain.text", "Forgot Your Login Name?");
  }

  loginForm_SubMission(loginName, password, $selector, expectMessage) {
    cy.get("#loginFrm_loginname").type(loginName);
    cy.get("#loginFrm_password").type(password);
    cy.get("[title='Login']").click();
    cy.get($selector).should("contain.text", expectMessage);
  }
}
export default AccountLogin_PO;
