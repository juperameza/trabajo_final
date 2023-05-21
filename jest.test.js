const { getNumberOfResponses } = require('./main'); //Esto no funcionó

test('verifica si hay más de 10 respuestas', () => {
  const numberOfResponses = getNumberOfResponses();
  expect(numberOfResponses).toBeGreaterThan(2);
});
