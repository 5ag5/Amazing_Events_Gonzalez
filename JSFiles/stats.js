const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const $contEstadisticas = document.getElementById('contenedorEstadisticas');
const $contenedorUpcoming = document.getElementById('contenedorUpcoming');

fetch(url)
            .then(elemento => {
            return elemento.json()
            })
            .then(datos => {
            const datosCards = datos.events
            const fechaActual = datos.currentDate
            //console.log(datosCards)
            // console.log(fechaActual)
            
            const cardsPasado = filtrarEventosPasado(datosCards, fechaActual)
            const cardsFuturo = filtrarEventosFuturo(datosCards, fechaActual)
            //console.log(cardsPasado)
            // console.log(cardsFuturo)
            
            const eventoMasAtendido = eventoPorcentajeMasAtendido(cardsPasado)
            const eventoMenosAtendido = eventoPorcentajeMenosAtendido(cardsPasado)
            const eventoMayorCapacidad = eventoConMasCapacidad(cardsPasado)

            let eventosEstadisticas = []
            eventosEstadisticas[0] = eventoMasAtendido
            eventosEstadisticas[1] = eventoMenosAtendido
            eventosEstadisticas[2] = eventoMayorCapacidad

            crearElementos(eventosEstadisticas, $contEstadisticas)

            const UpcomingEstadisticas = filtroCategoriaEvento(cardsPasado)
            const revenuesEstadisticas = RevenuesEventos(cardsPasado)
            const percentageAcceptance = porcentajeDeAsistencia(cardsPasado)
            
            // console.log(UpcomingEstadisticas)
            // console.log(revenuesEstadisticas)
            // console.log(percentageAcceptance)
            
            for(let categoria of UpcomingEstadisticas){
                const arregloObjetosNuevo = construirArregloDeObjetos(cardsPasado,categoria)
                console.log(arregloObjetosNuevo)
                crearElementos(arregloObjetosNuevo,$contenedorUpcoming)
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
    console.log(lista)
    for(let i = 0; i < lista.length; i++){
        plantilla += pintarElementos(lista[i])
    }

    console.log(plantilla)
    contenedor.innerHTML = plantilla
}

function pintarElementos(evento){
return `<td>${evento.name}</td>`
}

function filtroCategoriaEvento(lista){
    const listaFiltrada = lista.map(elemento => elemento.category)
    const listaFiltradaFinal = Array.from(new Set(listaFiltrada))
    return listaFiltradaFinal
}

function RevenuesEventos(lista){
    const listaFitlrada = lista.map(elemento => elemento.assistance * elemento.price)
    let suma =0

    for(let elemento of listaFitlrada){
        suma += elemento
    }
    return suma
}

function porcentajeDeAsistencia(lista){
    const listaFiltrada = lista.map(elmento => (elmento.assistance/elmento.capacity))
    let suma =0
    let resultado =0
    for(let elemento of listaFiltrada){
        suma += elemento
        resultado = suma/lista.length
    }
    return resultado
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
        Attendance: suma3/listaObjetos.length,
    })
    
    return sumaResultados
}