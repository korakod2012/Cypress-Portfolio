class RegisterUser_PO {
  visitCreateUser_Page() {
    cy.visit("index.php?rt=account/create");
  }

  getConfirmCreateAccountPage() {
    cy.get(".maintext").should("contain.text", "Create Account");
  }

  getPersonalDetailForm(firstName, lastName, email, telephone, fax) {
    cy.get(".heading1").should("contain.text", "Create Account");
    cy.get("#AccountFrm_firstname").type(firstName);
    cy.get("#AccountFrm_lastname").type(lastName);
    cy.get("#AccountFrm_email").type(email); //generate
    cy.get("#AccountFrm_telephone").type(telephone);
    cy.get("#AccountFrm_fax").type(fax);
  }

  getPersonalAddress(
    company,
    address1,
    address2,
    city,
    country,
    region_state,
    zip_code
  ) {
    cy.get("#AccountFrm_company").type(company);
    cy.get("input[name='address_1']").type(address1);
    cy.get("input[name='address_2']").type(address2);
    cy.get("#AccountFrm_city").type(city);
    cy.get("#AccountFrm_country_id").select(country);
    cy.get("#AccountFrm_zone_id").select(region_state);
    cy.get("#AccountFrm_postcode").type(zip_code);
  }

  getLoginDetail(loginName, password, passwordConfirm) {
    cy.get("#AccountFrm_loginname").type(loginName);
    cy.get("#AccountFrm_password").type(password);
    cy.get("#AccountFrm_confirm").type(passwordConfirm);
  }

  getSubscribe(optionYesOrNo) {
    let indexOfRadioBtn;
    if (optionYesOrNo === "Yes") {
      indexOfRadioBtn = 0;
    } else {
      indexOfRadioBtn = 1;
    }

    cy.get("form#AccountFrm > div:nth-of-type(4) .col-sm-4.input-group")
      .find("[type='radio']")
      .eq(indexOfRadioBtn)
      .check();
  }

  getAgreement(agreementYesOrNo) {
    if (agreementYesOrNo === "Yes") {
      cy.get("#AccountFrm_agree").check();
    } else {
      cy.get("#AccountFrm_agree").uncheck();
    }
  }

  getSubmissionForm() {
    cy.get("button[title='Continue']").click();
  }

  getSuccessCreateAccount() {
    cy.get(".heading1").should(
      "contain.text",
      "Your Account Has Been Created!"
    );
  }

  getErrorEmailAlreadyRegistered() {
    cy.get(".alert").should(
      "contain.text",
      "Error: E-Mail Address is already registered!"
    );
  }

  getErrorLoginAlreadySignUp() {
    cy.get(".alert").should(
      "contain.text",
      "This login name is not available. Try different login name!"
    );
  }

  getErrorWhenNotCheckAgreement() {
    cy.get(".alert").should(
      "contain.text",
      "Error: You must agree to the Privacy Policy!"
    );
  }
}
export default RegisterUser_PO;
