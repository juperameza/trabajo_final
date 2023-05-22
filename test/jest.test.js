// Mock getDocs to return a mock snapshot with a specified number of documents
jest.mock("./config.mjs", () => {
  const originalModule = jest.requireActual("./config.mjs");
  const originalGetDocs = originalModule.getDocs;

  return {
    ...originalModule,
    getDocs: jest.fn((collectionRef) => {
      const mockSnapshot = {
        forEach: jest.fn((callback) => {
          // Simulate having 10 documents
          for (let i = 0; i < 11; i++) {
            callback({ id: `document_${i}` });
          }
        }),
      };
      return Promise.resolve(mockSnapshot);
    }),
  };
});

// Import the function to be tested
const { getUploadedFiles } = require("./main.mjs");

describe("getUploadedFiles", () => {
  it("should return an array with more than 10 files", async () => {
    const files = await getUploadedFiles();
    expect(files.length).toBeGreaterThan(10);
  });
});
