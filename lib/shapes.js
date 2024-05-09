// Base Shape class
class Shape {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }
}

// Circle subclass extending Shape
class Circle extends Shape {
  render() {
    return `<circle cx="50%" cy="50%" r="100" fill="${this.color}" />`; // Render SVG circle element with dynamic color
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" y="50" width="200" height="200" fill="${this.color}" />`; // Render SVG rectangle element with dynamic color
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="100,20 20,180 180,180" fill="${this.color}" />`; // Render SVG polygon element with dynamic color
  }
}

module.exports = { Circle, Square, Triangle }; // Export the subclasses for use in other modules
