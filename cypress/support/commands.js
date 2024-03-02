Cypress.Commands.add(`signOut`, () => {
	cy.log(`sign out by clearing all cookies.`);
	cy.clearCookies({ domain: null });
});

Cypress.Commands.add(`signIn`, () => {
	cy.log(`Signing in.`);
	cy.visit(`/`, { failOnStatusCode: false });

	cy.window()
		.should((window) => {
			expect(window).to.not.have.property(`Clerk`, undefined);
			expect(window.Clerk.isReady()).to.eq(true);
		})
		.then(async (window) => {
			await cy.clearCookies({ domain: window.location.domain });
			const res = await window.Clerk.client.signIn.create({
				identifier: Cypress.env("EMAIL"),
				password: Cypress.env("PASSWORD"),
			});

			await window.Clerk.setActive({
				session: res.createdSessionId,
			});

			cy.log(`Finished Signing in.`);
		});
});
