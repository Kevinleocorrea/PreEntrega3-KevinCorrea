let jugadores = [];

function crearJugador(nombre, edad, altura) {
    return {
        nombre: nombre,
        edad: edad,
        altura: altura
    };
}

function sumarNotasEntrenamiento(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

function agregarJugadorALaLista(jugador, resultado, estadoCitacion) {
    let lista = document.getElementById('listaJugadores');
    let li = document.createElement('li');
    li.textContent = `Nombre: ${jugador.nombre}, Edad: ${jugador.edad}, Altura: ${jugador.altura}, Resultado: ${resultado}, Estado: ${estadoCitacion}`;
    lista.appendChild(li);
}

document.getElementById('jugadorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombres').value;
    let edad = parseInt(document.getElementById('edad').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let nota1 = parseInt(document.getElementById('primeraNota').value);
    let nota2 = parseInt(document.getElementById('segundaNota').value);

    if (!nombre || isNaN(edad) || isNaN(altura) || isNaN(nota1) || isNaN(nota2) || nota1 < 1 || nota1 > 10 || nota2 < 1 || nota2 > 10) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    let jugador = crearJugador(nombre, edad, altura);
    let resultadoEntrenamiento = sumarNotasEntrenamiento(nota1, nota2);
    let estadoCitacion = resultadoEntrenamiento >= 8 ? 'Citado' : 'No Citado';

    if (resultadoEntrenamiento < 8) {
        Swal.fire({
            icon: 'error',
            title: 'No estas citado',
            text: `¡¡${jugador.nombre}, a seguir entrenando!!`,
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Felicitaciones!',
            text: `¡¡${jugador.nombre}, estás citado!! Nos vemos el domingo 19:15hrs`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    jugadores.push({ jugador, resultadoEntrenamiento, estadoCitacion });
    mostrarTodos();

    // Resetear el formulario
    document.getElementById('jugadorForm').reset();
});

function mostrarTodos() {
    let lista = document.getElementById('listaJugadores');
    lista.innerHTML = '';

    jugadores.forEach(({ jugador, resultadoEntrenamiento, estadoCitacion }) => {
        agregarJugadorALaLista(jugador, resultadoEntrenamiento, estadoCitacion);
    });
}

function ordenarPorNombre() {
    jugadores.sort((a, b) => a.jugador.nombre.localeCompare(b.jugador.nombre));
    mostrarTodos();
}

function ordenarPorEdad() {
    jugadores.sort((a, b) => a.jugador.edad - b.jugador.edad);
    mostrarTodos();
}

function ordenarPorAltura() {
    jugadores.sort((a, b) => a.jugador.altura - b.jugador.altura);
    mostrarTodos();
}

function filtrarPorEstado(estado) {
    let lista = document.getElementById('listaJugadores');
    lista.innerHTML = '';

    jugadores.filter(({ estadoCitacion }) => estadoCitacion === estado)
             .forEach(({ jugador, resultadoEntrenamiento, estadoCitacion }) => {
                 agregarJugadorALaLista(jugador, resultadoEntrenamiento, estadoCitacion);
             });
}
