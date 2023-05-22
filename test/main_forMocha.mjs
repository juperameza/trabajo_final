import {
  firestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
} from "./config_forMocha.mjs";

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
    return true;
  } catch (error) {
    console.error("Error uploading data to Firestore:", error);
    return false;
  }
}

async function getUploadedFiles(
  collectionRef = collection(firestore, "scores")
) {
  try {
    const querySnapshot = await getDocs(collectionRef);

    const files = [];
    querySnapshot.forEach((doc) => {
      files.push(doc.id);
    });

    return files;
  } catch (error) {
    console.error("Error retrieving uploaded files:", error);
    return [];
  }
}

export { convertToJSON, writeToFirestore, getUploadedFiles };
