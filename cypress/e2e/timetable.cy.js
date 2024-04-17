describe("Timetable testing", () => {
	beforeEach(() => {
		cy.visit("/", { failOnStatusCode: false });
		cy.clearCookies({ domain: window.location.domain });
		cy.reload();
		cy.contains("Login").click();
		cy.get(".cl-formFieldInput__identifier")
			.should("be.visible")
			.type(Cypress.env("EMAIL"));
		cy.get(".cl-formButtonPrimary").click();
		cy.get(".cl-formFieldInput__password")
			.should("be.visible")
			.type(Cypress.env("PASSWORD"));
		cy.get(".cl-formButtonPrimary").click();
	});

	it("Clicks on a random class from the timetable", () => {
		cy.visit("/timetable", { failOnStatusCode: false });

		cy.get(".fc-daygrid-event-harness").then((events) => {
			const items = events.toArray();
			const randomItem = items[Math.floor(Math.random() * items.length)];
			cy.wrap(randomItem).click();
		});

		cy.contains("Book This Class").should("be.visible");
	});
});
