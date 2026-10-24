describe("Auth", () => {
	it("signs up, signs out and signs back in through the forms", () => {
		const email = `ui+${Date.now()}@example.com`;
		const password = "a long enough password";

		cy.visit("/");
		cy.contains("Sign Up").click();
		cy.url().should("include", "/sign-up");
		cy.get("input[autocomplete=given-name]").type("Una");
		cy.get("input[autocomplete=family-name]").type("Iface");
		cy.get("input[type=email]").type(email);
		cy.get("input[type=password]").type(password);
		cy.contains("button", "Create Account").click();

		cy.location("pathname").should("eq", "/");
		cy.contains("button", "Una").click();
		cy.contains("Sign out").click();
		cy.contains("Login").should("be.visible");

		cy.visit("/students");
		cy.location("pathname").should("eq", "/sign-in");
		cy.get("input[type=email]").type(email);
		cy.get("input[type=password]").type("the wrong password");
		cy.contains("button", "Sign In").click();
		cy.contains("Incorrect email or password.").should("be.visible");

		cy.get("input[type=password]").clear().type(password);
		cy.contains("button", "Sign In").click();
		cy.location("pathname").should("eq", "/students");
		cy.contains("Current Students").should("be.visible");
	});

	it("keeps signed-out visitors and non-admins out of protected pages", () => {
		cy.request({ url: "/api/admin/users", failOnStatusCode: false })
			.its("status")
			.should("eq", 401);

		cy.signUp();
		cy.request({ url: "/api/admin/users", failOnStatusCode: false })
			.its("status")
			.should("eq", 403);
		cy.visit("/admin/users");
		cy.location("pathname").should("eq", "/");
	});
});
