//  CONOCIENDO AL JUGADOR
const nombreJugador = document.getElementById("nombreJugador");
nombreJugador.value = "Jugador";

const botonGuardar = document.getElementById("guardarNombreJugador");
botonGuardar.addEventListener("click", guardarNombre);

//________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
// function guardarNombre () {
//     if (nombreJugador.value == ""){
//         nombreJugador.value = "Jugador";
//     } else {
//         nombreJugador.value = nombreJugador.value;
//     }
// };
function guardarNombre(){
    nombreJugador.value == "" ? nombreJugador.value = "Jugador" : nombreJugador.value = nombreJugador.value;
}

















