const { application } = require("express")
const sectionVerMapa = document.getElementById('ver-mapa')
const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascota = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const mapa = document.getElementById('mapa')

let jugadorId = null
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesMokeponEnemigo 
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugador
let victoriasEnemigo = 0
let victoriasJugador = 0
let vidasJugador = 3
let vidasEnemigo = 3
//crea una variable para que sea el lienzo dentro del canvas
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.jpeg'
let mascotaJugadorObjeto
let fotoMapa = new Image()
fotoMapa.src = ''
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350
  if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
  }
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

//Esto es una clase y adentro se encuentran las propiedades que tendrá el objeto
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa){
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = [] //es un arreglo vacío, no lo escribimos arriba en el constructor porque es un dato que ingresa con el método push)
    this.ancho = 40
    this.alto = 40
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarMokepon(){
    lienzo.drawImage(
      this.mapaFoto,
      this.x, //posicion en x
      this.y, //posicion en y
      this.ancho, //ancho
      this.alto //alto
    )
  }
}

// objetos

let hipodoge = new Mokepon ('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodogeFace.png');
let capipepo = new Mokepon ('Capipepo', './assets/capipepo.png', 5, './assets/capipepoFace.png');
let ratigueya = new Mokepon ('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueyaFace.png');
let langostelvis = new Mokepon ('Langostelvis', './assets/langostelvis.png', 5, './assets/langostelvis.png');
let pydos = new Mokepon ('Pydos', './assets/pydos.png', 5, './assets/pydos.png');
let tucapalma = new Mokepon ('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png');

let hipodogeEnemigo = new Mokepon ('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodogeFace.png');
let capipepoEnemigo = new Mokepon ('Capipepo', './assets/capipepo.png', 5, './assets/capipepoFace.png');
let ratigueyaEnemigo = new Mokepon ('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueyaFace.png');
let langostelvisEnemigo = new Mokepon ('Langostelvis', './assets/langostelvis.png', 5, './assets/langostelvis.png');
let pydosEnemigo = new Mokepon ('Pydos', './assets/pydos.png', 5, './assets/pydos.png');
let tucapalmaEnemigo = new Mokepon ('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png');

// método push para ingresar los valores en el arreglo ataques del objeto hipodoge.
hipodoge.ataques.push (
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🌿', id: 'boton-tierra'}
)

capipepo.ataques.push (
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '🌿', id: 'boton-tierra'},
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'}
)

ratigueya.ataques.push (
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-tierra'}
)

langostelvis.ataques.push (
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-tierra'}
)

pydos.ataques.push (
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🌿', id: 'boton-tierra'}
)

tucapalma.ataques.push (
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '🌿', id: 'boton-tierra'},
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'}
)
hipodogeEnemigo.ataques.push (
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🌿', id: 'boton-tierra'}
)

capipepoEnemigo.ataques.push (
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '🌿', id: 'boton-tierra'},
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'}
)

ratigueyaEnemigo.ataques.push (
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-tierra'}
)

langostelvisEnemigo.ataques.push (
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🔥', id: 'boton-fuego'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-tierra'}
)

pydosEnemigo.ataques.push (
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'},
  { nombre: '🌿', id: 'boton-tierra'}
)

tucapalmaEnemigo.ataques.push (
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '🌿', id: 'boton-tierra'},
  { nombre: '🌿', id: 'boton-tierra'}, 
  { nombre: '💧', id: 'boton-agua'}, 
  { nombre: '🔥', id: 'boton-fuego'}
)

//agrega objetos al arreglo mokepones
mokepones.push (hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

//declaración de la función iniciarJuego
function iniciarJuego (){

  sectionReiniciar.style.display = 'none'
  sectionSeleccionarAtaque.style.display = 'none'
  sectionVerMapa.style.display = 'none'

  //recorre el arreglo mokepones por cada uno de los objetos
  mokepones.forEach((mokepon) => {
    // opcionDeMokepones es un pedazo de código html dinámico que se creará por cada objeto que exista en el arreglo
    opcionDeMokepones = `
      <input type="radio" name="mascota" id="${mokepon.nombre}"/>
      <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt="${mokepon.nombre}">
      </label>
    `
    //Ingresa el html dinámico en el div vacío 
    contenedorTarjetas.innerHTML += opcionDeMokepones //poner el + previo al igual (+=) para que aparezcan todos los objetos (mokepones)

      inputHipodoge = document.getElementById('Hipodoge')
      inputCapipepo = document.getElementById('Capipepo')
      inputRatigueya = document.getElementById('Ratigueya')
      inputLangostelvis = document.getElementById('Langostelvis')
      inputPydos = document.getElementById('Pydos')
      inputTucapalma = document.getElementById('Tucapalma')
  })

  botonMascota.addEventListener('click', seleccionarMascota)
  botonReiniciar.addEventListener('click', reiniciarJuego)

  unirseAlJuego()
}

function unirseAlJuego() {
  
  fetch("http://localhost:8080/unirse")
    .then(function(res){
      if (res.ok) {
        res.text()
          .then(function(respuesta){
            console.log(respuesta)
            jugadorId = respuesta
          })
      }
    })

}

function seleccionarMascota (){
  
  sectionSeleccionarMascota.style.display = 'none'

  if(inputHipodoge.checked){
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaJugador = inputHipodoge.id
  } else if (inputCapipepo.checked){
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaJugador = inputCapipepo.id
  } else if (inputRatigueya.checked){
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaJugador = inputRatigueya.id
  } else if (inputLangostelvis.checked){
    spanMascotaJugador.innerHTML = inputLangostelvis.id
    mascotaJugador = inputLangostelvis.id
  } else if (inputPydos.checked){
    spanMascotaJugador.innerHTML = inputPydos.id
    mascotaJugador = inputPydos.id
  } else if (inputTucapalma.checked){
    spanMascotaJugador.innerHTML = inputTucapalma.id
    mascotaJugador = inputTucapalma.id
  } else {
    alert("Selecciona un mokepón")
  }

  seleccionarMokepon(mascotaJugador) //esto envía los datos al backend
  extraerAtaques(mascotaJugador)
  sectionVerMapa.style.display = 'flex'
  iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
  fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })
}

function extraerAtaques(mascotaJugador){
  let ataques 
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques
    }
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id="${ataque.id}" class="boton-de-ataque Bataque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += ataquesMokepon
  })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.Bataque')
    //console.log(botones)
}

function secuenciaAtaque (){
  botones.forEach((boton) => {
    boton.addEventListener('click',(e) => {
      if (e.target.textContent === '🔥'){
        ataqueJugador.push('FUEGO')
        console.log(ataqueJugador)
        boton.style.background = '#112f58'
        boton.disabled = true
      } else if (e.target.textContent === '💧'){
        ataqueJugador.push('AGUA')
        console.log(ataqueJugador)
        boton.style.background = '#112f58'
        boton.disabled = true
      } else {
        ataqueJugador.push('TIERRA')
        console.log(ataqueJugador)
        boton.style.background = '#112f58'
        boton.disabled = true
      }
      ataqueAleatorioEnemigo()
    })
  })
}

function seleccionarMascotaEnemigo(enemigo){
  
  //let mascotaAleatoria = aleatorio(0, mokepones.length -1)
  spanMascotaEnemigo.innerHTML = enemigo.nombre
  ataquesMokeponEnemigo = enemigo.ataques
  secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
  console.log('el ataque del enemigo es: '+ ataquesMokeponEnemigo)
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
  //console.log(ataqueAleatorio)
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
    ataqueEnemigo.push('FUEGO')
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
    ataqueEnemigo.push('AGUA')
  } else {
    ataqueEnemigo.push('TIERRA')
  }
  console.log(ataqueEnemigo);
  iniciarCombate()
}

function iniciarCombate(){
  if (ataqueJugador.length === 5) {
    combateResultado()
  }
}

function indexAmbosOponentes (jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


function combateResultado(){

  for (let i = 0; i < ataqueJugador.length; i++) {
    if(ataqueJugador[i] === ataqueEnemigo[i]){
      indexAmbosOponentes(i,i)
      crearMensaje("EMPATE")
    } else if (ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] == 'TIERRA'){
      indexAmbosOponentes(i,i)
      crearMensaje("GANASTE")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] == 'FUEGO'){
      indexAmbosOponentes(i,i)
      crearMensaje("GANASTE")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] == 'AGUA'){
      indexAmbosOponentes(i,i)
      crearMensaje("GANASTE")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {
      indexAmbosOponentes(i,i)
      crearMensaje("PERDISTE")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
    revisarVictorias()
  }
}

function revisarVictorias(){

  if(victoriasJugador === victoriasEnemigo){
    crearMensajeFinal('Esto es un EMPATE')
  } else if (victoriasJugador > victoriasEnemigo){
    crearMensajeFinal('GANASTE')
  } else {
    crearMensajeFinal('PERDISTE')
  }
}



function crearMensaje(resultado){
  
  let nuevoAtaqueJugador = document.createElement('p')
  let nuevoAtaqueEnemigo = document.createElement('p')

  sectionMensajes.innerHTML = resultado
  nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
  
  ataqueDelJugador.appendChild(nuevoAtaqueJugador)
  ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}



function crearMensajeFinal(resultadoFinal){
  
  sectionMensajes.innerHTML = resultadoFinal
  
  reiniciar.style.display = 'block'

}



function reiniciarJuego(){
  location.reload()
}

function aleatorio(min, max) {
  return Math.floor (Math.random ()*(max - min +1) + min);
}

function pintarCanvas(){

  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

  lienzo.clearRect(0,0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )

  mascotaJugadorObjeto.pintarMokepon()

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

  hipodogeEnemigo.pintarMokepon()
  capipepoEnemigo.pintarMokepon()
  ratigueyaEnemigo.pintarMokepon()
  langostelvisEnemigo.pintarMokepon()
  pydosEnemigo.pintarMokepon()
  tucapalmaEnemigo.pintarMokepon()
  
  if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){

    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
    revisarColision(langostelvisEnemigo)
    revisarColision(pydosEnemigo)
    revisarColision(tucapalmaEnemigo)
    
  }
}

function enviarPosicion(x,y){
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
}

function moverArriba(){
  mascotaJugadorObjeto.velocidadY = -5
}

function moverDerecha(){
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
  mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
  mascotaJugadorObjeto.velocidadY = +5
}

function detenerMovimiento(){
  mascotaJugadorObjeto.velocidadX = 0
  mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      moverArriba()
      break

    case 'ArrowDown':
    case 's':
      moverAbajo()
      break

    case 'ArrowLeft':
    case 'a':
      moverIzquierda()
      break
  
    case 'ArrowRight':
    case 'd':
      moverDerecha()
      break
  
    default:
      break
  }
}

function iniciarMapa(){

  mascotaJugadorObjeto = ObtenerObjetoMascota(mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50) //la función setInterval ejecuta la función pintarPersonaje cada 50 miliseg.
  window.addEventListener('keydown', sePresionoUnaTecla)
  window.addEventListener('keyup', detenerMovimiento)

}

function ObtenerObjetoMascota(){

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i]
    }
  }

}

function revisarColision(enemigo){
  
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x
  
  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = mascotaJugadorObjeto.x
  
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return
  }

  detenerMovimiento()
  clearInterval(intervalo)
  sectionSeleccionarAtaque.style.display = 'flex'
  sectionVerMapa.style.display = 'none'
  seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego) 


// 
