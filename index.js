// Import necessary modules
const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

// SVG class to generate SVG content
class Svg {
  constructor() {
    this.textElement = ''; // Initialize text element
    this.shapeElement = ''; // Initialize shape element
  }

  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'TEXT: Enter up to (3) Characters:',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'TEXT COLOR: Enter a color keyword (OR a hexadecimal number):',
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):',
  },
  {
    type: 'list',
    name: 'shapeType',
    message: 'Choose which Pixel Image you would like?',
    choices: ['Circle', 'Square', 'Triangle'],
  },
];

// Function to write SVG content to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Congratulations, you have generated ${fileName}!`);
    }
  });
}

// Asynchronous function to initialize the SVG generation process
async function init() {
  console.log('Starting init');
  const svg = new Svg();

  try {
    const answers = await inquirer.prompt(questions); // Prompt user with questions and await their answers

    const userText = answers.text.length > 0 && answers.text.length < 4 ? answers.text : ''; // Extract user inputs from answers
    const userFontColor = answers.textColor;
    const userShapeColor = answers.shapeColor;
    const userShapeType = answers.shapeType.toLowerCase();

    let userShape; // Variable to hold the selected shape object
    switch (userShapeType) {
      case 'circle':
        userShape = new Circle();
        break;
      case 'square':
        userShape = new Square();
        break;
      case 'triangle':
        userShape = new Triangle();
        break;
      default:
        console.log('Invalid shape selection.');
        return;
    }

    userShape.setColor(userShapeColor); // Set the color of the selected shape
    svg.setTextElement(userText, userFontColor); // Set the text element in the SVG
    svg.setShapeElement(userShape); // Set the shape element in the SVG

    const svgContent = svg.render();
    const svgFileName = 'logo.svg';
    writeToFile(svgFileName, svgContent);
  } catch (error) {
    console.error('Error generating logo:', error); // Log error if SVG generation fails
  }
}

init();// Call the initialization function to start the process

