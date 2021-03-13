/// <reference types="Cypress" />

describe("Shopping product via Automation Test store", () => {
  //** Shopping process i still not create page object  */

  before(() => {
    cy.fixture("user-login").then((userLogin) => {
      globalThis.userLogin = userLogin;
    });

    cy.fixture("product").then((product) => {
      globalThis.product = product;
    });
  });

  beforeEach(() => {
    cy.visit("https://automationteststore.com/");
    cy.xpath("//a[text()='Login or register']").click();
    cy.get("#loginFrm_loginname").type(userLogin.login_name);
    cy.get("#loginFrm_password").type(userLogin.password);
    cy.get("[title='Login']").click();

    //Clear item from Cart
    cy.get("#customer_menu_top").should("contain.text", "Welcome back Tester");

    cy.get(".dropdown-toggle > .label").then(($itemValue) => {
      const numberOfItem = $itemValue.text();
      cy.log("Item on Cart: " + numberOfItem);
      if (numberOfItem > 0) {
        cy.get(".block_7 > .nav > .dropdown > .dropdown-toggle").click();

        // delete by click on trash icon one by one.
        cy.get(".product-list td:nth-child(7)").each(($el, index, $list) => {
          cy.get(".fa-trash-o").eq(0).click();
        });

        cy.get(".contentpanel").should(
          "contain.text",
          "Your shopping cart is empty!"
        );
      }
    });
  });

  it("Able to select an item to cart - Happy case.", () => {
    cy.get("#customer_menu_top").should("contain.text", "Welcome back Tester");
    cy.get("a[href*='product/category&path']").contains("Hair Care").click();
    cy.get(".maintext").should("contain.text", "Hair Care");
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      if ($el.text() === "Eau Parfumee au The Vert Shampoo") {
        cy.get(".productcart").eq(index).click();
      }
    });

    //Go to Cart.
    cy.get(".dropdown-toggle > .fa").click();

    cy.get(".product-list td:nth-child(2)").should(
      "contain.text",
      "Eau Parfumee au The Vert Shampoo"
    );
  });

  it("Able to add multiple items to cart - Happy case.", () => {
    cy.get("#customer_menu_top").should("contain.text", "Welcome back Tester");
    cy.get("a[href*='product/category&path']").contains("Hair Care").click();
    cy.get(".maintext").should("contain.text", "Hair Care");

    product.productName.forEach((pName) => {
      cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
        if ($el.text() === pName) {
          cy.log($el.text());
          cy.get(".productcart").eq(index).click();
        }
      });
    });

    // Go to Cart.
    cy.get(".dropdown-toggle > .fa").click();
    cy.get(".product-list td:nth-child(2)").each(($el, index, $list) => {
      cy.log($el.text());

      expect($el.text().trim()).to.eq(product.productName[index]);
    });
  });
});
