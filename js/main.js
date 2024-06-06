//  CONOCIENDO AL JUGADOR
const nombreJugador = document.getElementById("nombreJugador");
nombreJugador.value = "Jugador";

const botonGuardar = document.getElementById("guardarNombreJugador");
botonGuardar.addEventListener("click", guardarNombre);

function guardarNombre () {
    if (nombreJugador.value == ""){
        nombreJugador.value = "Jugador";
    } else {
        nombreJugador.value = nombreJugador.value;
    }
};
















