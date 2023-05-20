import firestore from "./config.js";
// Initialize Firebase
function uploadFile() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var reader = new FileReader();
  console.log("file", file);
  reader.onload = function (e) {
    var contents = e.target.result;

    // Convert text file contents to JSON
    var jsonData = convertToJSON(contents);

    // Send JSON data to Firebase Realtime Database
    writeToFirestore(jsonData);
  };

  reader.readAsText(file);
}

function convertToJSON(contents) {
  var json = {};

  // Split the contents by "|" character
  var pairs = contents.split("|");

  // Loop through each pair and split key and value
  pairs.forEach(function (pair) {
    var keyValue = pair.split(" ");
    var key = keyValue[0];
    var value = parseInt(keyValue[1]);

    // Add key-value pairs to JSON object
    json[key] = value;
  });

  return json;
}

async function writeToFirestore(data) {
  try {
    const collectionRef = firestore.collection("scores");
    await collectionRef.add(data);
    console.log("Data uploaded successfully!");
    document.getElementById("output").textContent =
      "Data uploaded successfully!";
  } catch (error) {
    console.error("Error uploading data to Firestore:", error);
    document.getElementById("output").textContent =
      "Error uploading data to Firestore: " + error;
  }
}
document.getElementById("uploadButton").addEventListener("click", uploadFile);
