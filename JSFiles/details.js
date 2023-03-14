const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const $main = document.getElementById('cardPastEvents')

fetch(url)
          .then(respuesta => {
          return respuesta.json()
          })
          .then(elemento => {
          const cartas = elemento.events
          
          const params =  new URLSearchParams(location.search)
          const id = params.get("id")
          
          let carta = cartas.find(element => element._id == id)
          
          ponerCartas (carta,$main)

          })

function crearCarta(elemento) {
    return ` <div class="d-flex justify-content-center align-items-center pt-1">
    <div class="card mb-3" style="max-width: 640px;">
      <div class="row g-0 ">
        <div class="col-md-4">
          <img src="${elemento.image}" class="img-fluid rounded-start h-100" alt="Imagen de ${elemento.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">Name: ${elemento.name}</h6>
            <h6 class="card-text">Date: ${elemento.date}</h6>
            <h6 class="card-text">Description:${elemento.description}.</h6>
            <h6 class="card-text">Category:${elemento.category}</h6>
            <h6 class="card-text">Place: ${elemento.place}</h6>
            <h6 class="card-text">Capacity: ${elemento.capacity}</h6>
            <h6 class="card-text">${elemento.assistance ?'Assistance: '+ elemento.assistance: 'Estimate: '+elemento.estimate}</h6>
            <h6 class="card-text">Price: $${elemento.price}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

function ponerCartas( objeto, element){
    let template = ''
    template += crearCarta(objeto)
    element.innerHTML = template
} 