/// <reference types="cypress" />

describe("Use for test script only", () => {
  it("Validate all header of control name should be match with array items. ", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    // Expected header name on each object.
    var item = [
      "Dropdown Menu(s)",
      "Checkboxe(s)",
      "Radio Button(s)",
      "Selected & Disabled",
    ];

    // get header from all object - then validate each name should be match with Expected item above.
    var headItem = [];
    cy.get(".container .col-sm-4 div h2 ")
      .each(($el, index, $list) => {
        headItem[index] = $el.text();
      })
      .then(() => {
        for (var i = 0; i < headItem.length; i++) {
          expect(headItem[i]).to.eq(item[i]);
        }
      });
  });

  it("Dropdown Menu(s) - Should have dropdown list 3 items. ", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    cy.get(
      "div:nth-of-type(2) > .thumbnail > .section-title .dropdown-menu-lists"
    ).should("have.length", 3);
  });

  it("Dropdown menu 1 - should have 4 members correctly.", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    var dropdownMenu1Item = ["JAVA", "C#", "Python", "SQL"];
    cy.get("#dropdowm-menu-1").find("option").should("have.length", 4);
    cy.get("#dropdowm-menu-1")
      .find("option")
      .each(($el, item, $list) => {
        const text = $el.text();

        expect(text).to.eq(dropdownMenu1Item[item]);
      });
  });

  it("Dropdown menu 2 - should have 4 members correctly.", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    var dropdownMenu2Item = ["Eclipse", "Maven", "TestNG", "JUnit"];
    cy.get("#dropdowm-menu-2").find("option").should("have.length", 4);
    cy.get("#dropdowm-menu-2")
      .find("option")
      .each(($el, item, $list) => {
        const text = $el.text();

        expect(text).to.eq(dropdownMenu2Item[item]);
      });
  });

  it("Dropdown menu 3 - should have 4 members correctly.", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    var dropdownMenu3Item = ["HTML", "CSS", "JavaScript", "JQuery"];
    cy.get("#dropdowm-menu-3")
      .find("option")
      .should("have.length", 4)
      .then(() => {
        cy.get("#dropdowm-menu-3")
          .find("option")
          .each(($el, item, $list) => {
            const text = $el.text();

            expect(text).to.eq(dropdownMenu3Item[item]);
          });
      });
  });

  it("Validate multiple check with multiple control", () => {
    cy.visit(
      "http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html"
    );

    cy.get("#dropdowm-menu-1").select("Python").should("contain", "Python");

    cy.get("[type='checkbox']").uncheck("option-3");
    cy.get("[type='checkbox']")
      .check(["option-1", "option-2"])
      .should("be.checked");
    cy.get("input[value='option-1']").should("be.checked");
    cy.get("input[value='option-2']").should("be.checked");

    cy.get("#radio-buttons [type='radio']:nth-child(5)")
      .check()
      .should("be.checked");
  });
});
