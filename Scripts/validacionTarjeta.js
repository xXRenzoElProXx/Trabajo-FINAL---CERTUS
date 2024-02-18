const cardNameInput = document.getElementById('card-name');
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvvInput = document.getElementById('cvv');

cardNameInput.addEventListener('input', validateCardName);
cardNumberInput.addEventListener('input', validateCardNumber);
expiryDateInput.addEventListener('input', validateExpiryDate);
cvvInput.addEventListener('input', validateCVV);

function validateCardName() {
    const cardNameValue = cardNameInput.value.trim();
    const cardNameRegex = /^[a-zA-Z\s]+$/;
    const isValid = cardNameRegex.test(cardNameValue);
    const iconCheck = document.getElementById('card-name-check');
    const iconError = document.getElementById('card-name-error');

    if (isValid) {
        iconCheck.style.display = 'inline';
        iconError.style.display = 'none';
    } else {
        iconCheck.style.display = 'none';
        iconError.style.display = 'inline';
    }
}

function validateCardNumber() {
    let cardNumberValue = cardNumberInput.value.replace(/\s/g, '');
    cardNumberValue = cardNumberValue.slice(0, 16);
    const isValid = /^[0-9]{16}$/.test(cardNumberValue);
    const iconCheck = document.getElementById('card-number-check');
    const iconError = document.getElementById('card-number-error');

    if (isValid && cardNumberValue.length === 16) {
        iconCheck.style.display = 'inline';
        iconError.style.display = 'none';
    } else {
        iconCheck.style.display = 'none';
        iconError.style.display = 'inline';
    }

    cardNumberInput.value = cardNumberValue;
}

function validateCVV() {
    let cvvValue = cvvInput.value.trim();
    cvvValue = cvvValue.slice(0, 3);
    const isValid = /^[0-9]{3}$/.test(cvvValue);
    const iconCheck = document.getElementById('cvv-check');
    const iconError = document.getElementById('cvv-error');

    if (isValid && cvvValue.length === 3) {
        iconCheck.style.display = 'inline';
        iconError.style.display = 'none';
    } else {
        iconCheck.style.display = 'none';
        iconError.style.display = 'inline';
    }

    cvvInput.value = cvvValue;
}

function validateExpiryDate() {
    let expiryDateValue = expiryDateInput.value.trim();
    expiryDateValue = expiryDateValue.replace(/\D/g, '');

    let formattedDate = '';
    if (expiryDateValue.length > 2) {
        formattedDate = expiryDateValue.slice(0, 2) + (expiryDateValue.length > 2 ? '/' + expiryDateValue.slice(2, 4) : '');
    } else {
        formattedDate = expiryDateValue;
    }

    const month = formattedDate.slice(0, 2);
    if (parseInt(month) > 12) {
        formattedDate = '12';
    }

    expiryDateInput.value = formattedDate;

    const iconCheck = document.getElementById('expiry-date-check');
    const iconError = document.getElementById('expiry-date-error');

    if (expiryDateValue.length >= 4 && parseInt(month) <= 12) {
        iconCheck.style.display = 'inline';
        iconError.style.display = 'none';
    } else {
        iconCheck.style.display = 'none';
        iconError.style.display = 'inline';
    }
}

function validateNumericInput(inputElement, allowNumbers = true) {
    inputElement.addEventListener('keypress', function (event) {
        const keyCode = event.keyCode || event.which;
        if ((!allowNumbers && keyCode >= 48 && keyCode <= 57) ||
            (allowNumbers && (keyCode < 48 || keyCode > 57))) {
            event.preventDefault();
        }
    });
}

validateNumericInput(cardNameInput, false);
validateNumericInput(cardNumberInput);
validateNumericInput(expiryDateInput);
validateNumericInput(cvvInput);

const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (allFieldsValidated()) {
        showCustomAlert("Compra terminada");
    } else {
        alert('Por favor, completa correctamente todos los campos.');
    }
});

function allFieldsValidated() {
    return isFieldValidated('card-name') && isFieldValidated('card-number') && isFieldValidated('expiry-date') && isFieldValidated('cvv');
}

function isFieldValidated(fieldName) {
    const iconCheck = document.getElementById(`${fieldName}-check`);
    return iconCheck.style.display === 'inline';
}

function showCustomAlert(message) {
    var alertBox = document.getElementById("customAlert");
    var alertMessage = document.getElementById("alertMessage");

    alertMessage.textContent = message;
    alertBox.classList.add("show");

    setTimeout(function () {
        alertBox.classList.remove("show");
        paymentForm.submit();
    }, 2000);
}
