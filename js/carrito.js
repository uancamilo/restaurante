let btnProductos = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro");
let listadoCarrito = document.querySelector(".list-cart tbody");
let contador = 0;

document.addEventListener("DOMContentLoaded", cargarLocalStorage);

btnProductos.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		// alert("Producto agregado al carrito " + (index + 1));
		contador++;
		contadorCarrito.textContent = contador;
		infoProducto(index);
	});
});

//Agregar productos al carrito

function agregarProducto(producto, index) {
	let fila = document.createElement("tr");
	fila.innerHTML = `
    <td>${isNaN(index) ? contador : index + 1}</td>
    <td><img src = "${producto.imagen}" width ="70px"></td>
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
    <td> <span
        onclick="eliminarProducto(${contador})"
        class="btn btn-danger">
        X
        </span>
    </td>`;
	listadoCarrito.appendChild(fila);
}

function infoProducto(pos) {
	let producto = btnProductos[pos].parentElement.parentElement.parentElement;

	let infoPro = {
		nombre: producto.querySelector("h3").textContent,
		imagen: producto.querySelector("img").src,
		precio: producto.querySelector("h5").textContent.trim().split("$")[1],
		cantidad: 1,
	};
	agregarProducto(infoPro);
	guardarLocalStorage(infoPro);
}

//Eliminar productos del carrito

function eliminarProducto(pos) {
	let producto = event.target;
	producto.parentElement.parentElement.remove();
	if (contador > 0) {
		contador--;
		contadorCarrito.textContent = contador;
	}
	eliminarProductoLocalStorage(pos);
}

//Guardar los productos en el localStorage
function guardarLocalStorage(producto) {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito")) || [];
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}
	console.log(producto);
	todosProductos.push(producto);
	localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

function eliminarProductoLocalStorage(pos) {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito")) || [];
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}
	todosProductos.splice(pos - 1, 1);
	localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

// Cargar los productos del localStorage
function cargarLocalStorage() {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito")) || [];
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}
	todosProductos.forEach((producto, index) => {
		agregarProducto(producto, index);
	});
}

contadorCarrito.parentElement.addEventListener("click", () => {
	listadoCarrito.parentElement.classList.toggle("ocultar");
});