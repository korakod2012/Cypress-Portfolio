import AccountLogin_PO from "../../support/pageObjects/automation-test-store/AccountLogin_PO";
/// <reference types="Cypress" />

describe("Test login via web AutomationTestStore", () => {
  const accountLogin_PO = new AccountLogin_PO();

  before(() => {
    cy.fixture("user-login").then((userLogin) => {
      globalThis.userLogin = userLogin;
    });
  });

  beforeEach(() => {
    accountLogin_PO.visitAccountLogin_Page();
  });

  it("Validate returning customer frame display correctly.", () => {
    accountLogin_PO.getReturningCustomer();
  });

  it("Able to display create account page correctly.", () => {
    accountLogin_PO.getFrameNewCustomer();
    accountLogin_PO.clickContinue_Button();
    accountLogin_PO.getConfirmCreateAccountPage();
  });

  it("Able to login via valid user - Happy case.", () => {
    accountLogin_PO.loginForm_SubMission(
      userLogin.login_name,
      userLogin.password,
      "#customer_menu_top",
      "Welcome back Tester"
    );
  });

  it("Not able login if invalid login name", () => {
    accountLogin_PO.loginForm_SubMission(
      "invaliduser",
      userLogin.password,
      ".alert",
      "Error: Incorrect login or password provided."
    );
  });

  it("Not able login if invalid password", () => {
    accountLogin_PO.loginForm_SubMission(
      userLogin.login_name,
      "invalidPassword",
      ".alert",
      "Error: Incorrect login or password provided."
    );
  });

  it("Able to display page Forgot your password correctly", () => {
    accountLogin_PO.clickForgotPassword_Button();
    accountLogin_PO.getForgotPassword();
  });

  it("Able to display page Forgot your login correctly", () => {
    accountLogin_PO.clickForgotLogin_Button();
    accountLogin_PO.getForgotLogin();
  });
});
