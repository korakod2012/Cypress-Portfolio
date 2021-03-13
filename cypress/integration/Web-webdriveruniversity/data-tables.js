/// <reference types="Cypress" />
describe("Handling data", () => {
  beforeEach(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
  });
  it("Calculate and asser the total age of all users", () => {
    var userDetails = [];
    let numb = 0;
    cy.get("#thumbnail-1 td")
      .each(($el, index, $list) => {
        userDetails[index] = $el.text();
      })
      .then(() => {
        var i;
        for (i = 0; i < userDetails.length; i++) {
          //cy.log(userDetails[i]);
          if (Number(userDetails[i])) {
            numb += Number(userDetails[i]);
          }
        }
        cy.log("Found total age: " + numb);
        expect(numb).to.eq(322);
      });
  });

  it.only("Calculate and asser the age of a given user base on last name", () => {
    cy.get("#thumbnail-1 tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Woods")) {
        cy.get("#thumbnail-1 tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(function (age) {
            const userAge = age.text();
            expect(userAge).to.equal("80");
          });
      }
    });
  });
});
