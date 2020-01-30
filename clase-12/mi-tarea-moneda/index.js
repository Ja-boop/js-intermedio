/// <reference types="jquery" />

const $botonIngresar = $("button");


obtenerListaMoneda()


$botonIngresar.click( ingresarDatos => {

    noRepetirLista();

    let URLbase = "https://api.exchangeratesapi.io/"
    
    let valorFecha = document.querySelector('#ingresar-fecha').value;
    
    let seleccionarMoneda = document.querySelector("select");

    let valorMonedaSeleccionada = seleccionarMoneda.options[seleccionarMoneda.selectedIndex];

    console.log(valorMonedaSeleccionada.text);

    let newURL = new URL(valorFecha + "?base=" + valorMonedaSeleccionada.text, URLbase);
    
    fetch(newURL)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
        console.log(respuestaJSON);

    
        $("p").html('');

        Object.keys(respuestaJSON.rates).forEach(moneda => {
            $("ul").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`));
        });


    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    
    
    ingresarDatos.preventDefault();
});

   
function obtenerListaMoneda(){

    const URL = 'https://api.exchangeratesapi.io/latest'
    
    fetch(URL)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

        Object.keys(respuestaJSON.rates).forEach(monedaBase => {
            $("select").append($(`<option name="moneda-base">${monedaBase}</option>`));
        });


    })
}

function noRepetirLista(){
    $("ul").html("");
}

