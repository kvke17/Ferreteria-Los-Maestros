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

        // Validar contraseÃ±a
        if (!/^[a-zA-Z0-9]+$/.test(contrasenia.value)) {
            alert("La contraseÃ±a solo debe tener nÃºmeros y letras");
            contrasenia.focus();
            return;
        }

        alert("Inicio de sesiÃ³n exitoso");

    });

}



if (registro) {

    let nombre = document.getElementById("nombre");
    let rut = document.getElementById("rut");
    let email = document.getElementById("email");
    let contrasenia = document.getElementById("contrasenia");
    let telefono = document.getElementById("telefono");
    let fenac = document.getElementById("fenac");

    registro.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar nombre
        if (!/^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘\s]+$/.test(nombre.value)) {

            alert("El nombre debe contener solo letras");
            nombre.focus();
            return;
        }

        // Validar RUT
        if (!/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9kK]$/.test(rut.value)) {
            alert("El RUT debe tener el formato 12.345.678-9");
            rut.focus();
            return;
        }

        // Validar correo
        if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/.test(email.value)) {
            alert("El correo debe ser Gmail, Outlook o Duoc UC");
            email.focus();
            return;

        }

        // Validar contraseÃ±a
        if (!/^[a-zA-Z0-9]+$/.test(contrasenia.value)) {
            alert("La contraseÃ±a solo debe tener nÃºmeros y letras");
            contrasenia.focus();
            return;

        }


        // Validar telÃ©fono
        if (!/^\+56[0-9]{9}$/.test(telefono.value)) {
            alert("El telÃ©fono debe comenzar con +56 y contener 9 nÃºmeros despuÃ©s");
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

        // Comprobar si todavÃ­a no ha cumplido aÃ±os
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        // Validar edad
        if (edad < 18) {
            alert("Debes ser mayor de 18 aÃ±os");
            fenac.focus();
            return;
        }

        alert("Registro exitoso");

    });

}
