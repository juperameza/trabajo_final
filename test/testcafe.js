const { Selector } = require("testcafe");
fixture("Test botón").page("http://127.0.0.1:5500/index.html"); //Cambia la url por la de la página que hiciste

test("Upload files and check table", async (t) => {
  await t
    .setFilesToUpload("#fileInput", ["522195810.txt", "5121950322.txt"])
    .click("#uploadFile")
    .expect(Selector("#output").innerText)
    .eql("Data uploaded successfully!");
});
