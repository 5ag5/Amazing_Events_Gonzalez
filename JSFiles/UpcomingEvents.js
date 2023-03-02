const $main = document.getElementById('contenedorCartas')
const datosCards = data.events;

function agregarElementos(datosCards, evento){
    let template = '';
     for(let elemento of datosCards){
        template += crearElemento(elemento);
     }
     evento.innerHTML = template;
}

function crearElemento(evento){
 return `
<div class="card p-3 m-3" style="width: 18rem;">
  <img src="${evento.image}" class="card-img-top" Style="height: 25vh" alt="...">
  <div class="card-body d-flex justify-content-between flex-column">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <div class="d-flex justify-content-between align-items-center">
        <p>Price: ${evento.price} $</p>
        <a href="./details.html" class="btn btn-primary">Buy Tickets</a>
    </div>
  </div>
</div>
    `
}

function filtrarEventos(lista){
  let arregloFiltrado = []
  for( let elemento of lista ){
      if(elemento.date > data.currentDate){
        arregloFiltrado.push(elemento)
      }
  }
  return arregloFiltrado
}

const eventosFiltrados = filtrarEventos(datosCards)

agregarElementos(eventosFiltrados, $main)