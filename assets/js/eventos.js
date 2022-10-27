function efeitoRolar(event){
    const header =document.querySelector('header'); 
    if(document.documentElement.scrollTop>50){
           
        header.style.backgroundColor='rgba(255, 101, 0.8, 0.8)'
    } else {
        header.style.backgroundColor='rgba(255, 101, 0.8)'
    }
}

function loadLocal(){   //função para ler memória
    for(i=0;i<favoritosIntancias.length;i++){
        let id=`hardware${i+1}`
        let valor=JSON.parse(window.localStorage.getItem(id));
        if(valor){
            if(valor.selecionado){
                favoritosIntancias[i].actionFav()
            }
        }
    }
}

////////////////////////////////////////FUNÇÕES GENÉRICAS FAVORITOS////////////////////////////
function somaContador(){ //SOMA 1 AO CONTADOR DE FAVORITO
    let contador=parseInt(document.getElementById('contador').innerText)
    contador+=1;
    document.getElementById('contador').innerText=contador;

}

function subtraiContador(){ //SUBTRAI 1 AO CONTADOR DE FAVORITO
    let contador=parseInt(document.getElementById('contador').innerText)
    contador-=1;
    document.getElementById('contador').innerText=contador;
}

function verificaFavoritos(){

    let listaFavoritos=document.getElementById('favoritos')

    if(listaFavoritos.innerHTML==""){
        listaFavoritos.innerHTML="<p>Você ainda não tem favoritos.</p>"  //AO INICIALIZAR A PÁGINA, CASO NÃO TENHA NENHUM FAVORITO OU SE TODOS OS FAVORITOS TIVEREM SIDO REMOVIDOS
    } else if(listaFavoritos.innerHTML=="<p>Você ainda não tem favoritos.</p>"){  //QUANDO O PRIMEIRO FAVORITO FOR INSERIDO, PARA REMOVER O TEXTO DE NÃO TER FAVORITOS
        listaFavoritos.innerHTML=""
    }
}

function limpaTabela(){

    let intancia;
    for(instancia of favoritosIntancias){
        if(instancia.selecionado){
            instancia.removeFavorito()
        }
    }
}
////////////////////////////////////////FUNÇÕES GENÉRICAS FAVORITOS FIM////////////////////////////



//////////////////////////////////  CARROUSEL ////////////////////////////////////////////

function criaTituloCarrousel(nome){
    let titulo=""
    letrasTitulo=nome.split("")
        
    for(letra of letrasTitulo){
        if(letra=="-"){
            titulo+=`<p class="letter">&nbsp;&nbsp;</p>`
        } else{
           titulo+=`<p class="letter">${letra}</p>`
        }
    }
    return titulo

}

function slider(){            //CONFIGURA SLICK
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        
        nextArrow: `<button class="botao-carousel carousel-control-next">
                        <span class="carousel-control-next-icon botao-carousel-span" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </button>`,
        prevArrow: `<button class="botao-carousel carousel-control-prev">
                      <span class="carousel-control-prev-icon botao-carousel-span" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </button>`,
        responsive: [
        {
            breakpoint: 1999,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

function criaCarrousel(id){
    let carrousel = document.getElementById(id);
    let div=document.createElement('div')
    div.classList.add('offset-1', 'col-10', `slider`)
    favoritosIntancias.forEach(element => {
        if(element.dados.tipo==id){
        div.innerHTML+=element.criaElementoCarrossel();
        }
    });

    carrousel.appendChild(div);
}


//////////////////////////////////  CARROUSEL FIM////////////////////////////////////////////


//////////////////////////////////  MODAL ////////////////////////////////////////////
// function criaModais(){

//     favoritosIntancias.forEach(element => {
//        element.criaModal()
        
//     });
    
// }
//////////////////////////////////  MODAL FIM////////////////////////////////////////////

//////////////////////////////////  BANNER ////////////////////////////////////////////
// function criaTituloBannerLeft(banner){
//     let letrasTitulo=banner.nomeLeft
//     letrasTitulo=letrasTitulo.split("")
//     let titulo=""
    
    
//     for(letra of letrasTitulo){
//     if(letra==" "){
//         titulo+=`<h3 class="title-carousel-banner-animate">&nbsp;&nbsp;</h3>`
//     } else{
//         titulo+=`<h3 class="title-carousel-banner-animate">${letra}</h3>`
//     }
//     }
//     return titulo;
// }
// function criaTituloBannerRight(banner){
//     let letrasTitulo=banner.nomeRight
//     let titulo=""
//     if(letrasTitulo.length>0){
//         letrasTitulo=letrasTitulo.split("")
        
//         for(letra of letrasTitulo){
//             if(letra==""){
//                 titulo+=`<h3 class="title-carousel-banner-animate">&nbsp;&nbsp;</h3>`
//             } else{
//                 titulo+=`<h3 class="title-carousel-banner-animate">${letra}</h3>`
//             }
//             }
//     } else {
//         return null;
//     }

//     return titulo;
// }
// function criaBanner(){
//     let bannerHtml=document.getElementById('banner');
//     let elementoBanner=""
//     let i=0;
//     let active=""
//     for(const banner of banners){
//         let tituloLeft=criaTituloBannerLeft(banner)
//         let tituloRight=criaTituloBannerRight(banner)
        
//         if(i>0){
//             active="";
//         } else{
//             active="active"
//         }

//         if(tituloRight){
//             elementoBanner+=`
//         <div class="carousel-item ${active}" data-bs-interval="5000">
//             <div class="banner" style="background-image: url('${banner.img}')"></div> 
//             <div class="title-carousel-banner carousel-caption d-block">
//                 <div class="title-carousel-banner animate__animated animate__backInLeft" >
//                     ${tituloLeft}
//                 </div>
//                 <div class="title-carousel-banner animate__animated animate__backInRight" >
//                     ${tituloRight}
//                 </div>
//             </div>
//         </div>`
//         } else {
//             elementoBanner+= `
//         <div class="carousel-item ${active}" data-bs-interval="5000">
//             <div class="banner" style="background-image: url('${banner.img}')"></div> 
//             <div class="title-carousel-banner carousel-caption d-block">
//                 <div class="title-carousel-banner animate__animated animate__backInLeft" >
//                     ${tituloLeft}
//                 </div>
//             </div>
//         </div>`
//         }
//         i++;
//     }
//     elementoBanner+=`
//     <button class="botao-carousel carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
//         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span class="visually-hidden">Previous</span>
//     </button>
//     <button class="botao-carousel carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
//         <span class="carousel-control-next-icon" aria-hidden="true"></span>
//         <span class="visually-hidden">Next</span>
//     </button>`
//     document.getElementById('banner').innerHTML=elementoBanner;
    
// }

//////////////////////////////////  FIM ////////////////////////////////////////////