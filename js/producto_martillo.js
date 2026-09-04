// Buscar los elementos en el HTML
let inputCantidad = document.getElementById("cantidad");
let spanPrecioTotal = document.getElementById("precio_total");
let botonComprar = document.getElementById("btn_comprar");
let mensajeCompra = document.getElementById("mensaje_compra");

// Definir el precio base
let precioUnitario = 5000;

if (inputCantidad && botonComprar) {
    
    // Interacción 1: Calcular automáticamente al cambiar el número
    inputCantidad.addEventListener("input", function() {
        let cantidad = parseInt(inputCantidad.value);
        
        // Evitar números negativos o vacíos
        if (cantidad > 0) {
            let total = cantidad * precioUnitario;
            spanPrecioTotal.innerText = total; // Modificamos dinámicamente el valor en pantalla
            mensajeCompra.innerText = ""; // Limpiar mensaje anterior
        }
    });

    // Interacción 2: Mostrar un mensaje al hacer clic en el botón
    botonComprar.addEventListener("click", function() {
        let cantidad = parseInt(inputCantidad.value);
        let total = cantidad * precioUnitario;
        
        if (cantidad > 0) {
            mensajeCompra.style.color = "green";
            mensajeCompra.innerText = "¡Agregaste " + cantidad + " producto(s) por un total de $" + total + "!";
        } else {
            mensajeCompra.style.color = "red";
            mensajeCompra.innerText = "Por favor, ingresa una cantidad válida.";
        }
    });
}