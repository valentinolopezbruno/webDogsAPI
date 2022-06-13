const API_RANDOM_URL = 'https://api.thedogapi.com/v1/images/search?limit=3'; // PAGINA DE LA API QUE ME DEVUELVE UNA IMAGEN RANDOM
const API_UPLOAD_URL = 'https://api.thedogapi.com/v1/images/upload'
const API_DELETE_URL = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=1df6aba1-f8bc-444a-a803-06cdd9c16432`; // PAGINA DE LA API QUE ME DEVUELVE UNA IMAGEN RANDOM
const API_FAVORITES_URL = 'https://api.thedogapi.com/v1/favourites?limit=100&api_key=1df6aba1-f8bc-444a-a803-06cdd9c16432'; // PAGINA DE LA API QUE ME DEVUELVE UNA IMAGEN RANDOM
const axioss = axios.create({
    baseURL:'https://api.thedogapi.com/v1' // DEFINO UNA URL BASE PARA NO LLAMARLA NUNCA Y SOLO AGREGAR RUTAS
})
axioss.defaults.headers.common['X-API-KEY'] = '1df6aba1-f8bc-444a-a803-06cdd9c16432' // LE PASO MI API-KEY  POR DEFAULT UNA SOLA VEZ
/* ---------------------------- GENERATE RANDOM DOG */
async function generateRandomDog() { 
    const res = await fetch(API_RANDOM_URL); 
    const data = await res.json();

    if(res.status !== 200){ 
        showError.innerText = "Ocurrio un error " + res.status
        showError.innerHTML = "Ocurrio un error " + res.status
    } else{ 
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        console.log("GENERANDO NUEVAS IMAGENES...");
        console.log("IMAGEN ALEATORIA 1 MOSTRADA: " + data[0].url);
        console.log("IMAGEN ALEATORIA 2 MOSTRADA: " + data[1].url);
        console.log("IMAGEN ALEATORIA 3 MOSTRADA: " + data[2].url);

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        btn1.onclick = () => saveDogInFavorite(data[0].id)
        btn2.onclick = () => saveDogInFavorite(data[1].id)
        btn3.onclick = () => saveDogInFavorite(data[2].id)

    }

};

async function saveDogInFavorite(id){ 
    const res = await axioss.post('/favourites',{
        image_id: id
    }); 

    if(res.status !== 200){ 
        showError.innerText = "Ocurrio un error " + res.status + data.message;
        showError.innerHTML = "Ocurrio un error " + res.status + data.message;
    } else{ 
        console.log('dog saved.')
        showFavoriteDogs()
    }
}

async function deleteFavoriteDog(id){
    const res = await fetch(API_DELETE_URL(id),{
        method: 'DELETE', // LE PASO EL METODO DIFERENTE DE GET
    });
    const data = await res.json()

    if(res.status !== 200){ 
        showError.innerText = "Ocurrio un error " + res.status + data.message;
        showError.innerHTML = "Ocurrio un error " + res.status + data.message;
    } else{ 
        console.log('dog deleted.')
        showFavoriteDogs();
    }
    
}

async function showFavoriteDogs() { 
    const res = await fetch(API_FAVORITES_URL);  // PONGO MI APY KEY
    const data = await res.json(); 
    

    if(res.status !== 200){ 
        showError.innerText = "Ocurrio un error " + res.status
        showError.innerHTML = "Ocurrio un error " + res.status
    } 
    // AHORA LO QUE HAGO EN ESTE ELSE ES A PARTIR DEL ARRAY QUE ME DEVUELVE LA DATA IR
    // RECORRIENDOLO PARA CREAR EN EL DOCUMENTO HTML LOS ARTICULOS PARA MOSTRAR LOS DATOS
    // OSEA, DESDE JS LE DIGO A HTML QUE INSERTE NUEVAS ESTIQUETAS CON DATOS
    else{
        console.log("FAVORITE DOGS:")
        console.log(data)
        const section = document.getElementById('favoritesDogs')  // GUARDO EL ID
        section.innerHTML = ""; // BORRO TODO LO QUE ESTA EN EL SECTION PARA DESPUES AÑADIR TODO DE NUEVO Y QUE SE REFRESQUE SOLA LA PAGINA
        const divContainer = document.createElement('div')
        divContainer.classList.add('container')
        divContainer.classList.add('text-center')
        section.appendChild(divContainer);
        const divRow = document.createElement('div')
        divRow.classList.add('row');
        divContainer.appendChild(divRow);
        data.forEach(dog =>{ // RECORRO EL ARRAY Y LE DIG QUE CADA ELEMENTO SE LLAMA "CAT"
            // AHORA LO QUE HAGO ES ALMACENAR EN CONSTANTES EL SECTION DEL HTML PARA DESPUES
            // PODER DARLE LA ORDEN DESDE JS DE CREAR DENTRO DE EL LAS ETIQUETAS
            // GENEREALMENTE ES LA ETIQUETA QUE ABARCA LA ESTRUCTURA 
            const divColXl4 = document.createElement('div')
            divColXl4.classList.add('col-xl-4');
            const img = document.createElement('img'); // ACA GUARDO EN LA CONSTANTE LA ORDEN DE CREAR LA ETIQUETA "IMG"
            img.classList.add('mb-5');
            const br = document.createElement('br')
            const btn = document.createElement('btn') // ACA GUARDO EN LA CONSTANTE LA ORDEN DE CREAR LA ETIQUETA "BTN"
            btn.classList.add('btn');
            btn.classList.add('btn-lg');
            btn.classList.add('btn-danger');
            btn.classList.add('fs-3');
            btn.classList.add('mb-5');
            // ACA GUARDO EN LA CONSTANTE LA ORDEN DE CREAR UNA CONSTANTE DE TXTO PARA EL BOTON
            const btnText= document.createTextNode(' Delete ')
            //AHORA PASO A IMPLEMENTAR TODO LO CREADO ANTERIORMENTE
            btn.appendChild(btnText) // LE PONGO EL TEXTO AL BTN
            btn.onclick = () => deleteFavoriteDog(dog.id)
            // ESTE "dog.image.url" LO SACO DE HACER EL CONSOLE.LOG(data) QUE ME DEVUELVE OBJETOS CON DATOS
            img.src = dog.image.url // GUARDO LA URL DE MI IMAGEN FAVORITA EN EL SRC DE LA IMAGEN DE LA ETIQUETA HTML
            img.width = 300; // LE DOY TAMAÑAO A LA IMAGEN
            img.height = 300; // LE DOY TAMAÑAO A LA IMAGEN
            divColXl4.appendChild(img);
            divColXl4.appendChild(br);
            divColXl4.appendChild(btn);
            divRow.appendChild(divColXl4);
            })
    }
};


async function uploadPhoto(){
    const form = document.getElementById('uploadFile')
    const formData = new FormData(form);
    console.log(formData.get('file')) /* FILE ES EL NOMBRE DE LA LLAVE  DE FORMDATA */

    const res = await fetch(API_UPLOAD_URL,{
        method: 'POST',
        headers: {
            'X-API-KEY': '1df6aba1-f8bc-444a-a803-06cdd9c16432',
        },
        body: formData,
    })
    const data = await res.json()
    console.log(data)
    if(res.status !== 201){ 
        console.log("err")
    } else{ 
        console.log('dog img uploaded!!')
        console.log({data})
        console.log(data.url)
        saveDogInFavorite(data.id);
    }
}

generateRandomDog();
showFavoriteDogs();



