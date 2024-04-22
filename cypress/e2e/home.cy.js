describe("Home page testing", () => {
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
	it("Clicks on the events link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("Events/Camps").click();

		cy.url().should("include", "/events");
	});
	it("Clicks on the FAQs link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("FAQs").click();

		cy.url().should("include", "/faq");
	});
	it("Clicks on the Parties link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("Parties").click();

		cy.url().should("include", "/parties");
	});
	it("Clicks on the About Us link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("About Us").click();

		cy.url().should("include", "/about-us");
	});
	it("Clicks on the Member Info link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("Member Info").click();

		cy.url().should("include", "/member-info");
	});
	it("Clicks on the Welfare link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("Welfare").click();

		cy.url().should("include", "/welfare");
	});
	it("Clicks on the External Hire link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("External Hire").click();

		cy.url().should("include", "/external-hire");
	});

	it("Clicks on the Instagram link on the home page", () => {
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("FOLLOW").click();

		cy.url().should("include", "instagram.com/virtuemovementco");
	});
});
