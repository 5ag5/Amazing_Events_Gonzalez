const $main = document.getElementById('contenedorCartas')
const datosCards = data.events;
const $contenedorChecks = document.getElementById('checksID3') 
const $botonBarraSearch = document.getElementById('botonBuscarTxt2')

function agregarElementos(datosCards, card){
  let template = '';
  if(datosCards.length === 0){
    card.innerHTML = NoCoincidenciaMensaje()
  } else{
   for(let elemento of datosCards){
      template += crearElemento(elemento);
   }
   card.innerHTML = template;
}
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
      if(elemento.date < data.currentDate){
        arregloFiltrado.push(elemento)
      }
  }
  return arregloFiltrado
}

const listaEventos = datosCards.filter(evento => evento.category)
                              .map(evento => evento.category)

const categoriaFiltrada = Array.from( new Set(listaEventos))

const checkBoxEventos = categoriaFiltrada.reduce( (acumulador, categoria, indice) => {
  return acumulador += `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="${categoria}" id="flexCheck${indice}">
  <label class="form-check-label" for="flexCheck${indice}">
    ${categoria}
  </label>
</div>`
},'')

$contenedorChecks.innerHTML += checkBoxEventos

$contenedorChecks.addEventListener('change', e =>{
  agregarElementos(filtroCheckBox(datosCards), $main)
})

$botonBarraSearch.addEventListener('click', e =>{
  agregarElementos(filtroTexto(filtroCheckBox(datosCards)), $main)
})

function filtroCheckBox(listaEventos){
  let seleccionadas = []
  const checkBoxChecked = document.querySelectorAll('input[type="checkbox"]:checked')
  seleccionadas = Array.from(checkBoxChecked).map( elemento => elemento.value)

  if(seleccionadas.length ===0){
    return listaEventos;
  } else {
    return listaEventos.filter( event =>
      seleccionadas.includes(event.category))
  }
}

function filtroTexto(filtroCheckBox){
  const textoEscrito = document.getElementById('textSearch').value.toLowerCase()

  if(textoEscrito === " "){
      return filtroCheckBox
  } else{
      return filtroCheckBox.filter( evento => evento.name.toLowerCase()
        .includes(textoEscrito))
  }
}

function NoCoincidenciaMensaje(){
  mensaje = `<h1>Coincidence not found, please try again!</h1>`
   return mensaje
}

const  eventosFiltrados = filtrarEventos(datosCards)
agregarElementos(eventosFiltrados, $main)


