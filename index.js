const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

class Svg {
  constructor() {
    this.textElement = '';
    this.shapeElement = '';
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

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Congratulations, you have generated ${fileName}!`);
    }
  });
}

async function init() {
  console.log('Starting init');
  const svg = new Svg();

  try {
    const answers = await inquirer.prompt(questions);

    const userText = answers.text.length > 0 && answers.text.length < 4 ? answers.text : '';
    const userFontColor = answers.textColor;
    const userShapeColor = answers.shapeColor;
    const userShapeType = answers.shapeType.toLowerCase();

    let userShape;
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

    userShape.setColor(userShapeColor);
    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);

    const svgContent = svg.render();
    const svgFileName = 'logo.svg';
    writeToFile(svgFileName, svgContent);
  } catch (error) {
    console.error('Error generating logo:', error);
  }
}

init();

