fixture("Test botón").page("http://127.0.0.1:5500/index.html"); //Cambia la url por la de la página que hiciste

test("Test", async (t) => {
  await t.click("#uploadFile"); //Diego me dijo que solo probaramos un botón
});
