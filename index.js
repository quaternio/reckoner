
const NUM_ROWS = 5;
const NUM_COLS = 4;

const panel = document.querySelector(".panel");
const labels = [["C", "!", "^", "+"],
                ["1", "2", "3", "-"],
                ["4", "5", "6", "*"],
                ["7", "8", "9", "/"],
                [".", "0", "=", "="]];

/**
* Create the button panel on the calculator
*/
const populate_panel = () => {
  for (let i=0; i<NUM_ROWS; i++) {
    // Create the row div that we'll put buttons in
    const row = document.createElement("div");
    panel.appendChild(row);
    row.style.display = "flex";
    row.style.gap = "15px";
    row.style.flex = "auto";
    row.style.flexDirection = "row";
    for (let j=0; j<NUM_COLS; j++) {
      // Create a button
      const button = document.createElement("div");
      button.style.flex = "1";
      button.style.textAlign = "center";
      button.style.paddingTop = "20px";
      button.style.borderRadius = "15px";
      button.style.backgroundColor = "#EE935A";
      button.textContent = labels[i][j];
      row.appendChild(button);
    }
  }
}

populate_panel();
