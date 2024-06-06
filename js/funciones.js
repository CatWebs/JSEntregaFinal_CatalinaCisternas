const trabajadoresContainer = document.getElementById("trabajadores");
const misTrabajadoresContainer = document.getElementById("misTrabajadores");
const tituloMisTrabajadores = document.getElementById("tituloMisTrabajadores");

function crearCardAdquirido(){
    if (trabajadoresAdquiridos.length == 0){
        misTrabajadoresContainer.innerHTML = "";
        tituloMisTrabajadores.innerText = ""; 
    }else{
        misTrabajadoresContainer.innerHTML = "";
        tituloMisTrabajadores.innerText = "Trabajadores Adquiridos";    
        trabajadoresAdquiridos.forEach(el =>{
            const card = document.createElement("div");
            card.className = "cardAdquiridos";
            const srcComponente = el.id;

            const imagen = document.createElement("img");
            imagen.src = `./media/${srcComponente}.png`;

            const slurm = document.createElement("p");
            slurm.className = `slurm${srcComponente}`;
            slurm.innerText = `Slurm Vendida: ${el.cantidadRonda} unidades`;
            
            const dinero = document.createElement("p");
            dinero.className = `dinero${srcComponente}`;
            dinero.innerText = `Dinero generado esta ronda: $${el.ventaRonda}`;

            card.appendChild(imagen);
            card.appendChild(slurm);
            card.appendChild(dinero);
            
            misTrabajadoresContainer.appendChild(card);
        });
    }
};

// Con esta función muestro las Card donde presento a los trabajadores disponibles.
function mostrarTrabajadores() {
    trabajadoresContainer.innerHTML = "";
    trabajadoresDisponibles.forEach(el => {
        const card = document.createElement("div");
        card.className = "card trabajador";
        card.className += ` trabajador${el.id}`;
    
        const titulo = document.createElement("p");
        titulo.className = "card-title";
        titulo.innerText = `Trabajador ${el.id}`;
        titulo.className += ` titulo${el.id}`;
    
        const nombres = document.createElement("p");
        nombres.className = "nombre card-subtitle";
        nombres.innerText = el.nombre;
    
        const precio = document.createElement("p");
        precio.innerText = `Precio: $${el.precio}`;
    
        const bonus = document.createElement("p");
        bonus.innerText = `Bonus: ${el.porcentaje}`;
    
        const imagen = document.createElement("img");
        imagen.src = el.imagen;
        imagen.alt = `imagen de ${el.nombre}`;
        imagen.className = "card-img-bottom";
    
        const comprar = document.createElement("button");
        comprar.className = `boton${el.id} btn comprar-boton`;
        comprar.innerText = "Comprar";
        
        const identificador = el.id;
        if (trabajadoresAdquiridos.some(el => el.id === identificador)){
            comprar.className = "btn no-disponible";
            comprar.innerText = "Ya lo tienes";
        } else{
            comprar.className = "btn comprar-boton";
            comprar.onclick = () => comprarTrabajador(el.id);
        }
        card.appendChild(titulo);
        card.appendChild(nombres);
        card.appendChild(precio);
        card.appendChild(bonus);
        card.appendChild(imagen);
        card.appendChild(comprar);
        trabajadoresContainer.appendChild(card);
    });
}


let ronda;
let datosJugador;
let trabajadoresAdquiridos;
let inicializador;
let volverAComprar;
let ventaTotal;
let ventaRonda = {};


function variablesIniciales() {
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    // Bool inicializador
    // if (localStorage.getItem("inicializador")){
    //     inicializador = JSON.parse(localStorage.getItem("inicializador"));
    // }else{
    //     inicializador = true;
    // }
    localStorage.getItem("inicializador") ? inicializador = JSON.parse(localStorage.getItem("inicializador")) : inicializador = true;

    // Bool para volver a comprar
    // if (localStorage.getItem("volverAComprar")){
    //     volverAComprar = JSON.parse(localStorage.getItem("volverAComprar"));
    // }else{
    //     volverAComprar = true;
    // }
    localStorage.getItem("volverAComprar") ? volverAComprar = JSON.parse(localStorage.getItem("volverAComprar")) : volverAComprar = true;


    // Para los datos del jugador
    // if (localStorage.getItem("datosJugador")){
    //     datosJugador = JSON.parse(localStorage.getItem("datosJugador"));
    // }else{
    //     datosJugador = {
    //         cajaRegistradora: 3000,
    //         slurmVendida: 0,
    //         deudaInversion: 500000
    //     };
    // }
    localStorage.getItem("datosJugador") ? datosJugador = JSON.parse(localStorage.getItem("datosJugador")) : datosJugador = {cajaRegistradora: 3000, slurmVendida: 0, deudaInversion: 500000};

    // Para los datos de venta de Ronda
    // if (localStorage.getItem("ventaRonda")){
    //     ventaRonda = JSON.parse(localStorage.getItem("ventaRonda"));
    // }else{
    //     ventaRonda = {
    //         ventaTotalRonda: 0,
    //         slurmTotalRonda: 0,
    //     };
    // }
    localStorage.getItem("ventaRonda") ? ventaRonda = JSON.parse(localStorage.getItem("ventaRonda")) : ventaRonda = {ventaTotalRonda: 0, slurmTotalRonda: 0};

    // Para las rondas
    // if (localStorage.getItem("ronda")){
    //     ronda = JSON.parse(localStorage.getItem("ronda"));
    // }else{
    //     ronda = 1;
    // }
    localStorage.getItem("ronda") ? ronda = JSON.parse(localStorage.getItem("ronda")) : ronda = 1;

    // Para los trabajadores Adquiridos
    // if (localStorage.getItem("trabajadoresAdquiridos")){
    //     trabajadoresAdquiridos = JSON.parse(localStorage.getItem("trabajadoresAdquiridos"));
    // }else{
    //     trabajadoresAdquiridos = [];
    // }
    localStorage.getItem("trabajadoresAdquiridos") ? trabajadoresAdquiridos = JSON.parse(localStorage.getItem("trabajadoresAdquiridos")) : trabajadoresAdquiridos = [];
};

const iniciarJuego = document.getElementById("iniciarJuego");
iniciarJuego.onclick = iniciar;
const reiniciarJuego = document.getElementById("reiniciarJuego");
reiniciarJuego.onclick = reiniciar;
const interfaz = document.getElementById("interfaz");
const avisos = document.getElementById("avisos");

const boton1 = document.getElementById("boton1");
const textoBoton1 = document.getElementById("textoBoton1");
const boton2 = document.getElementById("boton2");
const textoBoton2 = document.getElementById("textoBoton2");
const boton3 = document.getElementById("boton3");
const textoBoton3 = document.getElementById("textoBoton3");

const rondaActual = document.getElementById("rondaActual");
const rondaHTML = document.getElementById("ronda");
const cajaRegistradoraHTML = document.getElementById("cajaRegistradora");
const cantidadVendidaHTML = document.getElementById("cantidadVendida");
const deudaHTML = document.getElementById("deuda");

iniciarJuego.onclick = iniciar;
reiniciarJuego.onclick = reiniciar;

function actualizarDatos(){
    rondaActual.innerText = ronda-1;
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    // if (ronda == 11){
    //     rondaHTML.innerText = "Fin";
    // }else{
    //     rondaHTML.innerText = ronda;
    // }
    ronda == 11 ? rondaHTML.innerText = "Fin" : rondaHTML.innerText = ronda;
    cajaRegistradoraHTML.innerText = datosJugador.cajaRegistradora;
    cantidadVendidaHTML.innerText = datosJugador.slurmVendida;
    deudaHTML.innerText = datosJugador.deudaInversion;
}

function interfazInicial(){
    boton1.className = "boton1 botonSecundario";
    boton2.className = "boton2 botonSecundario";
    boton3.className = "boton3 botonSecundario";
    textoBoton1.innerText = "Comprar trabajador";
    textoBoton2.innerText = "Iniciar Ronda";
    textoBoton3.innerText = "Finalizar Juego";
    avisos.innerText = "Has iniciado el juego de azar";
    trabajadoresContainer.innerHTML = "";
    misTrabajadoresContainer.innerHTML = "";
    boton1.onclick = abrirTienda;
    boton2.onclick = iniciarRonda;
    boton3.onclick = finalizar;
    crearCardAdquirido();
};

function iniciar(){
    variablesIniciales();
    if (inicializador){
        inicializador = false;
        variablesIniciales();
        interfaz.className = "interfaz";
        interfazInicial();
        actualizarDatos();
    }else{
        avisos.innerText = `Ha ocurrido un problema. Ya has iniciado. Si quieres volver a empezar presiona "Reiniciar Juego"`;
    }
}

function abrirTienda() {
    textoBoton3.innerText = "Volver";
    boton2.className += " noMostrar";
    boton1.className += " noMostrar";
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    // if (trabajadoresAdquiridos.length == 0){
    //     avisos.innerText = "Avisos: No tienes trabajadores. Te recomiendo comprar, de lo contrario no tendras ventas en esta ronda";
    // }else{
    //     avisos.innerText = "Elige el trabajador que desees comprar. Sino, puedes volver";
    // }
    trabajadoresAdquiridos.length == 0 ? avisos.innerText = "Avisos: No tienes trabajadores. Te recomiendo comprar, de lo contrario no tendras ventas en esta ronda" : avisos.innerText = "Elige el trabajador que desees comprar. Sino, puedes volver";
    boton3.onclick = interfazInicial;
    if (volverAComprar){
        mostrarTrabajadores();
        volverAComprar = false;
    }else{
        avisos.innerText = "Lo siento, ya compraste en esta ronda. Puedes probar en la siguiente";
    }
    
};

function venderSlurm(){
    // Creo una card con los datos actualizados de venta de cada trabajador que tengo
    trabajadoresAdquiridos.forEach(el => {
        el.cantidadRonda = 0;
        el.ventaRonda = 0;
        el.cantidadRonda = parseInt(((Math.random()*10)+1) * el.productividad);
        el.ventaRonda = (el.cantidadRonda * 5000);
        crearCardAdquirido();
    });
    // Se genera la venta en dinero
    const dineroGeneradoPorTrabajador = trabajadoresAdquiridos.map((el) => el.ventaRonda);
    const totalDineroPorTrabajadores = dineroGeneradoPorTrabajador.reduce((acumulador,elemento) => acumulador + elemento, 0);

    console.log(dineroGeneradoPorTrabajador);
    console.log(totalDineroPorTrabajadores);
    
    const cantidadGeneradaPorTrabajador = trabajadoresAdquiridos.map((el) => el.cantidadRonda);
    const totalCantidadPorTrabajadores = cantidadGeneradaPorTrabajador.reduce((acumulador,elemento) => acumulador + elemento, 0);

    ventaRonda.slurmTotalRonda = totalCantidadPorTrabajadores;
    ventaRonda.ventaTotalRonda = totalDineroPorTrabajadores;

    datosJugador.cajaRegistradora += ventaRonda.ventaTotalRonda;
    datosJugador.slurmVendida += ventaRonda.slurmTotalRonda;

    localStorage.setItem("datosJugador", JSON.stringify(datosJugador));
}


function iniciarRonda(){
    if (ronda <= 10){
        boton1.onclick = interfazInicial;
        crearCardAdquirido();
        juegoEnEjecucion = true;
        boton2.className += " noMostrar";
        //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
        // if (trabajadoresAdquiridos.length == 0){
        //     avisos.innerText = "No generaste dinero en esta ronda. No tienes trabajadores";
        // }else{
        //     avisos.innerText = "Las estadísticas de esta ronda las verás a continuación. Ya puedes pasar a la siguiente ronda";
        // }
        trabajadoresAdquiridos.length == 0 ? avisos.innerText = "No generaste dinero en esta ronda. No tienes trabajadores" : avisos.innerText = "Las estadísticas de esta ronda las verás a continuación. Ya puedes pasar a la siguiente ronda";

        if (ronda ==10){
            volverAComprar = false;
            boton1.className += " noMostrar";
            ronda = 11;
        }else{
            textoBoton1.innerText = "Siguiente Ronda";
            ronda ++;
            volverAComprar = true;
        }
    }else{
        rondaHTML.innerText = "Fin";
        boton1.className += " noMostrar";
        boton2.className += " noMostrar";
        avisos.innerText = "Has terminado la última ronda. Ve a finalizar para ver tus resultados "
    }
    localStorage.setItem("ronda", JSON.stringify(ronda));
    venderSlurm();
    actualizarDatos();
    console.log(ronda);
};

function reiniciar(){
    inicializador = true;
    localStorage.clear(); 
    iniciar()
};


function finalizar(){
    boton1.className += " noMostrar";
    boton2.className += " noMostrar";
    boton3.className += " noMostrar";
    ventaTotal = parseInt(datosJugador.cajaRegistradora - datosJugador.deudaInversion);
    let mensajeFinalPerdiste = `${nombreJugador.value}, lamento informarte que has perdido. Más suerte la próxima vez\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto tu saldo negativo es de $${ventaTotal}`;
    let mensajeFinalEmpataste = `${nombreJugador.value} Has perdido! No generaste dinero.\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto quedaste con $${ventaTotal}`; 
    let mensajeFinalGanaste = `FELICIDADES! ${nombreJugador.value} eres el ganador. Ahora puedes llevarte una Robotzuela y 2 barriles de Slurm!\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto tu ganancia es de $${ventaTotal}`;
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    // if (ventaTotal < 0) {
    //     avisos.innerText = mensajeFinalPerdiste;
    // } else if (ventaTotal == 0) {
    //     avisos.innerText = mensajeFinalEmpataste;
    // } else {
    //     avisos.innerText = mensajeFinalGanaste;
    // }
    ventaTotal < 0 ? avisos.innerText = mensajeFinalPerdiste : ventaTotal == 0 ? avisos.innerText = mensajeFinalEmpataste : avisos.innerText = mensajeFinalGanaste;
    localStorage.clear(); 
};

function comprarTrabajador(id){
    if (trabajadoresDisponibles[id-1].precio <= datosJugador.cajaRegistradora){
        trabajadoresAdquiridos.push(trabajadoresDisponibles[id -1]);

        localStorage.setItem("trabajadoresAdquiridos", JSON.stringify(trabajadoresAdquiridos));

        trabajadoresContainer.innerHTML = "";
        const nuevoAdquirido = trabajadoresAdquiridos.find(el => el.id === id);
        const precio = nuevoAdquirido.precio;
        datosJugador.cajaRegistradora -= precio;
        localStorage.setItem("datosJugador", JSON.stringify(datosJugador));
        actualizarDatos();
        avisos.innerText = `Has comprado a ${nuevoAdquirido.nombre}`;
        crearCardAdquirido()
    }else{
        avisos.innerText = `No te alcanza para este jugador, prueba con otro`;
        mostrarTrabajadores();
    }
}


