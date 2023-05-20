import {
  firestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
} from "./config.js";

function uploadFile() {
  let fileInput = document.getElementById("fileInput");
  let file = fileInput.files[0];
  let reader = new FileReader();
  console.log("file", file);
  reader.onload = function (e) {
    let contents = e.target.result;

    // Convert text file contents to JSON
    let jsonData = convertToJSON(contents);

    // Send JSON data to Firebase Realtime Database
    writeToFirestore(jsonData, file.name);
  };

  reader.readAsText(file);
}

function convertToJSON(contents) {
  let json = {};

  // Split the contents by "|" character
  let pairs = contents.split("|");

  // Loop through each pair and split key and value
  pairs.forEach(function (pair) {
    let keyValue = pair.split(" ");
    let key = keyValue[0];
    let value = parseInt(keyValue[1]);

    // Add key-value pairs to JSON object
    json[key] = value;
  });

  return json;
}

async function writeToFirestore(data, fileName) {
  try {
    const collectionRef = collection(firestore, "scores");
    await setDoc(doc(collectionRef, fileName), data);
    console.log("Data uploaded successfully!");
    document.getElementById("output").textContent =
      "Data uploaded successfully!";
  } catch (error) {
    console.error("Error uploading data to Firestore:", error);
    document.getElementById("output").textContent =
      "Error uploading data to Firestore: " + error;
  }
}
document.getElementById("uploadFile").addEventListener("click", uploadFile);
