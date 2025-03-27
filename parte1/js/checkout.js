let productos = document.querySelector(".productos");
let carrito = JSON.parse(localStorage.getItem("pro-resumen")) || [];

console.log(carrito);

let domicilio = document.querySelector(".valor-domi");
let destino = document.querySelector(".destino");
let promo = document.querySelector(".promo");
let subtotal = document.querySelector(".res-sub-total");
let total = document.querySelector(".total");

function cargarProductos() {
	let todosProductos = [];
	let productoExistente = JSON.parse(localStorage.getItem("pro-carrito"));
	if (productoExistente != null) {
		todosProductos = Object.values(productoExistente);
	}

	const tabla = document.createElement("table");
	tabla.innerHTML = `
    <thead>
        <tr>
            <th style="width: 300px;"></th>
            <th style="width: 150px; text-align: center;">Nombre</th>
            <th style="width: 100px; text-align: center;">Cant</th>
            <th style="width: 200px; text-align: center;">Precio</th>
            <th style="width: 200px; text-align: center;">Total</th>
        </tr>
    </thead>
`;
	productos.appendChild(tabla);

	if (todosProductos.length > 0) {
		todosProductos.forEach((producto, pos) => {
			let fila = document.createElement("tr");
			fila.innerHTML = `
            <td style="width: 200px; text-align: center;">
                <img src="${producto.imagen}" width="100">
            </td>
            <td style="width: 200px; text-align: center;">
                ${producto.nombre}
            </td>
            <td style="width: 200px; text-align: center;">
                ${producto.cantidad}
            </td>
            <td style="width: 200px; text-align: center;">
                $${producto.precio}
            </td>
            <td style="width: 200px; text-align: center;">
                $${(producto.precio * producto.cantidad).toFixed(3)}
            </td>
            `;
			productos.appendChild(fila);
		});
	}
}

document.addEventListener("DOMContentLoaded", function () {
	cargarProductos();
	domicilio.textContent = carrito.domicilio;
	destino.textContent = carrito.destino;
	promo.textContent = carrito.descuento;
	subtotal.textContent = carrito.subtotal;
	total.textContent = carrito.totalPagar;
});

function guardarDatosFormulario() {
	const datos = {
		nombres: document.getElementById("nombres-input").value.trim(),
		apellidos: document.getElementById("apellidos-input").value.trim(),
		email: document.getElementById("email-input").value.trim(),
		celular: document.getElementById("celular-input").value.trim(),
		direccion: document.getElementById("direccion-input").value.trim(),
		direccion2: document.getElementById("direccion-2-input").value.trim(),
		notas: document.getElementById("additiona-note").value.trim(),
		metodoPago:
			document.querySelector('input[name="radio"]:checked')?.value || "",
	};

	// Validar que los campos obligatorios no estén vacíos
	if (
		!datos.nombres ||
		!datos.apellidos ||
		!datos.email ||
		!datos.celular ||
		!datos.direccion ||
		!datos.metodoPago
	) {
		alert("Por favor, completa todos los campos obligatorios.");
		return;
	}

	localStorage.setItem("formularioDatos", JSON.stringify(datos));
	window.location.href = "thankyou.html";
}

document
	.getElementById("formulario")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		guardarDatosFormulario();
	});
