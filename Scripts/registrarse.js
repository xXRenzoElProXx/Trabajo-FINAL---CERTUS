
function mostrarInicioSesion() {
    document.getElementById("registro").style.display = "none";
    document.getElementById("inicioSesion").style.display = "block";

    document.getElementById("emailInicio").value = "";
    document.getElementById("passwordInicio").value = "";
}

function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
    document.getElementById("inicioSesion").style.display = "none";

    document.getElementById("nombreRegistro").value = "";
    document.getElementById("emailRegistro").value = "";
    document.getElementById("passwordRegistro").value = "";
}

function verPassword(id, botonId) {
    var input = document.getElementById(id);
    var boton = document.getElementById(botonId);
    if (input.type === "password") {
        input.type = "text";
        boton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = "password";
        boton.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

document.getElementById("nombreRegistro").addEventListener("input", function () {
    var nombreInput = this.value.trim();
    var nombreError = document.getElementById("nombreError");

    if (nombreInput === "") {
        nombreError.style.display = "block";
    } else {
        nombreError.style.display = "none";
    }
});

document.getElementById("emailRegistro").addEventListener("input", function () {
    var emailInput = this.value.trim();
    var emailError = document.getElementById("emailError");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }
});

document.getElementById("passwordRegistro").addEventListener("input", function () {
    var passwordInput = this.value;
    var passwordError = document.getElementById("passwordError");

    if (passwordInput.length < 8) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }
});

function validarFormulario(event) {
    event.preventDefault();

    var nombreInput = document.getElementById("nombreRegistro").value.trim();
    var emailInput = document.getElementById("emailRegistro").value.trim();
    var passwordInput = document.getElementById("passwordRegistro").value;
    var nombreError = document.getElementById("nombreError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombreInput === "") {
        nombreError.style.display = "block";
    } else {
        nombreError.style.display = "none";
    }

    if (!emailRegex.test(emailInput)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }

    if (passwordInput.length < 8) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }

    if (nombreInput !== "" && emailRegex.test(emailInput) && passwordInput.length >= 8) {
        alert("¡Registro exitoso!");
        document.getElementById("nombreRegistro").value = "";
        document.getElementById("emailRegistro").value = "";
        document.getElementById("passwordRegistro").value = "";
    }
}

document.getElementById("registroForm").addEventListener("submit", validarFormulario);




document.getElementById("emailInicio").addEventListener("input", function () {
    var emailInput = this.value.trim();
    var emailError = document.getElementById("emailInicioError");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }
});

document.getElementById("passwordInicio").addEventListener("input", function () {
    var passwordInput = this.value;
    var passwordError = document.getElementById("passwordInicioError");

    if (passwordInput.length < 8) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }
});

function validarInicioSesion(event) {
    event.preventDefault();

    var emailInput = document.getElementById("emailInicio").value.trim();
    var passwordInput = document.getElementById("passwordInicio").value;
    var emailError = document.getElementById("emailInicioError");
    var passwordError = document.getElementById("passwordInicioError");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }

    if (passwordInput.length < 8) {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none";
    }

    if (emailRegex.test(emailInput) && passwordInput.length >= 8) {
        alert("¡Inicio de sesión exitoso!");
        document.getElementById("emailInicio").value = "";
        document.getElementById("passwordInicio").value = "";
    }
}

document.getElementById("inicioSesionForm").addEventListener("submit", validarInicioSesion);