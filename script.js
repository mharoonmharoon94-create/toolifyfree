
// 1. WORD COUNTER
const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

textInput.addEventListener("input", function () {
    const text = textInput.value;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    wordCount.textContent = words;
    charCount.textContent = text.length;
});


// 2. AGE CALCULATOR
document.getElementById("calculateBtn").addEventListener("click", function () {
    const birthDateValue = document.getElementById("birthDate").value;
    const ageResult = document.getElementById("ageResult");

    if (!birthDateValue) {
        ageResult.textContent = "Please enter your date of birth.";
        return;
    }

    const birthDate = new Date(birthDateValue + "T00:00:00");
    const today = new Date();

    if (birthDate > today) {
        ageResult.textContent = "Please enter a valid past date.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    ageResult.textContent =
        `Your Age: ${years} Years, ${months} Months, ${days} Days`;
});


// 3. TEXT CASE CONVERTER
const caseInput = document.getElementById("caseInput");
const caseOutput = document.getElementById("caseOutput");

document.getElementById("upperBtn").addEventListener("click", function () {
    caseOutput.value = caseInput.value.toUpperCase();
});

document.getElementById("lowerBtn").addEventListener("click", function () {
    caseOutput.value = caseInput.value.toLowerCase();
});


// 4. PASSWORD GENERATOR
const generatePasswordBtn = document.getElementById("generatePasswordBtn");
const copyPasswordBtn = document.getElementById("copyPasswordBtn");

generatePasswordBtn.addEventListener("click", function () {
    const length = Number(document.getElementById("passwordLength").value);
    const includeUpper = document.getElementById("includeUpper").checked;
    const includeLower = document.getElementById("includeLower").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const passwordOutput = document.getElementById("generatedPassword");
    const passwordMessage = document.getElementById("passwordMessage");

    if (!Number.isInteger(length) || length < 4 || length > 64) {
        passwordMessage.textContent = "Please enter a length between 4 and 64.";
        return;
    }

    let characters = "";

    if (includeUpper) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+-=";

    if (characters === "") {
        passwordMessage.textContent = "Please select at least one option.";
        return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let password = "";

    for (let i = 0; i < length; i++) {
        password += characters[randomValues[i] % characters.length];
    }

    passwordOutput.value = password;
    passwordMessage.textContent = "Password generated successfully!";
});


// COPY PASSWORD
copyPasswordBtn.addEventListener("click", async function () {
    const passwordOutput = document.getElementById("generatedPassword");
    const passwordMessage = document.getElementById("passwordMessage");

    if (passwordOutput.value === "") {
        passwordMessage.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordOutput.value);
        passwordMessage.textContent = "Password copied successfully!";
    } catch (error) {
        passwordMessage.textContent = "Copy not available. Please copy manually.";
    }
});


// 5. BMI CALCULATOR
document.getElementById("calculateBMI").addEventListener("click", function () {
    const weightInput = document.getElementById("bmiWeight");
    const heightInput = document.getElementById("bmiHeight");
    const bmiResult = document.getElementById("bmiResult");

    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);

    if (
        weightInput.value === "" || heightInput.value === "" ||
        !Number.isFinite(weight) || !Number.isFinite(height) ||
        weight <= 0 || height <= 0
    ) {
        bmiResult.textContent = "Please enter a valid weight and height.";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obesity";

    bmiResult.textContent =
        `Your BMI: ${bmi.toFixed(1)} | Category: ${category}`;
});


// 6. PERCENTAGE CALCULATOR
document.getElementById("calculatePercentage").addEventListener("click", function () {
    const percentageInput = document.getElementById("percentageValue");
    const numberInput = document.getElementById("percentageNumber");
    const percentageResult = document.getElementById("percentageResult");

    const percentage = Number(percentageInput.value);
    const number = Number(numberInput.value);

    if (
        percentageInput.value === "" || numberInput.value === "" ||
        !Number.isFinite(percentage) || !Number.isFinite(number) ||
        percentage < 0 || number < 0
    ) {
        percentageResult.textContent = "Please enter valid non-negative numbers.";
        return;
    }

    const result = (percentage / 100) * number;

    percentageResult.textContent =
        `${percentage}% of ${number} is ${Number(result.toFixed(6))}`;
});


// 7. DISCOUNT CALCULATOR
document.getElementById("calculateDiscount").addEventListener("click", function () {
    const priceInput = document.getElementById("originalPrice");
    const discountInput = document.getElementById("discountPercent");
    const discountResult = document.getElementById("discountResult");

    const originalPrice = Number(priceInput.value);
    const discountPercent = Number(discountInput.value);

    if (
        priceInput.value === "" || discountInput.value === "" ||
        !Number.isFinite(originalPrice) || !Number.isFinite(discountPercent) ||
        originalPrice < 0 || discountPercent < 0 || discountPercent > 100
    ) {
        discountResult.textContent =
            "Please enter a valid price and discount between 0 and 100.";
        return;
    }

    const savedAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - savedAmount;

    discountResult.textContent =
        `You Save: Rs. ${savedAmount.toFixed(2)} | Final Price: Rs. ${finalPrice.toFixed(2)}`;
});


// 8. UNIT CONVERTER
document.getElementById("convertUnit").addEventListener("click", function () {
    const unitType = document.getElementById("unitType").value;
    const unitValueInput = document.getElementById("unitValue");
    const unitResult = document.getElementById("unitResult");

    const value = Number(unitValueInput.value);

    if (unitValueInput.value.trim() === "" || !Number.isFinite(value)) {
        unitResult.textContent = "Please enter a valid number.";
        return;
    }

    let result;
    let unitName;

    switch (unitType) {
        case "km-m":
            result = value * 1000;
            unitName = "meters";
            break;

        case "m-km":
            result = value / 1000;
            unitName = "kilometers";
            break;

        case "kg-g":
            result = value * 1000;
            unitName = "grams";
            break;

        case "g-kg":
            result = value / 1000;
            unitName = "kilograms";
            break;

        case "c-f":
            result = (value * 9 / 5) + 32;
            unitName = "°F";
            break;

        case "f-c":
            result = (value - 32) * 5 / 9;
            unitName = "°C";
            break;

        case "m-ft":
            result = value * 3.28084;
            unitName = "feet";
            break;

        case "ft-m":
            result = value / 3.28084;
            unitName = "meters";
            break;
    }

    unitResult.textContent =
        `Result: ${Number(result.toFixed(4))} ${unitName}`;
});


// 9. QR CODE GENERATOR
const generateQR = document.getElementById("generateQR");
const qrInput = document.getElementById("qrInput");
const qrResult = document.getElementById("qrResult");
const downloadQR = document.getElementById("downloadQR");
const qrMessage = document.getElementById("qrMessage");

let currentQRUrl = "";

generateQR.addEventListener("click", function () {
    const text = qrInput.value.trim();

    if (text === "") {
        qrMessage.textContent = "Please enter a website link or text.";
        qrResult.innerHTML = "";
        downloadQR.style.display = "none";
        return;
    }

    currentQRUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(text);

    qrResult.innerHTML = "";

    const qrImage = document.createElement("img");
    qrImage.src = currentQRUrl;
    qrImage.alt = "Generated QR Code";
    qrImage.width = 250;
    qrImage.height = 250;

    qrImage.onload = function () {
        qrMessage.textContent = "QR Code generated successfully!";
        downloadQR.style.display = "inline-block";
    };

    qrImage.onerror = function () {
        qrMessage.textContent = "QR Code could not be generated. Check your internet connection.";
        downloadQR.style.display = "none";
    };

    qrResult.appendChild(qrImage);
});


// DOWNLOAD QR CODE
downloadQR.addEventListener("click", async function () {
    if (!currentQRUrl) {
        qrMessage.textContent = "Generate a QR Code first.";
        return;
    }

    try {
        const response = await fetch(currentQRUrl);

        if (!response.ok) {
            throw new Error("Download failed");
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "ToolifyFree-QR-Code.png";
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(downloadUrl);
        qrMessage.textContent = "QR Code downloaded successfully!";
    } catch (error) {
        qrMessage.textContent =
            "Automatic download failed. Opening QR Code so you can save it manually.";
        window.open(currentQRUrl, "_blank", "noopener");
    }
});


// TOOL SEARCH
const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();
    let found = 0;

    toolCards.forEach(function (card) {
        const toolName = card.querySelector("h2").textContent.toLowerCase();
        const toolDescription = card.textContent.toLowerCase();

        if (
            toolName.includes(searchText) ||
            toolDescription.toLowerCase().includes(searchText)
        ) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = found === 0 ? "block" : "none";
});