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
	it("Clicks on the events link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("Events/Camps").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the FAQs link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("FAQs").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the Parties link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("Parties").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the About Us link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("About Us").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the Member Info link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("Member Info").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the Welfare link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("Welfare").click();

		cy.contains("This page could not be found.").should("be.visible");
	});
	it("Clicks on the External Hire link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.get("#footer-section").contains("External Hire").click();

		cy.contains("This page could not be found.").should("be.visible");
	});

	it("Clicks on the timetable link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });

		cy.contains("TIMETABLE").click();

		cy.url().should("include", "/timetable");
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
		cy.contains("Thanks, your message was sent!").should("be.visible");
	});
});
