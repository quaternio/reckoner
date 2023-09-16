const NUM_ROWS = 5;
const NUM_COLS = 4;
const SCREEN_SIZE = 11;

const panel = document.querySelector(".panel");
const register = document.querySelector(".register");

const labels = [["C", "!", "^", "+"],
                ["1", "2", "3", "-"],
                ["4", "5", "6", "*"],
                ["7", "8", "9", "/"],
                [".", "0", "="]];

/**
* Create the button panel on the calculator
*/
const populatePanel = () => {
  for (let i=0; i<NUM_ROWS; i++) {
    // Create the row div that we'll put buttons in
    const row = document.createElement("div");
    panel.appendChild(row);
    row.style.display = "flex";
    row.style.gap = "15px";
    row.style.flex = "auto";
    row.style.flexDirection = "row";

    // Put all of the buttons in panel
    for (let j=0; j<NUM_COLS; j++) {
      if (labels[i][j]) {
        // Create a button
        const button = document.createElement("button");
        button.textContent = labels[i][j];
        if (button.textContent === "=") {
          // Weird, but ok!
          button.style.flexGrow = "2.8";
        }
        row.appendChild(button);
      }
    }
  }
}

const initializeListeners = (reckoner) => {
  const buttons = document.querySelectorAll("button");

  // Attach listeners to each button
  buttons.forEach((button) => {
    button.onclick = () => {
      reckoner.registerToken(button.textContent); 
      register.textContent = reckoner.bufferString()
    }
  });
}


const reckoner = new Calculator(SCREEN_SIZE);
populatePanel();
initializeListeners(reckoner);

