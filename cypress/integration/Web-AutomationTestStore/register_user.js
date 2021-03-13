import RegisterUser_PO from "../../support/pageObjects/automation-test-store/RegisterUser_PO";
/// <reference types="Cypress" />

describe("Test register user via web AutomationTestStore", () => {
  const registerUser_PO = new RegisterUser_PO();

  //random string for user and password
  let randomString = Math.random().toString(36).substring(2);
  const email = "auto_" + randomString + randomString + "@gmail.com";
  const password = "Password1";

  before(() => {
    cy.fixture("user-account").then((userAccData) => {
      globalThis.userAccData = userAccData;
    });
    cy.fixture("address").then((userAddressData) => {
      globalThis.userAddressData = userAddressData;
    });
  });

  beforeEach(() => {
    registerUser_PO.visitCreateUser_Page();
  });

  it("Should be able to sign up - Happy case.", () => {
    registerUser_PO.getConfirmCreateAccountPage();

    registerUser_PO.getPersonalDetailForm(
      userAccData.firstName,
      userAccData.lastName,
      email,
      userAccData.telephone,
      userAccData.fax
    );

    registerUser_PO.getPersonalAddress(
      userAddressData.company,
      userAddressData.address1,
      userAddressData.address2,
      userAddressData.city,
      userAddressData.country,
      userAddressData.region_state,
      userAddressData.zip_code
    );

    registerUser_PO.getLoginDetail(randomString, password, password);
    registerUser_PO.getSubscribe("Yes");
    registerUser_PO.getAgreement("Yes");
    registerUser_PO.getSubmissionForm();
    registerUser_PO.getSuccessCreateAccount();
  });

  it("Should not able to signup if email has been already signup", () => {
    registerUser_PO.getPersonalDetailForm(
      userAccData.firstName,
      userAccData.lastName,
      userAccData.email,
      userAccData.telephone,
      userAccData.fax
    );

    registerUser_PO.getPersonalAddress(
      userAddressData.company,
      userAddressData.address1,
      userAddressData.address2,
      userAddressData.city,
      userAddressData.country,
      userAddressData.region_state,
      userAddressData.zip_code
    );

    registerUser_PO.getLoginDetail(randomString, password, password);
    registerUser_PO.getSubscribe("Yes");
    registerUser_PO.getAgreement("Yes");
    registerUser_PO.getSubmissionForm();
    registerUser_PO.getErrorEmailAlreadyRegistered();
  });

  it("Should not able to signup if login has been already signup", () => {
    registerUser_PO.getPersonalDetailForm(
      userAccData.firstName,
      userAccData.lastName,
      "sometext" + email,
      userAccData.telephone,
      userAccData.fax
    );

    // Address
    registerUser_PO.getPersonalAddress(
      userAddressData.company,
      userAddressData.address1,
      userAddressData.address2,
      userAddressData.city,
      userAddressData.country,
      userAddressData.region_state,
      userAddressData.zip_code
    );

    registerUser_PO.getLoginDetail(userAccData.firstName, password, password);
    registerUser_PO.getSubscribe("Yes");
    registerUser_PO.getAgreement("Yes");
    registerUser_PO.getSubmissionForm();
    registerUser_PO.getErrorLoginAlreadySignUp();
  });

  it("Should not able to signup if did not check agreement", () => {
    registerUser_PO.getPersonalDetailForm(
      userAccData.firstName,
      userAccData.lastName,
      email,
      userAccData.telephone,
      userAccData.fax
    );

    registerUser_PO.getPersonalAddress(
      userAddressData.company,
      userAddressData.address1,
      userAddressData.address2,
      userAddressData.city,
      userAddressData.country,
      userAddressData.region_state,
      userAddressData.zip_code
    );

    registerUser_PO.getLoginDetail(randomString, password, password);
    registerUser_PO.getSubscribe("Yes");
    registerUser_PO.getAgreement("No");
    registerUser_PO.getSubmissionForm();
    registerUser_PO.getErrorWhenNotCheckAgreement();
  });
});
