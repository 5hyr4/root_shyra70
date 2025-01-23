console.log("JS in action")

// Step 1 - Selecting the element
const myShape = document.getElementById("star-five");

// Step 2 - adding a Click event
// myShape.addEventListener("click", function() {})
myShape.addEventListener("click", () => {
    // myShape.style.borderColor = "blue transparent"
    myShape.classList.toggle("change-me");
})