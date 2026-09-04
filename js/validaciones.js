// Buscar los formularios
let formulario = document.getElementById("login");
let registro = document.getElementById("register");

if (formulario) {
    let email = document.getElementById("email");
    let contrasenia = document.getElementById("contrasenia");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar correo
        if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/.test(email.value)) {
            alert("El correo debe ser Gmail, Outlook o Duoc UC");
            email.focus();
            return;
        }

        // Validar contraseña
        if (!/^[a-zA-Z0-9]+$/.test(contrasenia.value)) {
            alert("La contraseña solo debe tener números y letras");
            contrasenia.focus();
            return;
        }

        alert("Inicio de sesión exitoso");
    });
}

if (registro) {
    let nombre = document.getElementById("nombre");
    let rut = document.getElementById("rut");
    let email = document.getElementById("email");
    let contrasenia = document.getElementById("contrasenia");
    let confirmarContrasenia = document.getElementById("confirmar_contrasenia");
    let telefono = document.getElementById("telefono");
    let fenac = document.getElementById("fenac");

    registro.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar nombre
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
            alert("El nombre debe contener solo letras");
            nombre.focus();
            return;
        }

        // Validar RUT
        if (!/^[0-9]{7,8}$/.test(rut.value)) {
            alert("El RUT debe contener solo números y tener entre 7 y 8 dígitos");
            rut.focus();
            return;
        }

        // Validar correo
        if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/.test(email.value)) {
            alert("El correo debe ser Gmail, Outlook o Duoc UC");
            email.focus();
            return;
        }

        // Validar contraseña
        if (!/^[a-zA-Z0-9]+$/.test(contrasenia.value)) {
            alert("La contraseña solo debe tener números y letras");
            contrasenia.focus();
            return;
        }

        // Validar que las contraseñas coincidan
        if (contrasenia.value !== confirmarContrasenia.value) {
            alert("Las contraseñas no coinciden. Verifícalas por favor.");
            confirmarContrasenia.focus();
            return;
        }

        // Validar teléfono
        if (!/^\+56[0-9]{9}$/.test(telefono.value)) {
            alert("El teléfono debe comenzar con +56 y contener 9 números después");
            telefono.focus();
            return;
        }

        // Validar que se haya seleccionado una fecha
        if (fenac.value === "") {
            alert("Debes ingresar tu fecha de nacimiento");
            fenac.focus();
            return;
        }

        // Calcular edad
        let fechaNacimiento = new Date(fenac.value);
        let hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let mes = hoy.getMonth() - fechaNacimiento.getMonth();

        // Comprobar si todavía no ha cumplido años
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        // Validar edad
        if (edad < 18) {
            alert("Debes ser mayor de 18 años");
            fenac.focus();
            return;
        }

        alert("Registro exitoso");
    });
}