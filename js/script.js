let totalProductos = 0;
let costoTotal = 0;
let carrito = {};

function actualizarCarrito() {
    document.getElementById('cuenta').textContent = totalProductos;
    document.getElementById('totalCosto').textContent = costoTotal.toFixed(2);
    actualizarDetalleCarrito();
}

function actualizarDetalleCarrito() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    for(let id in carrito) {
        let item = carrito[id];
        let listItem = document.createElement('li');

        let nombreElement = document.createElement('span');
        nombreElement.textContent = item.nombre;
        nombreElement.classList.add('producto-nombre');

        let precioElement = document.createElement('span');
        precioElement.textContent = '$' + item.precio.toFixed(2);
        precioElement.classList.add('producto-precio');

        let cantidadElement = document.createElement('span');
        cantidadElement.textContent = '*' + ' ' + item.cantidad;
        cantidadElement.classList.add('producto-cantidad');

        listItem.appendChild(nombreElement);
        listItem.appendChild(precioElement);
        listItem.appendChild(cantidadElement);

        cartItems.appendChild(listItem);
    }
}


let botones = document.querySelectorAll('.boton');

botones.forEach(button => {
button.addEventListener('click', function() {
// obtener datos del producto
let productoId = button.getAttribute('data-id');
let precioPorProducto = parseFloat(button.getAttribute('data-price'));
let nombreProducto = button.getAttribute('data-nombre');
// seleccionar el ansestro mas cercano
let bordeConteiner = button.closest('.conteiner');
//crear nuevo contenedor y elementos
let nuevoContBoton = document.createElement('div');
let botonSumar = document.createElement('button');
let botonResta = document.createElement('button');
let numero = document.createElement('span');

// asignar textos y estilos iniciales

botonSumar.textContent = '+';
botonResta.textContent = '-';
numero.textContent = '1';

//aniadir estilos css necesarios

botonSumar.classList.add('sumar');
botonResta.classList.add('restar');
numero.classList.add('contador');
nuevoContBoton.classList.add('nuevo-contenedor');

//agregar elementos al nuevo contenedor

nuevoContBoton.appendChild(botonResta);
nuevoContBoton.appendChild(numero);
nuevoContBoton.appendChild(botonSumar);

//ocultar el boton add to card actual
button.style.display = 'none';
//agregar el nuevo contenedor al DOM
button.parentNode.appendChild(nuevoContBoton);
//agregar clase para el borde cuando se hace click
bordeConteiner.classList.add('borde')

//agregar productos al carrito
carrito[productoId] = { nombre: nombreProducto, precio: precioPorProducto, cantidad: 1 }

//actualizar el conteo del carrito
totalProductos++;
costoTotal += precioPorProducto;
actualizarCarrito();

// eventos click para los botones + y - 

botonSumar.addEventListener('click', function() {
    let cantidad = parseInt(numero.textContent, 10);
    numero.textContent = cantidad + 1;
    totalProductos++;
    costoTotal += precioPorProducto;
    carrito[productoId].cantidad = cantidad + 1;
    actualizarCarrito();
})

botonResta.addEventListener('click', function() {
    let cantidad = parseInt(numero.textContent, 10);
    if(cantidad > 1) {
        numero.textContent = cantidad - 1;
        totalProductos--;
        costoTotal -= precioPorProducto;
        carrito[productoId].cantidad = cantidad - 1;
        actualizarCarrito();
    } else {
        nuevoContBoton.style.display = 'none';
        button.style.display = 'inline-block'
        bordeConteiner.classList.remove('borde');
        totalProductos--;
        costoTotal -= precioPorProducto;
        delete carrito[productoId];
        actualizarCarrito();
    }
  });
 });
});

