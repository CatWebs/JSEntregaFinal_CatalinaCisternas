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
    //________________________________________________________________________________________________________________________________________  OPERADOR OR
    inicializador = JSON.parse(localStorage.getItem("inicializador")) || true;
    volverAComprar = JSON.parse(localStorage.getItem("volverAComprar")) || true;
    datosJugador = JSON.parse(localStorage.getItem("datosJugador")) || {cajaRegistradora: 3000, slurmVendida: 0, deudaInversion: 500000};
    ventaRonda = JSON.parse(localStorage.getItem("ventaRonda")) || {ventaTotalRonda: 0, slurmTotalRonda: 0};
    ronda = JSON.parse(localStorage.getItem("ronda")) || 1;
    trabajadoresAdquiridos = JSON.parse(localStorage.getItem("trabajadoresAdquiridos")) || [];
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
        variablesIniciales();
        interfaz.className = "interfaz";
        interfazInicial();
        actualizarDatos();
    }else{
        avisos.innerText = `Ha ocurrido un problema. Ya has iniciado. Si quieres volver a empezar presiona "Reiniciar Juego"`;
    }
    inicializador = false;
    localStorage.setItem("inicializador", JSON.stringify(inicializador));
}

function abrirTienda() {
    textoBoton3.innerText = "Volver";
    boton2.className += " noMostrar";
    boton1.className += " noMostrar";
    let noTienesTrabajadores = "Avisos: No tienes trabajadores. Te recomiendo comprar, de lo contrario no tendras ventas en esta ronda";
    let eligeTrabajador = "Elige el trabajador que desees comprar. Sino, puedes volver";
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    trabajadoresAdquiridos.length == 0 ? avisos.innerText = noTienesTrabajadores : avisos.innerText = eligeTrabajador ;
    boton3.onclick = interfazInicial;
    if (volverAComprar){
        mostrarTrabajadores();
        volverAComprar = false;
        localStorage.setItem("volverAComprar", JSON.stringify(volverAComprar));
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
        localStorage.setItem("juegoEnEjecucion", JSON.stringify(juegoEnEjecucion));
        boton2.className += " noMostrar";
        let noHicisteDinero = "No generaste dinero en esta ronda. No tienes trabajadores";
        let pasaASiguienteRonda = "Las estadísticas de esta ronda las verás a continuación. Ya puedes pasar a la siguiente ronda";
        //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
        trabajadoresAdquiridos.length == 0 ? avisos.innerText = noHicisteDinero : avisos.innerText = pasaASiguienteRonda;

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
    localStorage.setItem("volverAComprar", JSON.stringify(volverAComprar));
    venderSlurm();
    actualizarDatos();
};

function reiniciar(){
    localStorage.clear();
    inicializador = true;
    localStorage.setItem("inicializador", JSON.stringify(inicializador));
    iniciar()
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
        // Inclusión de Toastify
        Toastify({
            text: `Ahora ${nuevoAdquirido.nombre} es parte de tu equipo`,
            duration: 3000,
            gravity: "bottom", 
            position: "right",
        }).showToast();
        crearCardAdquirido()
    }else{
        avisos.innerText = `No te alcanza para este jugador, prueba con otro`;
        mostrarTrabajadores();
    }
}

function finalizar(){
    boton1.className += " noMostrar";
    boton2.className += " noMostrar";
    boton3.className += " noMostrar";
    ventaTotal = parseInt(datosJugador.cajaRegistradora - datosJugador.deudaInversion);
    let mensajeFinalPerdiste = `${nombreJugador.value}, lamento informarte que has perdido. Más suerte la próxima vez\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto tu saldo negativo es de $${ventaTotal}`;
    let mensajeFinalEmpataste = `${nombreJugador.value} Has perdido! No generaste dinero.\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto quedaste con $${ventaTotal}`; 
    let mensajeFinalGanaste = `FELICIDADES! ${nombreJugador.value} eres el ganador. Ahora puedes llevarte una Robotzuela y 2 barriles de Slurm!\nReuniste $${datosJugador.cajaRegistradora} pero le debes $500.000 al juego, por lo tanto tu ganancia es de $${ventaTotal}`;
    //________________________________________________________________________________________________________________________________________  OPERADOR TERNARIO
    ventaTotal < 0 ? avisos.innerText = mensajeFinalPerdiste : ventaTotal == 0 ? avisos.innerText = mensajeFinalEmpataste : avisos.innerText = mensajeFinalGanaste;
    ventaTotal < 0 ? alertPerdedor() : ventaTotal == 0 ? alertEmpate() : alertGanaste();
    localStorage.clear(); 
    inicializador = true;
    localStorage.setItem("inicializador", JSON.stringify(inicializador));
};

function alertPerdedor(){
    Swal.fire({
        title: 'Perdiste!',
        text: 'Tendrás problemas con la mafia Robot',
        imageUrl: './media/Robot-Mafia.jpg',
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: 'Mafia Robot de Futurama',
    })
};

function alertEmpate(){
    Swal.fire({
        title: 'Empataste!',
        text: 'Bender no volverá a hacer negocios contigo',
        imageUrl: './media/202_bender-gun.gif.jpg',
        imageWidth: 400,
        imageHeight: 298,
        imageAlt: 'Bender de Futurama enojado',
    })
};

function alertGanaste(){
    Swal.fire({
        title: 'Has Ganado!',
        text: 'Aquí estan las Robotzuelas!',
        imageUrl: './media/robotzuela.jpg',
        imageWidth: 400,
        imageHeight: 305,
        imageAlt: 'Bender de Futurama con unas Robotzuelas',
    })
};

