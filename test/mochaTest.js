const assert = require('assert');

// Función asíncrona la cual no funcionó
async function uploadFileAsync() {
  // Simulación de carga del archivo de texto
  const fileContents = await simulateFileUpload();

  // Procesamiento de los datos del archivo
  const processedData = processFileContents(fileContents);

  // Simulación de subida a una base de datos
  const result = await simulateDatabaseUpload(processedData);

  return result;
}

  
// Función síncrona
function uploadFileSync() {
  // Simulación de carga del archivo de texto
  const fileContents = simulateFileUploadSync();

  // Procesamiento de los datos del archivo
  const processedData = processFileContents(fileContents);

  // Simulación de subida a una base de datos
  const result = simulateDatabaseUploadSync(processedData);

  return result;
}

// Funciones simuladas para carga de archivo de texto
async function simulateFileUpload() {
  return new Promise((resolve) => {
    // Simulación de carga de archivo después de 1 segundo
    setTimeout(() => {
      resolve('Contenido del archivo de texto');
    }, 6000);
  });
}

function simulateFileUploadSync() {
  return 'Contenido del archivo de texto';
}

// Función simulada para procesamiento de los datos del archivo
function processFileContents(fileContents) {
  // Simulación de procesamiento de datos
  return fileContents.toUpperCase();
}

// Funciones simuladas para subida a la base de datos
function simulateDatabaseUpload(data) {
  return new Promise((resolve) => {
    // Simulación de subida a la base de datos después de 1 segundo
    setTimeout(() => {
      resolve(`Datos subidos a la base de datos: ${data}`);
    }, 6000);
  });
}

function simulateDatabaseUploadSync(data) {
  return `Datos subidos a la base de datos: ${data}`;
}

// Pruebas

describe('uploadFileAsync', function () {
  it('debería subir el archivo de forma asíncrona', async function () {
    const result = await uploadFileAsync();
    assert.strictEqual(result, 'Datos subidos a la base de datos: CONTENIDO DEL ARCHIVO DE TEXTO');
  });
});

describe('uploadFileSync', function () {
  it('debería subir el archivo de forma síncrona', function () {
    const result = uploadFileSync();
    assert.strictEqual(result, 'Datos subidos a la base de datos: CONTENIDO DEL ARCHIVO DE TEXTO');
  });
});
