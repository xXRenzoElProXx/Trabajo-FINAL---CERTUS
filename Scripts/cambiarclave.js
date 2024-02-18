const toggleCurrentPassword = document.getElementById('toggleCurrentPassword');
const toggleNewPassword = document.getElementById('toggleNewPassword');
const toggleConfirmNewPassword = document.getElementById('toggleConfirmNewPassword');

toggleCurrentPassword.addEventListener('click', togglePasswordVisibility.bind(null, 'currentPassword'));
toggleNewPassword.addEventListener('click', togglePasswordVisibility.bind(null, 'newPassword'));
toggleConfirmNewPassword.addEventListener('click', togglePasswordVisibility.bind(null, 'confirmNewPassword'));

function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    const icon = document.getElementById('toggle' + passwordFieldId.charAt(0).toUpperCase() + passwordFieldId.slice(1));
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

document.getElementById("newPassword").addEventListener("input", function () {
    var newPassword = this.value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;
    var passwordHelpBlock = document.getElementById("passwordHelpBlock");
    var confirmPasswordHelpBlock = document.getElementById("confirmPasswordHelpBlock");

    if (newPassword.length < 8) {
        passwordHelpBlock.innerText = "Tu contraseña debe tener al menos 8 caracteres.";
        passwordHelpBlock.style.color = "red";
    } else {
        passwordHelpBlock.innerText = "";
    }

    if (newPassword !== confirmNewPassword) {
        confirmPasswordHelpBlock.innerText = "Las contraseñas no coinciden.";
    } else {
        confirmPasswordHelpBlock.innerText = "";
    }
});

document.getElementById("confirmNewPassword").addEventListener("input", function () {
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = this.value;
    var confirmPasswordHelpBlock = document.getElementById("confirmPasswordHelpBlock");

    if (newPassword !== confirmNewPassword) {
        confirmPasswordHelpBlock.innerText = "Las contraseñas no coinciden.";
    } else {
        confirmPasswordHelpBlock.innerText = "";
    }
});

document.getElementById("cambiarClaveForm").addEventListener("submit", function (event) {
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
        alert("Las contraseñas no coinciden.");
    } else {
        alert("Contraseña cambiada.");
    }
});