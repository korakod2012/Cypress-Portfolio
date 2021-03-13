/// <reference types="cypress" />

describe("Using Json server from https://jsonplaceholder.typicode.com/.", () => {
  beforeEach(() =>
    cy.request("https://jsonplaceholder.typicode.com/posts/").as("posts")
  );

  context("Check response code", () => {
    it("Validate response should be 200", () => {
      cy.get("@posts").its("status").should("be.equal", 200); //style 1
      cy.get("@posts").its("status").should("eq", 200); //style 2
    });

    it("Validate response should be 200 - incoude define specific header", () => {
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Validate response should be 200 - using cy.api plugin instead cy.request", () => {
      //** below change from cy.request to cy.api, when test runner you will json data displayed. */
      cy.api({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("Validate key and value inside Json object", () => {
    it("Validate title of last record", () => {
      let titleArr = [];
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/",
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => {
          let body = JSON.parse(JSON.stringify(response.body));

          body.forEach((item) => {
            titleArr.push(item["title"]);
          });
        })
        .then(() => {
          let latestPost = titleArr[titleArr.length - 1];
          expect(latestPost).to.eq("at nam consequatur ea labore ea harum");
        });
    });

    it("Validate id 2 of /posts api contains value of body correctly", () => {
      const id = 2;
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/" + id,
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate title of id:2 should be "qui est esse"
        expect(body).has.property(
          "body",
          "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        );
      });
    });

    it("Validate id 2 of /posts api contains value of title correctly", () => {
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/2",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate title of id:2 should be "qui est esse"
        expect(body).has.property("title", "qui est esse");
      });
    });

    it("Validate /posts api contains the correct keys", () => {
      cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        body.forEach(function (item) {
          // validate all object contain all key
          expect(item).to.have.all.keys("userId", "id", "title", "body");

          // below use to log result of each JSon object but it not nesseary to do like this.
          // cy.log("userId: " + item["userId"] + " & id: " + item["id"]);
          // cy.log("title: " + item["title"]);
          // cy.log("body: " + item["body"]);
        });
      });
    });

    it("Should return lenght of posts to be 100 post", () => {
      cy.get("@posts").its("body").should("have.length", 100);
    });
  });

  context("Validate api header", () => {
    it("Content type should be : application/json", () => {
      cy.request("https://jsonplaceholder.typicode.com/posts")
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });
  });
});
