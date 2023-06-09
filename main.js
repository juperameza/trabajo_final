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
async function getUploadedFiles() {
  try {
    const collectionRef = collection(firestore, "scores");
    const querySnapshot = await getDocs(collectionRef);

    const files = [];
    querySnapshot.forEach((doc) => {
      files.push({ ...doc.data() });
    });
    console.log("Uploaded files:", files.length);
    // Create the chart
    createChart(files);

    return files;
  } catch (error) {
    console.error("Error retrieving uploaded files:", error);
    return [];
  }
}

function createChart(files) {
  const ctx = document.getElementById("chart").getContext("2d");
  const labels = Object.keys(files[0]);
  const sumObject = files.reduce((acc, curr) => {
    for (let key in curr) {
      if (acc.hasOwnProperty(key)) {
        acc[key] += curr[key];
      } else {
        acc[key] = curr[key];
      }
    }
    return acc; // Added the return statement here
  }, {});
  const data = Object.values(sumObject);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "File Data",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...data) + 10,
        },
      },
    },
  });
}

document.getElementById("uploadFile").addEventListener("click", uploadFile);
getUploadedFiles();
export { getUploadedFiles };
