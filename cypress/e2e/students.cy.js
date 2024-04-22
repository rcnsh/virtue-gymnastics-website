describe("Students testing", () => {
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

	it("Clicks on the profile link on the home page", () => {
		cy.wait(2000);
		cy.visit("/", { failOnStatusCode: false });
		cy.contains("JOIN THE FAMILY").click();

		cy.url().should("include", "/students");
		cy.get("h1").should("include.text", "Current Students");
	});

	it("Student Form Flow", () => {
		cy.wait(2000);
		cy.visit("/students/new", { failOnStatusCode: false });

		cy.get("#address1").type("Example House");
		cy.get("#address2").type("999 Example St.");
		cy.get("#city").type("Example City");
		cy.get("#county").type("Example County");
		cy.get("#postcode").type("EX4 7PL");
		cy.get("#homePhone").type("012");
		cy.get("#workPhone").type("345");
		cy.get("#mobile1").type("678");
		cy.get("#mobile2").type("910");
		cy.get("#hearAboutUs").click().realPress("Tab").realPress("Enter");

		cy.contains("Student Details").click();
		cy.get("#studentFirstName").type("Example Student First Name");
		cy.get("#studentLastName").type("Example Student Last Name");
		cy.get("#studentDOB")
			.click()
			.realPress("Tab")
			.realPress("Tab")
			.realPress("Tab")
			.realPress("Enter");
		cy.get("#student-gender")
			.click({ force: true })
			.realPress("ArrowDown")
			.realPress("Enter");
		cy.get("#studentAdditionalInfo").type("Example Student Additional Info");
		cy.get("#studentPhotoConsent").click();
		cy.get("#studentVideoConsent").click();
		cy.get("#studentWalkingHomeConsent").click();
		cy.get("#termsAndConditions").click();
		cy.get("#privacyPolicy").click();

		cy.get("button[type=submit]").click();

		cy.contains("Example Student First Name").first().click();

		cy.contains("Example Student First Name Example Student Last Name").should(
			"be.visible",
		);
		cy.contains("Deregister Student").should("be.visible").click();
		cy.get("button").contains("Confirm Deregister").click({ force: true });

		cy.contains("Example Student First Name Example Student Last Name").should(
			"not.exist",
		);
	});
});
