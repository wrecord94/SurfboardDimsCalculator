// Get elements from DOM
const lengthSlider = document.getElementById('length');  
const widthSlider = document.getElementById('width');  
const thicknessSlider = document.getElementById('thickness');   
const lengthValue = document.getElementById('length-val');   
const widthValue = document.getElementById('width-val');   
const thicknessValue = document.getElementById('thickness-val');   
const volumeResult = document.getElementById('volume-result');

// Function to convert inches to feet and inches
function convertInchesToFeetAndInches(inches) {
    const feet = Math.floor(inches / 12);  
    const remainingInches = inches % 12;   
    return `${feet}' ${remainingInches}"`; 
}

// Convert sixteenths to simplified fraction string
function sixteenthsToFraction(sixteenths) {
    const wholeInches = Math.floor(sixteenths / 16);
    let remainder = sixteenths % 16;

    if (remainder === 0) return `${wholeInches}`; // Whole inch

    // Simplify fraction
    let numerator = remainder;
    let denominator = 16;

    if (numerator % 8 === 0) {
        numerator /= 8; denominator = 2;
    } else if (numerator % 4 === 0) {
        numerator /= 4; denominator = 4;
    } else if (numerator % 2 === 0) {
        numerator /= 2; denominator = 8;
    }

    return `${wholeInches} ${numerator}/${denominator}`;
}

// Function to calculate and display volume
function calculateVolume() {
    const length = parseInt(lengthSlider.value);
    const width = parseInt(widthSlider.value) / 16;
    const thickness = parseInt(thicknessSlider.value) / 16;

    const volumeCubicInches = length * width * thickness;
    const volumeLiters = volumeCubicInches * 0.0163871;

    const selectedOption = document.querySelector('input[name="boardType"]:checked').value;
    const finalVolume = volumeLiters * parseFloat(selectedOption);

    volumeResult.innerText = finalVolume.toFixed(2);
}

// Event listeners
lengthSlider.addEventListener('input', () => {
    const inches = parseInt(lengthSlider.value);
    lengthValue.innerText = convertInchesToFeetAndInches(inches);
    calculateVolume();
});

widthSlider.addEventListener('input', () => {
    const sixteenths = parseInt(widthSlider.value);
    widthValue.innerText = sixteenthsToFraction(sixteenths);
    calculateVolume();
});

thicknessSlider.addEventListener('input', () => {
    const sixteenths = parseInt(thicknessSlider.value);
    thicknessValue.innerText = sixteenthsToFraction(sixteenths);
    calculateVolume();
});

// Radio buttons
document.querySelectorAll('input[name="boardType"]').forEach(button => {
    button.addEventListener('change', calculateVolume);
});

// Initial display
lengthValue.innerText = convertInchesToFeetAndInches(parseInt(lengthSlider.value) / 16);
widthValue.innerText = sixteenthsToFraction(parseInt(widthSlider.value));
thicknessValue.innerText = sixteenthsToFraction(parseInt(thicknessSlider.value));
calculateVolume();
