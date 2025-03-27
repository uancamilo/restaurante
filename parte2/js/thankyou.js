let compra = document.querySelector(".compra");
let datosCompra = JSON.parse(localStorage.getItem("formularioDatos"));

console.log(datosCompra)

if (datosCompra != null) { 
    compra.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h2>Gracias por tu compra ${datosCompra.formulario.nombres}</h2>
            </div>
            <div class="card-body">
                <p>Enviaremos tu pedido a la dirección: ${datosCompra.formulario.direccion}</p>
                <p>En caso de que necesitemos contactarte, lo haremos al número: ${datosCompra.formulario.telefono}</p>
                <p>Recibirás un correo de confirmación a la dirección: ${datosCompra.formulario.email}</p>
                <p>Nos podríamos estar comunicando contigo para confirmar tu pedido.${datosCompra.formulario.celular}</p>
                <p>¡Esperamos que disfrutes tu compra!</p>

                <p>Detalles de tu compra:</p>
                <p>Subtotal: ${datosCompra.carrito.subtotal}</p>
                <p>Descuento: ${datosCompra.carrito.descuento}</p>
                <p>Total a pagar: ${datosCompra.carrito.totalPagar}</p>
            </div>
        </div>
    `;
}