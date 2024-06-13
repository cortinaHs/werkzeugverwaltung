describe("metadata", () => {
	it("has the correct title", () => {
		expect(metadata.title).toBe("Neighbortool");
	});

	it("has the correct description", () => {
		expect(metadata.description).toBe(
			"Wirtschaftsinformatik-Projekt Werkzeugverwaltung"
		);
	});

	it("has the correct icons", () => {
		expect(metadata.icons).toEqual({
			icon: "toolIcon.svg",
		});
	});
});
