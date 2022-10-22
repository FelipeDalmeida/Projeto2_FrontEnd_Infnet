class Favoritos{
    constructor(nome,foto,id,info='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quo eius suscipit repellendus doloribus neque deleniti fugit labore eum reprehenderit architecto accusamus harum officiis rerum, voluptatum expedita nostrum recusandae laborum!'){

        this.dados={'nome':nome, 'foto':foto, 'info':info,"id":id}
        this.selecionado=false // 1 selecionado
    }

    actionFav(){                //se estiver selecionado irá remover o favorito, se não, irá adicionar;
        if(this.selecionado){

            this.removeFavorito(this.dados.id);
        }
        else {
            this.adicionaFavorito();


        }
    }
    adicionaFavorito(){
        verificaFavoritos()
        somaContador()
        this.butaoFavoritoON();

        let listaFavoritos=document.getElementById('favoritos')
        let tr=document.createElement('tr');
        tr.setAttribute('id',this.dados.id)
        tr.innerHTML=`
        <td class="table-favoritos"><img src="${this.dados.foto}" class="img-favoritos"></td>
        <td class="table-favoritos">${this.dados.nome}</td>
        <td class="table-favoritos"><button type="button" class="btn btn-warning" onclick="${this.dados.id}.removeFavorito()">Remover</button></td>`
        listaFavoritos.appendChild(tr)
        this.selecionado=true;
        this.salvarLocal()
    }
    removeFavorito(){
        const id=document.getElementById(this.dados.id)
        if(id){
            id.remove()

        this.butaoFavoritoOFF()
        verificaFavoritos()
        subtraiContador()
        this.selecionado=false;
        this.salvarLocal()
        }
    }
    butaoFavoritoON(){  //ADICIONA O BOTAO DE SELECIONADO
        let butao=document.getElementById(this.dados.nome)
        butao.innerHTML=`<i class="fa-sharp fa-solid fa-heart"></i>`
    }
    butaoFavoritoOFF(){ //TIRA O BOTAO DE SELECIONADO
        let butao=document.getElementById(this.dados.nome)
        butao.innerHTML=`<i class="fa-regular fa-heart"></i>`
    }

    salvarLocal(){ //salva na memória local o favorito
        let estado={'selecionado':this.selecionado}
        window.localStorage.setItem(this.dados.id, JSON.stringify(estado));
    }
}


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


function limpaTabela(){

    let intancia;
    for(instancia of favoritosIntancias){
        if(instancia.selecionado){
            instancia.removeFavorito()
        }
    }
}












favoritos1= new Favoritos('RTX-3090',"assets/img/rtx-3090.jpg","favoritos1")
favoritos2= new Favoritos('RTX-3080',"assets/img/rtx-3080.jpg","favoritos2")
favoritos3= new Favoritos('RTX-3070',"assets/img/rtx-3070.jpg","favoritos3")
favoritos4= new Favoritos('RTX-3060',"assets/img/rtx-3060.jpg","favoritos4")
favoritos5= new Favoritos('RTX-3050',"assets/img/rtx-3050.jpg","favoritos5")
favoritos6= new Favoritos('RTX-2080',"assets/img/rtx-2080.jpg","favoritos6")
favoritos7= new Favoritos('RTX-2070',"assets/img/rtx-2070.jpg","favoritos7")
favoritos8= new Favoritos('RTX-2060',"assets/img/rtx-2060.jpg","favoritos8")
favoritos9= new Favoritos('GTX-1660',"assets/img/gtx-1660.jpg","favoritos9")
favoritos10= new Favoritos('GTX-1080',"assets/img/gtx-1080.jpg","favoritos10")
favoritos11= new Favoritos('GTX-1050',"assets/img/gtx-1050.jpg","favoritos11")
favoritos12= new Favoritos('GT-1030',"assets/img/gt-1030.jpg","favoritos12")

const favoritosIntancias=[favoritos1,
     favoritos2,
     favoritos3,
     favoritos4,
     favoritos5,
     favoritos6,
     favoritos7,
     favoritos8,
     favoritos9,
     favoritos10,
     favoritos11,
     favoritos12]


const banners=[
    {
    nomeLeft:"NVIDEA",
    nomeRight:"RTX-3090",
    img:"assets/img/hardware2.jpg",
},
{
    nomeLeft:"RYZEN 9",
    nomeRight:"X5950",
    img:"assets/img/hardware3.jpg",
},
{
    nomeLeft:"HARDWARE",
    nomeRight:"",
    img:"assets/img/hardware.jpg",
}
]
function criaTituloBannerLeft(banner){
    let letrasTitulo=banner.nomeLeft
    letrasTitulo=letrasTitulo.split("")
    let titulo=""
    
    
    for(letra of letrasTitulo){
    if(letra==""){
        titulo+=`<h3 class="title-carousel-banner-animate">&nbsp;&nbsp;</h3>`
    } else{
        titulo+=`<h3 class="title-carousel-banner-animate">${letra}</h3>`
    }
    }
    return titulo;
}
function criaTituloBannerRight(banner){
    let letrasTitulo=banner.nomeRight
    let titulo=""
    if(letrasTitulo.length>0){
        letrasTitulo=letrasTitulo.split("")
        
        for(letra of letrasTitulo){
            if(letra==""){
                titulo+=`<h3 class="title-carousel-banner-animate">&nbsp;&nbsp;</h3>`
            } else{
                titulo+=`<h3 class="title-carousel-banner-animate">${letra}</h3>`
            }
            }
    } else {
        return null;
    }

    return titulo;
}
function criaBanner(){
    let bannerHtml=document.getElementById('banner');
    let elementoBanner=""
    let i=0;
    let active=""
    for(const banner of banners){
        let tituloLeft=criaTituloBannerLeft(banner)
        let tituloRight=criaTituloBannerRight(banner)
        
        if(i>0){
            active="";
        } else{
            active="active"
        }

        if(tituloRight){
            elementoBanner+=`
        <div class="carousel-item ${active}" data-bs-interval="5000">
            <div class="banner" style="background-image: url('${banner.img}')"></div> 
            <div class="title-carousel-banner carousel-caption d-block">
                <div class="title-carousel-banner animate__animated animate__backInLeft" >
                    ${tituloLeft}
                </div>
                <div class="title-carousel-banner animate__animated animate__backInRight" >
                    ${tituloRight}
                </div>
            </div>
        </div>`
        } else {
            elementoBanner+= `
        <div class="carousel-item ${active}" data-bs-interval="5000">
            <div class="banner" style="background-image: url('${banner.img}')"></div> 
            <div class="title-carousel-banner carousel-caption d-block">
                <div class="title-carousel-banner animate__animated animate__backInLeft" >
                    ${tituloLeft}
                </div>
            </div>
        </div>`
        }
        i++;
    }
    elementoBanner+=`
    <button class="botao-carousel carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="botao-carousel carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>`
    document.getElementById('banner').innerHTML=elementoBanner;
    console.log(elementoBanner)
}

document.addEventListener('DOMContentLoaded',function(){criaBanner();})
// loadLocal()