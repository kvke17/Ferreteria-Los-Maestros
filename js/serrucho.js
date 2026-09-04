// Buscar los elementos en el HTML
let inputCantidad = document.getElementById("cantidad");
let spanPrecioTotal = document.getElementById("precio_total");
let botonComprar = document.getElementById("btn_comprar");
let mensajeCompra = document.getElementById("mensaje_compra");

// Definir el precio base específico para el Serrucho
let precioUnitario = 8500;

if (inputCantidad && botonComprar) {
    
    // Calcular automáticamente al cambiar el número
    inputCantidad.addEventListener("input", function() {
        let cantidad = parseInt(inputCantidad.value);
        
        if (cantidad > 0) {
            let total = cantidad * precioUnitario;
            spanPrecioTotal.innerText = total;
            mensajeCompra.innerText = ""; 
        }
    });

    // Mostrar mensaje al hacer clic
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