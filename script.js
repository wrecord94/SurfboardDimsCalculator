// Get elements from DOM
const lengthSlider = document.getElementById('length');  // value selected by slider
const widthSlider = document.getElementById('width');  // value selected by slider
const thicknessSlider = document.getElementById('thickness');   // value selected by slider
const lengthValue = document.getElementById('length-val');   // value displayed at bottom of the slider
const widthValue = document.getElementById('width-val');   // value displayed at bottom of the slider
const thicknessValue = document.getElementById('thickness-val');   // value displayed at bottom of the slider
const volumeResult = document.getElementById('volume-result');

// Function to convert inches to feet and inches
function convertInchesToFeetAndInches(inches) {
    const feet = Math.floor(inches / 12);  // Get whole feet
    const remainingInches = inches % 12;   // Get remaining inches
    return `${feet}' ${remainingInches}"`; // Format as feet' inches"
}

// Function to convert decimal points to 16ths
function convertDecimalsToFractions(inches) {
    const wholeInches = Math.floor(inches);  // Get whole inches
    const decimalInches = inches - wholeInches;   // Get remaining decimal
    let sixteenths = Math.round(decimalInches * 16); // Multiply decimal by 16 and round to nearest whole number

    // Normalize the fraction to be between 0 and 15 (0-15/16)
    sixteenths = Math.max(0, Math.min(15, sixteenths));

    // Handle special cases
    if (sixteenths === 0) {
        return `${wholeInches}`;  // If no fraction
    } else if (sixteenths === 16) {
        return `${wholeInches + 1}`;  // If it rounds to a whole inch
    } else {
        // Create fraction string and simplify if possible
        const numerator = sixteenths;
        const denominator = 16;

        // Adjust numerator for 1/4 increments
        if (numerator % 4 === 0) {
            const simplifiedNumerator = numerator / 4; // Simplify to quarters
            const simplifiedDenominator = denominator / 4;
            return `${wholeInches} ${simplifiedNumerator}/${simplifiedDenominator}`;
        } else {
            return `${wholeInches} ${numerator}/${denominator}`; // Return whole inches and fraction
        }
    }
}


// Function to calculate and display volume
function calculateVolume() {
    const length = parseFloat(lengthSlider.value);
    const width = parseFloat(widthSlider.value);
    const thickness = parseFloat(thicknessSlider.value);

    // Calculate volume in cubic inches
    const volumeCubicInches = length * width * thickness;

    // Convert cubic inches to liters
    const volumeLiters = volumeCubicInches * 0.0163871;

    // Get the selected multiplier from radio buttons
    const selectedOption = document.querySelector('input[name="boardType"]:checked').value; // Get the selected multiplier
    const finalVolume = volumeLiters * parseFloat(selectedOption); // Apply the multiplier

    // Update the display with the final volume in liters
    volumeResult.innerText = finalVolume.toFixed(2);
}

// Add event listeners for each slider to update the displayed value and calculate the volume
lengthSlider.addEventListener('input', () => {
    // Convert length from inches to feet and inches for display
    lengthValue.innerText = convertInchesToFeetAndInches(lengthSlider.value);
    calculateVolume();
});

widthSlider.addEventListener('input', () => {
    // Convert width from inches with decimals to inches and fractions up to 16ths for display
    widthValue.innerText = convertDecimalsToFractions(widthSlider.value);
    calculateVolume();
});

thicknessSlider.addEventListener('input', () => {
    // Convert thickness from inches with decimals to inches and fractions up to 16ths for display
    thicknessValue.innerText = convertDecimalsToFractions(thicknessSlider.value);
    calculateVolume();
});

// Add event listeners to all radio buttons to recalculate the volume when an option is selected
const radioButtons = document.querySelectorAll('input[name="boardType"]');
radioButtons.forEach(button => {
    button.addEventListener('change', calculateVolume);
});

// Initial calculation to set the default volume and display length in feet and inches
lengthValue.innerText = convertInchesToFeetAndInches(lengthSlider.value);
calculateVolume();
