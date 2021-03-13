import HomePage_PO from "../../support/pageObjects/automation-test-store/HomePage_PO";
/// <reference types="Cypress" />

describe("Test login via web AutomationTestStore", () => {
  const homePage_PO = new HomePage_PO();

  beforeEach(() => {
    homePage_PO.visitHomePage();
  });

  it("Validate url of homepage", () => {
    homePage_PO.getUrlHomePage();
  });

  it("Should display login page correctly.", () => {
    homePage_PO.clickOn_LoginOrRegister();
    homePage_PO.getConfirmLoginPage();
  });
});
