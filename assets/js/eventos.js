function efeitoRolar(event){
    const header =document.querySelector('header'); 
    if(document.documentElement.scrollTop>50){
           
        header.style.backgroundColor='rgba(255, 101, 0.8, 0.8)'
    } else {
        header.style.backgroundColor='rgba(255, 101, 0.8)'
    }
}
function loadLocal(){   //função para ler memória
    for(i=0;i<hardwareInstancias.length;i++){
        let id=`favorito${i+1}`
        let valor=JSON.parse(window.localStorage.getItem(id));
        if(valor){
            if(valor.selecionado){
                hardwareInstancias[i].actionFav()
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
    for(instancia of hardwareInstancias){
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
    titulo+=`<p class="letter">&nbsp;</p><i class="up-arrow-open-modal fa-solid fa-chevron-up"></i>`
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
    hardwareInstancias.forEach(element => {
        if(element.dados.tipo==id){
        div.innerHTML+=element.criaElementoCarrossel();
        }
    });

    carrousel.appendChild(div);
}


//////////////////////////////////  CARROUSEL FIM////////////////////////////////////////////


//////////////////////////////////  FIM ////////////////////////////////////////////