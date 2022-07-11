document.addEventListener("DOMContentLoaded",function(){
        iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scroll();
}

function navegacionFija(){
    const barra=document.querySelector(".header");
    const sobreFestival=document.querySelector(".sobre-festival");
    const body=document.querySelector("body");

    window.addEventListener("scroll",function(){
        console.log(sobreFestival.getBoundingClientRect());
        if(sobreFestival.getBoundingClientRect().top<0){
            barra.classList.add("fijo");
            body.classList.add("body-scroll")
        }
        else{
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll")

        }
    });

}

function scroll (){
    const enlaces=document.querySelectorAll(".navegacion-principal a");

    enlaces.forEach(enlace=>{
        enlace.addEventListener("click", function(evento){
            evento.preventDefault();
                const seccionScroll=evento.target.attributes.href.value;
            const seccion=document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior:"smooth"});
        })
    })
}






function crearGaleria(){
    const galeria=document.querySelector(".galeria-imagenes");

        for (let i=1;i<=12;i++){
            const imagen=document.createElement("picture");
                imagen.innerHTML=`
                <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
                <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagenes de la galería"/>

                `;
                imagen.onclick = function(){
                    mostrarImagen(i);
                }
            galeria.appendChild(imagen);

        }
}
function mostrarImagen(id){
    const imagen=document.createElement("picture");
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.avif" type="image/avif" />
    <source srcset="build/img/grande/${id}.webp" type="image/webp" />
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagenes de la galería"/>`;
    

    //aquí se crea el overlay
    const overlay=document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick=function(){
        const body=document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove(); 

    }



    //aquí creamos la x para cerrar las  fotos
    const cerrarfoto=document.createElement("P");
    cerrarfoto.textContent="X";
    cerrarfoto.classList.add("btn-cerrar");
    cerrarfoto.onclick=function(){
        const body=document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove(); 
    }
    //para que aparezca en el overlay
    overlay.appendChild(cerrarfoto);

    //aquí lo añade al html 
    const body=document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body"); //este se añade
}