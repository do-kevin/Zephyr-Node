it("Should list public decks", async () => {
  await presenter.list();
  expect(presenter.decks.length).toBe(3);
});
