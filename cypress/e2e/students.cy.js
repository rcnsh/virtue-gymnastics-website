describe("Students", () => {
	beforeEach(() => {
		cy.signUp();
	});

	it("links from the home page to the students page", () => {
		cy.visit("/");
		cy.contains("JOIN THE FAMILY").click();

		cy.url().should("include", "/students");
		cy.get("h1").should("include.text", "Current Students");
	});

	it("registers, books and deregisters a student", () => {
		cy.visit("/students/new");

		cy.get("#address1").type("Example House");
		cy.get("#address2").type("999 Example St.");
		cy.get("#city").type("Example City");
		cy.get("#county").type("Example County");
		cy.get("#postcode").type("EX4 7PL");
		cy.get("#homePhone").type("012");
		cy.get("#workPhone").type("345");
		cy.get("#mobile1").type("07700900123");
		cy.get("#mobile2").type("910");
		cy.get("#hearAboutUs").click();
		cy.get("[cmdk-item]").contains("word of mouth").click();

		cy.contains("Student Details").click();
		cy.get("#studentFirstName").type("Example Student First Name");
		cy.get("#studentLastName").type("Example Student Last Name");
		cy.get("#studentDOB").click();
		cy.get("[data-day]").not("[data-outside]").first().find("button").click();
		cy.get("#student-gender").click({ force: true });
		cy.get("[role=option]")
			.contains(/female/i)
			.click();
		cy.get("#studentAdditionalInfo").type("Example Student Additional Info");
		cy.get("#studentPhotoConsent").click();
		cy.get("#studentVideoConsent").click();
		cy.get("#studentWalkingHomeConsent").click();
		cy.get("#termsAndConditions").click();
		cy.get("#privacyPolicy").click();

		cy.get("button[type=submit]").click();
		cy.location("pathname").should("eq", "/students");

		cy.contains("Example Student First Name").first().click();
		cy.contains("Example Student First Name Example Student Last Name").should(
			"be.visible",
		);

		cy.visit("/bookings/new?class=Bows");
		cy.contains("Select a student for this class").click({ force: true });
		cy.get("[role=option]").first().click();
		cy.contains("button", "Submit").click();
		cy.location("pathname").should("eq", "/bookings");
		cy.contains("Selected Class: Bows").should("be.visible");

		cy.visit("/students");
		cy.contains("Example Student First Name").first().click();
		cy.contains("Deregister Student").should("be.visible").click();
		cy.get("button").contains("Confirm Deregister").click({ force: true });

		cy.location("pathname").should("eq", "/students");
		cy.contains("Example Student First Name Example Student Last Name").should(
			"not.exist",
		);
	});
});
