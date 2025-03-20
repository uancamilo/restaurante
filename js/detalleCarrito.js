//Variables globales

let tablaCarrito = document.querySelector(".cart-table tbody");

//Evento para cargar productos del localstorage

document.addEventListener("DOMContentLoaded", () => {
	cargarProductos();
});

// Cargar producto guardados

function cargarProductos() {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito"));
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}

	todosProductos.forEach((producto) => {
		let fila = document.createElement("tr");
		fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
        `;
		tablaCarrito.appendChild(fila);
	});
}
