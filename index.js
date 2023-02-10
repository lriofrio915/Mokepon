const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json()) //permite habilitar la recepción de peticiones post que traigan contenido en formato json

const jugadores = []

class Jugador {
  constructor(id) {
    this.id = id
  }
  asignarMokepon(mokepon) {
    this.mokepon = mokepon
  }

  actualizarPosicion(posicion) {
    this.x = x
    this.y = y
  }

}

class Mokepon {
  constructor(nombre){
    this.nombre = nombre
  }
}

//This is my firts endpoint 
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`
  //to create the player
  const jugador = new Jugador(id)
  //to add players to Jugadores array
  jugadores.push(jugador)

  res.setHeader("Access-Control-Allow-Origin", "*")

  res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {

  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }

  console.log(jugadores)
  console.log(jugadorId)
  res.end()
})

//este endpoint sirve para recibir del Front (del body) las coordenas x,y del mokepon en el mapa.
app.post("/mokepon/:jugadorId/posicion", (req,res) =>{
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x,y)
  }

  res.end()

})


app.listen(8080, () => {
  console.log('servidor funcionando')
})