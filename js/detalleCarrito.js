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
            <td class="d-flex justify-content-around align-items-center">
				<span
				onclick="eliminarProducto('')" 
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
					<div class="decremento">
						<i class="fa-solid fa-minus"></i>
					</div>
					<input class="number" type="number" name="quantity" value="1" min="1" max="10" size="1" readonly>
					<div class="incremento">
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
}
