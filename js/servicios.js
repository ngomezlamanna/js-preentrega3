//array camisetas
const camisetas = [
    { imagen: "/img/boca2001.png", pais: "Argentina", equipo: "Boca Juniors", ano: 2000, precio: 70000 },
    { imagen: "/img/river2012.png", pais: "Argentina", equipo: "River Plate", ano: 2011, precio: 50000 },
    { imagen: "/img/indpte1995.png", pais: "Argentina", equipo: "Independiente", ano: 1976, precio: 65000 },
    { imagen: "/img/santos2013.png", pais: "Brasil", equipo: "Santos", ano: 2013, precio: 90000 },
    { imagen: "/img/flamengo2019.png", pais: "Brasil", equipo: "Flamengo", ano: 2019, precio: 45000 },
    { imagen: "/img/penarol1997.png", pais: "Uruguay", equipo: "Peñarol", ano: 1997, precio: 30000 },
    { imagen: "/img/colo2007.png", pais: "Chile", equipo: "Colo Colo", ano: 2001, precio: 20000 },
    { imagen: "/img/manu2009.png", pais: "Inglaterra", equipo: "Manchester United", ano: 2005, precio: 40000 },
    { imagen: "/img/chelsea2011.png", pais: "Inglaterra", equipo: "Chelsea", ano: 2014, precio: 60000 },
    { imagen: "/img/realm2019.png", pais: "España", equipo: "Real Madrid", ano: 2024, precio: 75000 }
];

const contCamisetas = document.querySelector("#contCamisetas"),
    contCarrito = document.querySelector(".contCarrito"),
    vaciarCarritoBtn = document.querySelector("#vaciarCarritoBtn"),
    comprarBtn = document.querySelector("#comprarBtn"),
    totPrecio = document.querySelector("#totalPrecio"),
    filtrar = document.querySelector("#buscador"),
    mensajeNoEncontrado = document.createElement("p"); // Crear elemento <p> para mensaje de país no encontrado (filrtar)

// array vacio del carrito
let carrito = [];

//CARRITO

// Función para guardar el carrito en localStorage (carrito)
function guardarCarritoEnLs() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Función para cargar el carrito desde localStorage (carrito)
function cargarCarritoDesdeLs() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}


// Función para agregar camiseta al carrito (Carrito)
function agregarAlCarrito(camiseta) {
    carrito.push(camiseta);
    actualizarCarrito();
    guardarCarritoEnLs();
}


// Evento para vaciar el carrito (carrito)
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLs();
});


// Evento para comprar camisetas (carrito)
comprarBtn.addEventListener("click", () => {
    if (carrito.length > 0) {
        // Mostrar mensaje de compra
        document.querySelector('#mensajeCompra').innerHTML = "<strong style='color: green'>¡Compra realizada!</strong>";
        // Limpiar el carrito
        carrito = [];
        actualizarCarrito();
        guardarCarritoEnLs();
    } else {
        document.querySelector('#mensajeCompra').innerHTML = "<strong style='color: red'>¡No hay camisetas en el carrito para comprar!</strong>";
    }
});


// Función para actualizar la visualización del carrito (Carrito)
function actualizarCarrito() {
    contCarrito.innerHTML = "";
    carrito.forEach(camiseta => {
        const div = document.createElement("div");
        div.classList.add("prodCarrito");
        div.innerHTML = `
            <div><p class="my-0">${camiseta.equipo}</p></div>
            <div><p class="my-0">$${camiseta.precio}</p></div>
        `;
        contCarrito.append(div);
    });

    // Calcular el total del carrito (carrito)
    const total = carrito.reduce((acc, camiseta) => acc + camiseta.precio, 0);
    totPrecio.textContent = `$${total}`;

    // Mostrar mensaje de carrito vacío si está vacío (carrito)
    if (carrito.length === 0) {
        contCarrito.innerHTML = '<strong class="carritoVacio">Carrito vacío</strong>';
    }
}


//PRODUCTOS


// Función para crear las camisetas dinámicamente (productos)
function bucleCamisetas(camisetasFiltradas) {
    contCamisetas.innerHTML = "";
    camisetasFiltradas.forEach(camiseta => {
        const div = document.createElement("div");
        div.classList.add("camiseta");
        div.innerHTML = `   
            <img class="imgProductos" src="${camiseta.imagen}" alt="camiseta de ${camiseta.equipo}">
            <div class="prodInfo py-2">
                <div class="prodTexto">
                    <p class="mb-0 fs-6">${camiseta.pais}</p>
                    <h3 class="mb-0 fs-6 fw-bold">${camiseta.equipo}</h3>
                </div>
                <div class="prodTexto pb-2">
                    <p class="mb-0">${camiseta.ano}</p>
                    <h3 class="mb-0 fw-bold">$${camiseta.precio}</h3>
                </div>
                <button class="agregarBtn"><i class="bi bi-cart-plus-fill"></i> Agregar</button>
            </div>
        `;
        contCamisetas.append(div);

        // Agregar evento de clic al botón de agregar
        div.querySelector(".agregarBtn").addEventListener("click", () => {
            agregarAlCarrito(camiseta);
        });
    });
}


//FILTKAR


// Función para limpiar el contenedor de camisetas (Filtrar) 
function limpiarContCamisetas() {
    contCamisetas.innerHTML = "";
}


// Función para filtrar las camisetas por país (filtrar)
function filtrarCamisetas(pais) {
    limpiarContCamisetas(); // Limpiar el contenedor antes de mostrar resultados

    const camisetasFiltradas = camisetas.filter(camiseta =>
        camiseta.pais.toLowerCase().includes(pais.toLowerCase())
    );
    if (camisetasFiltradas.length === 0) {
        mensajeNoEncontrado.innerHTML = "<strong class='sinPais'>No se venden camisetas de un pais con esa combinacion de letras.</strong>"; // Mostrar mensaje si no se encontraron camisetas
        contCamisetas.append(mensajeNoEncontrado);
    } else {
        mensajeNoEncontrado.textContent = ""; // Limpiar mensaje si se encontraron camisetas y filtar
        bucleCamisetas(camisetasFiltradas);
    }
}


// Evento para filtrar camisetas al enviar el formulario (filtrar)
filtrar.addEventListener("submit", (event) => {
    event.preventDefault();
    const pais = filtrar.querySelector("input[type='search']").value;
    filtrarCamisetas(pais);
});


//LLAMADO


// Cargar el carrito al recargar la página ()
cargarCarritoDesdeLs();

// Llamar a la función para crear las camisetas dinámicamente
bucleCamisetas(camisetas);