const cartas = data.events
const $main = document.getElementById('cardPastEvents')

const params =  new URLSearchParams(location.search)
const id = params.get("id")

let carta = cartas.find(element => element._id === id)

function crearCarta(elemento) {
    return ` <div class="d-flex justify-content-center align-items-center pt-1">
    <div class="card mb-3" style="max-width: 640px;">
      <div class="row g-0 ">
        <div class="col-md-4">
          <img src="${elemento.image}" class="img-fluid rounded-start h-100" alt="Imagen de ${elemento.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Name: ${elemento.name}</h5>
            <h5 class="card-text">Date: ${elemento.date}</h5>
            <h5 class="card-text">Description:${elemento.description}.</h5>
            <h5 class="card-text">Category:${elemento.category}</h5>
            <h5 class="card-text">Place: ${elemento.place}</h5>
            <h5 class="card-text">Capacity: ${elemento.capacity}</h5>
            <h5 class="card-text">${elemento.assistance ?'Assistance: '+ elemento.assistance: 'Estimate: '+elemento.estimate}</h5>
            <h5 class="card-text">Price: $${elemento.price}</h5>
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
ponerCartas (carta,$main)