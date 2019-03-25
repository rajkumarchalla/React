describe("Some APP", () => {
    it("as a user I can see a list of people", () => {
      cy.server();
      cy.route({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        response: [{ name: "Valentino Gagliardi" }]
      });
      cy.visit("/");
      cy.contains("Valentino Gagliardi");
    });
  });