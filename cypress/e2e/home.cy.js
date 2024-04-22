describe("Home page testing", () => {
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
	it("Clicks on the timetable link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });

		cy.contains("TIMETABLE").click();

		cy.url().should("include", "/timetable");
	});
	it("Clicks on the profile link on the home page", () => {
		cy.wait(2000);
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("JOIN THE FAMILY").click();

		cy.url().should("include", "/students");
		cy.get("h1").should("include.text", "Current Students");
	});
	it("Swipes on the testimonials section", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get(".embla").scrollIntoView();
		cy.get(".embla").realSwipe("toLeft").realSwipe("toLeft");
	});
	it("creates an email", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#email-name").type("test email");
		cy.get("#email-email").type("testuser@virtue.com");
		cy.get("#email-message").type("test message");
		cy.get("#email-submit").click();
	});
});
