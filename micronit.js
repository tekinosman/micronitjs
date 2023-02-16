let categoryContainer = {
  name: "",
  units: "",

  buildHTML() {
    return `<div>
              <h2>${this.name}</h2>
              ${this.units}
            </div>`;
  },
  addUnit(outcome, value) {
    this.units += unit.buildHTML(outcome, value);
  },
  addToPage() {
    micronit.innerHTML += this.buildHTML();
  },
  reset() {
    this.name = "";
    this.units = "";
  }
};

let unit = {
  buildHTML(outcome, value) {
    return `<div class=${outcome}>${value}</div>`
  },
  test(tests) {
    document.addEventListener("DOMContentLoaded", () => {
      document.head.innerHTML += `
      <style>
        #micronit {
          color: #111;
        }
        
        h2 {
          margin-bottom: 0;
        }
        
        .unit-passed:before {
          content: "\u2714 ";
          color: #2ECC40;
        }
        
        .unit-failed:before {
          content: "\u2716 ";
          color: #FF4136;
        }
        
        .unit-error,
        .unit-error-stack {
          margin-left: 3ch;
          /* Needed to preserve error stack newlines */
          white-space: pre-line;
        }
      </style>`;
      for (const category in tests) {
        categoryContainer.name = category;
        for (let unit in tests[category]) {
          let unitName = unit;
          let unitFunction = tests[category][unit];
          try {
            unitFunction();/*✔*/
            categoryContainer.addUnit(`unit-passed`, unitName);
          }
          catch (error) {
            categoryContainer.addUnit(`unit-failed`, unitName);
            categoryContainer.addUnit("unit-error", error);
            categoryContainer.addUnit("unit-error-stack", error.stack);
            /*✖*/
          }
        }
        categoryContainer.addToPage();
        categoryContainer.reset();
      }
    });
  },

  assert: (expression, message) => {
    if (!expression) unit.fail(message);
  },

  assertEqual: (expected, actual) => {
    if (expected != actual) unit.fail(`${expected} != ${actual}`)
  },

  assertNotEqual: (expected, actual) => {
    if (expected == actual) unit.fail(`${expected} == ${actual}`)
  },

  assertStrictEqual: (expected, actual) => {
    if (expected !== actual) unit.fail(`${expected} !== ${actual}`)
  },

  assertNotStrictEqual: (expected, actual) => {
    if (expected === actual) unit.fail(`${expected} === ${actual}`)
  },

  assertTrue: object => {
    if (object !== true) unit.fail(`${object} !== true`)
  },

  assertFalse: object => {
    if (object !== false) unit.fail(`${object} !== false`)
  },

  fail: message => {
    throw new Error(message);
  },

};
