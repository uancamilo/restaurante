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

	//Comprobar si hay productos en el carrito

	if (todosProductos.length != 0) {
		tablaCarrito.innerHTML = "";
		todosProductos.forEach((producto, i) => {
			let fila = document.createElement("tr");
			fila.innerHTML = `
            <td class="d-flex justify-content-around align-items-center">
				<span
				onclick="eliminarProducto()" 
				class="btn btn-danger">
				X
				</span>
				<img src = "${producto.imagen}" width ="70px">
				${producto.nombre}
			</td>
            <td>
				$ <span> ${producto.precio} </span>
			</td>
            <td>
				<div class="quantity quantity-wrap">
					<div class="decrement" onclick="actualizarCantidad(${i}, -1)">
						<i class="fa-solid fa-minus"></i>
					</div>
					<input class="text" type="number" name="quantity" value="${
						producto.cantidad || 1
					}" size="1" readonly>
					<div class="increment" onclick="actualizarCantidad(${i}, 1)">
						<i class="fa-solid fa-plus" ></i>
					</div>
				</div>
			</td>
			<td>
				${producto.precio}
			</td>
        `;
			tablaCarrito.appendChild(fila);
		});
	} else {
		let fila = document.createElement("tr");
		fila.innerHTML = `
		<td colspan="4">No hay productos en el carrito</td>
		`;
		tablaCarrito.appendChild(fila);
	}
}

//Actutialza catidad producto

function actualizarCantidad(pos, cambio) {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito"));
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}
	if (todosProductos[pos]) {
		todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;
		// Asegurar que la cantidad no sea menor a 1
		if (todosProductos[pos].cantidad < 1) {
			todosProductos[pos].cantidad = 1;
		}
		// Actualizar el localStorage
		localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
		// Volver a cargar los productos en la interfaz
		cargarProductos();
	}
}

