import "cypress-real-events";

const PASSWORD = "cypress test password";

/* Creates a fresh account through the API and leaves the browser signed in
as it. Returns the account's email. */
Cypress.Commands.add("signUp", (email = `parent+${Date.now()}@example.com`) => {
	cy.request("POST", "/api/auth/sign-up", {
		first_name: "Test",
		last_name: "Parent",
		email,
		password: PASSWORD,
	});
	return cy.wrap(email);
});
