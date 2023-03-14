const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const $contEstadisticas = document.getElementById('contenedorEstadisticas');
const $contenedorUpcoming = document.getElementById('contenedorUpcoming');
const $contenedorFuturo = document.getElementById('contenedorUpcoming')
const $contenedorPasado = document.getElementById('contenedorPast')

fetch(url)
            .then(elemento => {
            return elemento.json()
            })
            .then(datos => {
            const datosCards = datos.events
            const fechaActual = datos.currentDate
            
            const cardsPasado = filtrarEventosPasado(datosCards, fechaActual)
            const cardsFuturo = filtrarEventosFuturo(datosCards, fechaActual)
            
            const eventoMasAtendido = eventoPorcentajeMasAtendido(cardsPasado)
            const eventoMenosAtendido = eventoPorcentajeMenosAtendido(cardsPasado)
            const eventoMayorCapacidad = eventoConMasCapacidad(cardsPasado)

            let eventosEstadisticas = []
            eventosEstadisticas[0] = eventoMasAtendido
            eventosEstadisticas[1] = eventoMenosAtendido
            eventosEstadisticas[2] = eventoMayorCapacidad

            crearElementos(eventosEstadisticas, $contEstadisticas)

            const UpcomingEstadisticas = filtroCategoriaEvento(cardsFuturo)
            const PastEstadisticas = filtroCategoriaEvento(cardsPasado)
            
            for(let categoria of PastEstadisticas){
                const arregloObjetosNuevo = construirArregloDeObjetos(cardsPasado,categoria)
                crearElementoFutureYPasado(arregloObjetosNuevo,$contenedorPasado)
            }

            for(let categoria of UpcomingEstadisticas ){
                const arregloObjetosNuevo1 = construirArregloDeObjetosFuturo(cardsFuturo, categoria)
                crearElementoFutureYPasado(arregloObjetosNuevo1,$contenedorFuturo)
            }

        })

function filtrarEventosPasado(lista, currentDate){
    let arregloFiltrado = []
    for( let elemento of lista ){
        if(elemento.date < currentDate){
            arregloFiltrado.push(elemento)
        }
      }
      return arregloFiltrado
}

function filtrarEventosFuturo(lista, currentDate){
    let arregloFiltrado = []
    for( let elemento of lista ){
        if(elemento.date > currentDate){
            arregloFiltrado.push(elemento)
        }
      }
      return arregloFiltrado
}

function eventoPorcentajeMasAtendido(cardsPasado){
    
    const arrayArreglado = cardsPasado.sort((x,y) => (y.assistance/y.capacity) - (x.assistance/x.capacity))

    let eventoMasAtendido = arrayArreglado[0]
    return eventoMasAtendido;
}

function eventoPorcentajeMenosAtendido(cardsPasado){
    
    const arrayArreglado = cardsPasado.sort((x,y) =>  (x.assistance/x.capacity) - (y.assistance/y.capacity))

    let eventoMenosAtendido = arrayArreglado[0]
    return eventoMenosAtendido;
}

function eventoConMasCapacidad(cardsPasado){
    const arrayArreglado = cardsPasado.sort((x,y) =>  y.capacity - x.capacity)

    let eventoMenosAtendido = arrayArreglado[0]
    return eventoMenosAtendido;
}

function crearElementos(lista, contenedor){
    let plantilla = ''
    for(let i = 0; i < lista.length; i++){
        plantilla += pintarElementos(lista[i])
    }

    contenedor.innerHTML = plantilla
}

function pintarElementos(evento){
return `<td>${evento.name}</td>`
}

function crearElementoFutureYPasado(lista, contenedor){
    let plantilla = ''
    for(let i =0; i < lista.length;i++){
        plantilla += pintarFilaFuturoyPasado(lista[i]);
    }
    
    contenedor.innerHTML += plantilla;
}

function pintarFilaFuturoyPasado(evento){
    return `<tr>
    <td>${evento.Category}</td>
    <td>$${evento.Revenues}</td>
    <td>%${evento.Attendance}</td>
    </tr>`
}

function filtroCategoriaEvento(lista){
    const listaFiltrada = lista.map(elemento => elemento.category)
    const listaFiltradaFinal = Array.from(new Set(listaFiltrada))
    return listaFiltradaFinal
}

function construirArregloDeObjetos(lista, categoria){
    const nuevaLista = lista.filter( elemento => elemento.category.includes(categoria))
    const listaObjetos = []
    const sumaResultados = []
    let suma1 =0
    let suma2 =0
    let suma3 =0
    
    for(let elemento of nuevaLista){
        listaObjetos.push({
            Category: elemento.category,
            Revenues: elemento.assistance * elemento.price,
            Attendance: elemento.assistance/elemento.capacity,
        })
    }


    for(let elemento of listaObjetos){
        suma1 = elemento.Category
        suma2 += elemento.Revenues
        suma3 += elemento.Attendance
    }

    sumaResultados.push({
        Category: suma1,
        Revenues: suma2,
        Attendance: (Math.round((suma3/listaObjetos.length)*100)/100)*100,
    })
    
    return sumaResultados
}

function construirArregloDeObjetosFuturo(lista, categoria){
    const nuevaLista = lista.filter( elemento => elemento.category.includes(categoria))
    const listaObjetos = []
    const sumaResultados = []
    let suma1 =0
    let suma2 =0
    let suma3 =0
    
    for(let elemento of nuevaLista){
        listaObjetos.push({
            Category: elemento.category,
            Revenues: elemento.estimate * elemento.price,
            Attendance: elemento.estimate/elemento.capacity,
        })
    }

    for(let elemento of listaObjetos){
        suma1 = elemento.Category
        suma2 += elemento.Revenues
        suma3 += elemento.Attendance
    }

    sumaResultados.push({
        Category: suma1,
        Revenues: suma2,
        Attendance: (Math.round((suma3/listaObjetos.length)*100)/100)*100,
    })
    
    return sumaResultados
}