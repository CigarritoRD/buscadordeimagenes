
// constantes globales!
const API = `https://pixabay.com/api/`;
const formulario = document.querySelector('.form');
const galeria = document.querySelector('.galeria .listadoImagenes');
const buscador = document.querySelector('.buscador');

// listeners
window.onload = ()=>{
    formulario.addEventListener('submit', buscarImagenes);
    
};


function buscarImagenes(e){
    e.preventDefault();
    const busqueda = buscador.value;
    if(!busqueda) {
        return mensajeError('DEBE ESCRIBIR ALGO PARA BUSCAR');
    }
    buscandoImagenes(busqueda);
}

function mensajeError(mensaje){

    const existeAlerta = document.querySelector('.error');
    
if(!existeAlerta){
    const div = document.createElement('div')
    const parrafo = document.createElement('p');
    const mensajeDeError = mensaje;
    parrafo.textContent = mensajeDeError;
    div.appendChild(parrafo);
    div.classList.add('error');
    setInterval
    formulario.appendChild(div);

    // tiempo para que se quite el mensaje de error 
    setTimeout(() => {
        div.remove()
    }, 2000);
    
}

}

async function buscandoImagenes (busqueda){
    
    const keyAPI = "18043493-582bf9fc0e6b34c5b954e0cf4";
    const request = await fetch(`${API}?key=${keyAPI}&q=${busqueda}`);
    const response = await request.json();
    const imagenes = await response.hits;
    
    mostrarImagenes(imagenes)
}


function mostrarImagenes(imagenes){

    limpiarHTML()

    imagenes.forEach(imagen => {
        const creardivs = document.createElement('LI');
        const img = document.createElement('PICTURE')
        const modal = document.createElement('PICTURE');
        const preview = imagen.previewURL;
        const imagenGrande = imagen.largeImageURL;
        modal.innerHTML = `<img src="${ imagenGrande }">`;
        img.innerHTML = `<img src="${ preview }">`;
        creardivs.appendChild(img);
        

        img.onclick = (e) =>{
            e.preventDefault();
            const overlay = document.createElement('div');
            overlay.classList.add('overlay-modal');
            overlay.appendChild(modal);
            
            const x = document.createElement('p');
                x.textContent ='X';
                x.classList.add('cerrar-modal');
            
                overlay.appendChild(x); 

            const body = document.querySelector('body');
            body.classList.add('blockscroll');
         
            body.appendChild(overlay);
            cerrarModal(overlay, body);
         }
            

         galeria.appendChild(creardivs)
        
    });

}

// limpiar html 
function limpiarHTML(){
    while (galeria.firstChild){
        galeria.removeChild(galeria.firstChild);
    }
    
}

function cerrarModal(overlay, body) {
    overlay.addEventListener('click', function () {

        if (overlay) {
            overlay.parentNode.removeChild(overlay);
            body.classList.remove('blockscroll');
            
        }
    })
}




