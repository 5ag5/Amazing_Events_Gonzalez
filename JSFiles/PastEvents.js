const $main = document.getElementById('contenedorCartas')
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const $contenedorChecks = document.getElementById('checksID3') 
const $botonBarraSearch = document.getElementById('botonBuscarTxt2')

fetch(url).then(respuesta => {
    return respuesta.json()
    }).then(dato => {
      const datosCards = dato.events
      const currentDateVar = dato.currentDate

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
        agregarElementos(filtroCheckBox(eventosFiltrados), $main)
      })
      
      $botonBarraSearch.addEventListener('click', e =>{
        agregarElementos(filtroTexto(filtroCheckBox(eventosFiltrados)), $main)
      })

      const  eventosFiltrados = filtrarEventos(datosCards, currentDateVar)
      agregarElementos(eventosFiltrados, $main)
      
    } 
    )

function filtrarEventos(lista, currentDate){
  let arregloFiltrado = []
  for( let elemento of lista ){
      if(elemento.date < currentDate){
          arregloFiltrado.push(elemento)
      }
    }
    return arregloFiltrado
  }
    

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
        <a href="./details.html?id=${evento._id}" class="btn btn-primary">Buy Tickets</a>
    </div>
  </div>
</div>
    `
}

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


