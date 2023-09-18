/**
* A Calculator Class
*
* @author Thomas Noel
* @date 09/16/2023
*/
class Calculator {
  constructor(screenSize) {
    this.clear();
    this.screenSize = 11;
    this.tokenToFunc = {
      "+": this.add,
      "*": this.multiply,
      "/": this.divide,
      "^": this.exp,
      "-": this.subtract,
      "!": this.factorial
    }
  }

  registerToken(token) {
    if (this.isNumber(token)) {
      if (!(token === "." && this.buffer.includes("."))) {
        this.addToBuffer(token);
      }
    } else if (token == "=") { 
      if (this.op && (this.argA || this.argA === 0)) {
        this.buffer = this.numToBuffer(this.op(this.argA, this.bufferToNum()));
      }
    } else if (token == "C") {
      this.clear();
    } else if (token == "!") {
      if (!this.buffer.includes(".")) {
        this.buffer = this.numToBuffer(this.factorial(this.bufferToNum())); 
      }
    } else if (token == "-" ){
      // 2 Cases here
      if (this.buffer.length == 0) {
        // Specifying negative number
        this.addToBuffer("-");
      } else {
        // Subtraction operation
        this.op = this.subtract;
        this.argA = this.bufferToNum();
        this.clearBuffer();
      }
    } else {
      // In this case, the token is a binary operator
      this.op = this.tokenToFunc[token];
      this.argA = this.bufferToNum();
      this.clearBuffer();
    }
  }

  addToBuffer(token) {
    this.buffer.push(token);
  }

  isNumber(token) {
    return (Number(token) >= 0 && Number(token) <= 9) || token === ".";
  }

  bufferString() {
    let bufferString = null;
    let decimalIdx = this.buffer.indexOf(".");
    let decimalPlaces = 3;
    let buffer = [...this.buffer];

    // If there is a decimal in the buffer
    if (decimalIdx !== -1 && buffer.length > this.screenSize) {
      if (buffer.length - (decimalIdx+1) > decimalPlaces) {
        let eIdx = buffer.indexOf("e");
        if (eIdx !== -1) {
          buffer = [...buffer.slice(0, decimalIdx+1 + decimalPlaces), ...buffer.slice(eIdx)];
        } else {
          buffer = buffer.slice(0, decimalIdx+1 + decimalPlaces);
        }
      }
    }

    if (buffer.length > this.screenSize) {
      bufferString = ".." + buffer.slice(-1*(this.screenSize-2)).join("");
    } else {
      bufferString = buffer.join("");
    }

    return bufferString;
  }

  numToBuffer(number) {
    return String(number).split("");
  }

  bufferToNum() {
    return Number(this.buffer.join("")); 
  }

  clearBuffer() {
    this.buffer = [];
  }

  clear() {
    this.buffer = [];
    this.total = null;
    this.op = null;
    this.argA = null;
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    let quotient = null;
    if (a === 0 && b === 0) {
      quotient = "Undefined"; 
    } else {
      quotient =  a / b;
    }

    return quotient;
  }

  exp(a, b) {
    return a**b;
  }

  factorial(a) {
    let val = a;
    let product = 1;
    while (val > 1) {
      product *= val;
      val--;
    }

    return product;
  }
}

