'use strict';

/**
 * ==============================================================================
 * JavaScript Course Portfolio Project
 * Current Progress: Week 2 — Module 3 (Control Flow)
 * (Next Topic: Module 4 — Functions: The Building Blocks)
 * ==============================================================================
 */

console.log("script.js loaded successfully across portfolio pages.");

/* ==============================================================================
   Module 1 & 2: DOM Selection & Mobile Navigation Toggle
   ============================================================================== */

// Selecting the nav toggle button and nav links container using const (Module 2)
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Short-circuit check using logical AND (&&) to ensure the button exists before attaching event listener
navToggle && navToggle.addEventListener('click', function() {
  // We toggle a CSS class instead of setting element.style directly,
  // preserving separation of concerns so CSS remains in control of presentation.
  navLinks.classList.toggle('nav-open');

  // Update aria-expanded attribute for accessibility
  const isOpen = navLinks.classList.contains('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

/* ==============================================================================
   Module 2 Practice: Operators, Data Types & Temperature Converter Bonus
   ============================================================================== */

// Verifying object type with strict equality (===)
console.log("navToggle element detected:", typeof navToggle === 'object');

// Bonus Practice: Temperature Converter using const, arithmetic, and template literals
const celsius = 25;
const fahrenheit = (celsius * 9 / 5) + 32;
console.log(`Temperature Converter: ${celsius}°C is ${fahrenheit}°F`);

// Logical operators: Checking if temperature is within a comfortable range (15°C - 25°C)
const isComfortable = celsius >= 15 && celsius <= 25;
console.log(`Is the temperature comfortable? ${isComfortable}`);

/* ==============================================================================
   Module 3: Control Flow (Conditionals, Ternary Operator, and Loops)
   ============================================================================== */

// 1. Conditional Statements (if / else if / else) and Truthy & Falsy values
let sampleMessage = "Hello, I am interested in collaborating on a web project!";

if (sampleMessage) {
  // A non-empty string is truthy
  console.log(`[Module 3] Valid sample message received: "${sampleMessage}"`);
} else {
  // Falsy check: empty string "", null, undefined, 0, NaN, false
  console.log("[Module 3] Warning: Please write a message before submitting.");
}

// 2. Ternary Operator (condition ? exprIfTrue : exprIfFalse)
let formStatus = sampleMessage ? "ready to send" : "empty";
console.log(`[Module 3] Form status (via ternary): ${formStatus}`);

// 3. Loops (for & while)
const formFieldNames = ["name", "email", "message"];

console.log("[Module 3] Validating required form fields via for-loop:");
for (let i = 0; i < formFieldNames.length; i++) {
  console.log(` - Checking field: ${formFieldNames[i]}`);
}

// Demonstrating while-loop counter
let attempts = 0;
while (attempts < 3) {
  attempts++;
  console.log(` - Connection retry check #${attempts}`);
}

console.log("Ready for Week 2 — Module 4: Functions (The Building Blocks)!");
