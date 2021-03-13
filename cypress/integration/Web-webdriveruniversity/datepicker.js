/// <reference types="Cypress" />

describe("Date picker", () => {
  it("Select date from date picker", () => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#datepicker").invoke("removeAttr", "target").click();

    cy.get("#datepicker").click();

    // let date = new Date();
    // date.setDate(date.getDate()); //get current day i.e. 13

    // cy.log(date.getDate());

    // let date2 = new Date();
    // date2.setDate(date.getDate() + 5); // i.e. 18
    // cy.log(date.getDate() + 5);

    var date = new Date();
    date.setDate(date.getDate() + 360);
    // cy.log("date +360 : " + date.toLocaleString());

    var futureYear = date.getFullYear();
    var futureMonth = date.toLocaleString("default", { month: "long" });
    var futureDay = date.getDate();

    cy.log("Future year to select: " + futureYear);
    cy.log("Future month to select: " + futureMonth);
    cy.log("Future day to select: " + futureDay);

    function selectMonthAndYear() {
      cy.get(".datepicker-dropdown")
        .find(".datepicker-switch")
        .first()
        .then((currentDate) => {
          if (!currentDate.text().includes(futureYear)) {
            cy.get(".next").first().click();
            selectMonthAndYear();
          }
        })
        .then(() => {
          cy.get(".datepicker-dropdown")
            .find(".datepicker-switch")
            .first()
            .then((currentDate) => {
              if (!currentDate.text().includes(futureMonth)) {
                cy.get(".next").first().click();
                selectMonthAndYear();
              }
            });
        });
    }

    function selectFutureDay() {
      cy.get("[class='day']").contains(futureDay).click();
    }

    selectMonthAndYear();
    selectFutureDay();
  });
});
