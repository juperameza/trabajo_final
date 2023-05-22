import assert from "assert";

describe("convertToJSON", function () {
  it("should convert contents to JSON", async function () {
    const { convertToJSON } = await import("./main_forMocha.mjs");

    const contents = "key1 10|key2 20|key3 30";
    const expected = { key1: 10, key2: 20, key3: 30 };

    const result = convertToJSON(contents);

    assert.deepStrictEqual(result, expected);
  });
});

describe("writeToFirestore", function () {
  it("should write data to Firestore", async function () {
    const { writeToFirestore } = await import("./main_forMocha.mjs");

    const data = { key: "value" };
    const fileName = "example.json";

    const result = await writeToFirestore(data, fileName);

    assert.strictEqual(result, true);
  });

  it("should handle error while writing to Firestore", async function () {
    const { writeToFirestore } = await import("./main_forMocha.mjs");

    const data = {}; // Provide appropriate test data
    const fileName = ""; // Provide appropriate test file name
    const result = await writeToFirestore(data, fileName);
    assert.strictEqual(result, false);
  });
});

describe("getUploadedFiles", function () {
  it("should return uploaded files from Firestore", async function () {
    const { getUploadedFiles } = await import("./main_forMocha.mjs");
    const expected = [
      "512195032.txt",
      "512195810.txt",
      "522195810.txt",
      "archivo1.txt",
      "example.json",
    ];
    const result = await getUploadedFiles();
    assert.deepStrictEqual(result, expected);
  });

  it("should handle error while retrieving uploaded files", async function () {
    const { getUploadedFiles } = await import("./main_forMocha.mjs");

    const firestoreRef = null;

    const result = await getUploadedFiles(firestoreRef);

    assert.deepStrictEqual(result, []);
  });
});
