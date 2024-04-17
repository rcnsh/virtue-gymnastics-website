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

	it("Fill out and submit student form", () => {
		cy.visit("/students/new", { failOnStatusCode: false });

		cy.get("#:r3p:-form-item").type("Example House");
		cy.get("#:r3q:-form-item").type("999 Example St.");
		cy.get("#:r3r:-form-item").type("Example City");
		cy.get("#:r3s:-form-item").type("Example County");
		cy.get("#:r3t:-form-item").type("EX4 MPL");
		cy.get("#:r3u:-form-item").type("012");
		cy.get(".:r3v:-form-item").type("345");
		cy.get(".:r30:-form-item").type("678");
		cy.get(".:r31:-form-item").type("910");
		cy.get(".:r32:-form-item").click().realPress("Tab").realPress("Enter");

		cy.contains("Student Details").click();
		cy.get(".:r5h:-form-item").type("Example Student First Name");
		cy.get(".:r5i:-form-item").type("Example Student Last Name");
		cy.get(".:r5j:-form-item")
			.click()
			.realPress("Tab")
			.realPress("Tab")
			.realPress("Tab")
			.realPress("Enter");
		cy.get(".:r5k:-form-item");

		cy.contains("Register New Student").should("be.visible").click();
	});
});
