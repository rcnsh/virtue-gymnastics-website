describe("Timetable", () => {
	it("opens a class and offers to book it", () => {
		cy.visit("/timetable");

		// Only visible events: the calendar also renders hidden ones, and a
		// forced click on those makes the calendar's pointer handling throw.
		cy.get(".timetable-event:visible").then((events) => {
			const items = events.toArray();
			const randomItem = items[Math.floor(Math.random() * items.length)];
			cy.wrap(randomItem).scrollIntoView().click();
		});

		cy.contains("Book This Class").should("be.visible");
	});
});
