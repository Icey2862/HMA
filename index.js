let productos = [];

let formulario;
let inputTipoReparacion;
let inputZonaReparacion;
let inputPiezas;
let inputNombreUsuario;
let limpiarRegistros
let tabla;

class Productos {
  constructor(tipo, zona, piezas, nombre) {
    this.tipo = tipo;
    this.zona = zona;
    this.piezas = piezas;
    this.nombre = nombre.toUpperCase();
  }
}

function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputTipoReparacion = document.getElementById("inputTipoReparacion");
  inputZonaReparacion = document.getElementById("inputZonaReparacion");
  inputPiezas = document.getElementById("inputPiezas");
  inputNombreUsuario = document.getElementById("inputNombreUsuario");
  limpiarRegistros = document.getElementById("limpiarRegistros")
  limpiarRegistros.onclick = eliminarLocal
  tabla = document.getElementById("tablaProductos");
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event);
}

function validarFormulario(event) {
  Swal.fire({
    icon: 'success',
    title: 'Modificacion cargada',
    text: 'La modificacion ha sido cargada con exito',
    showConfirmButton: false,
    color : '#FFFFFF',
    timer: '5500'
  })
  event.preventDefault();
  let tipoRep = inputTipoReparacion.value;
  let zonaRep = inputZonaReparacion.value;
  let piezasC = inputPiezas.value;
  let nombreU = inputNombreUsuario.value;
  let producto = new Productos(tipoRep, zonaRep, piezasC, nombreU);
  productos.push(producto);
  formulario.reset();

  limpiarTabla();
  agregarProductosTabla();
  almacenarProductosLocalStorage();
}

function agregarProductosTabla() {
  productos.forEach((producto) => {
    let filaTabla = document.createElement("tr");
    filaTabla.innerHTML = `
      <td>${producto.tipo}</td>
      <td>${producto.zona}</td>
      <td>${producto.piezas}</td>
      <td>${producto.nombre}</td>`;
    tabla.tBodies[0].append(filaTabla);
    
  });
}

function limpiarTabla() {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

function almacenarProductosLocalStorage() {
  localStorage.setItem("listaProductos", JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
  let productosAlmacenados = localStorage.getItem("listaProductos");
  if (productosAlmacenados !== null) {
    productos = JSON.parse(productosAlmacenados);
  }
}

function eliminarLocal(){
  Swal.fire({
    title: 'Estas seguro?',
    text: "No podras revertir estos cambios y al aceptar se recargara la pagina",
    icon: 'warning',
    color : '#FFFFFF',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'SI, ELIMINAR'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear()
      location.reload()
    }
  })
}

function main(){
  inicializarElementos();
  inicializarEventos();
  obtenerProductosLocalStorage();
  agregarProductosTabla();
}

main();
