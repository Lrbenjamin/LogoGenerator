const { Circle, Square, Triangle } = require('./shapes');

test('Circle render method', () => {
  const circle = new Circle();
  circle.setColor('blue');
  expect(circle.render()).toEqual('<circle cx="50%" cy="50%" r="100" fill="blue" />');
});

test('Square render method', () => {
  const square = new Square();
  square.setColor('green');
  expect(square.render()).toEqual('<rect x="50" y="50" width="200" height="200" fill="green" />');
});

test('Triangle render method', () => {
  const triangle = new Triangle();
  triangle.setColor('red');
  expect(triangle.render()).toEqual('<polygon points="100,20 20,180 180,180" fill="red" />');
});

