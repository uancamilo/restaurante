//Variables globales

let tablaCarrito = document.querySelector(".cart-table tbody");
let resumenSubTotal = document.querySelector(".res-sub-total");
let resumenDescuento = document.querySelector(".promo");
let resumenTotal = document.querySelector(".total");
let destino = document.querySelector(".destino");
let resumenDomilicio = document.querySelector(".valor-domi");
let btnFinalizarCompra = document.querySelector(".btn-resumen");

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
	tablaCarrito.innerHTML = "";

	if (todosProductos.length != 0) {
		todosProductos.forEach((producto, i) => {
			let fila = document.createElement("tr");
			fila.innerHTML = `
            <td class="d-flex justify-content-around align-items-center">
				<span
				onclick="eliminarProducto(${i})" 
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
					<input class="number" type="text" name="quantity" value="${
						producto.cantidad || 1
					}" size="1" readonly>
					<div class="increment" onclick="actualizarCantidad(${i}, 1)">
						<i class="fa-solid fa-plus" ></i>
					</div>
				</div>
			</td>
			<td>
				$${(producto.precio * producto.cantidad).toFixed(3)}
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
	resumenCompra();
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

		//Calcular el subtotal
		let subtotal = todosProductos[pos].precio * todosProductos[pos].cantidad;
	}
	// Actualizar el localStorage
	localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
	// Volver a cargar los productos en la interfaz
	cargarProductos();
}

//Eliminar producto

function eliminarProducto(pos) {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito"));
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}
	todosProductos.splice(pos, 1);
	localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
	cargarProductos();
}

function resumenCompra() {
	let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
	let subtotal = 0;
	todosProductos.forEach((producto) => {
		subtotal += producto.precio * producto.cantidad;
	});

	// Calcular el costo de envío
	let domicilio = 0;
	switch (destino.value) {
		case "Medellin":
		default:
			domicilio;
			break;
		case "Bello":
			domicilio += 10.0;
			break;
		case "Itagui":
			domicilio += 15.0;
			break;
		case "Envigado":
			domicilio += 15.0;
			break;
		case "Sabaneta":
			domicilio += 15.0;
			break;
		case "La Estrella":
			domicilio += 20.0;
			break;
		case "Caldas":
			domicilio += 20.0;
			break;
		case "Copacabana":
			domicilio += 20.0;
			break;
	}

	// Calcular descuento del 10% si la compra es mayor a 1000
	let descuento = subtotal > 100.0 ? subtotal * 0.1 : 0;
	let totalPagar = subtotal - descuento + domicilio;

	resumenSubTotal.textContent = `$${subtotal.toFixed(3)}`;
	resumenDescuento.textContent = `$${descuento.toFixed(3)}`;
	resumenTotal.textContent = `$${totalPagar.toFixed(3)}`;
	resumenDomilicio.textContent = `$${domicilio.toFixed(3)}`;
}

destino.addEventListener("change", () => {
	resumenCompra();
});

//Evento para finalizar compra
btnFinalizarCompra.addEventListener("click", () => {
	let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
	let resumen = {
		...todosProductos,
	};
	resumen.subtotal = resumenSubTotal.textContent;
	resumen.descuento = resumenDescuento.textContent;
	resumen.destino = destino.value;
	resumen.domicilio = resumenDomilicio.textContent;
	resumen.totalPagar = resumenTotal.textContent;
	localStorage.setItem("pro-resumen", JSON.stringify(resumen));
	window.location.href = "checkout.html";
});