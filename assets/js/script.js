class Hardware{
    constructor(nome,img,id,tipo,info='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quo eius suscipit repellendus doloribus neque deleniti fugit labore eum reprehenderit architecto accusamus harum officiis rerum, voluptatum expedita nostrum recusandae laborum!'){

        this.dados={'nome':nome, 'img':img, "id":id, 'tipo':tipo, 'info':info}
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
        <td class="table-favoritos"><img src="${this.dados.img}" class="img-favoritos"></td>
        <td class="table-favoritos">${this.dados.nome}</td>
        <td class="table-favoritos"><button type="button" class="btn btn-warning" onclick="hardwareInstancias[${this.dados.id-1}].removeFavorito()">Remover</button></td>`
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
        if(butao){
        butao.innerHTML=`<i class="fa-sharp fa-solid fa-heart"></i>`
        }
    }
    butaoFavoritoOFF(){ //TIRA O BOTAO DE SELECIONADO
        let butao=document.getElementById(this.dados.nome)
        if(butao){
        butao.innerHTML=`<i class="fa-regular fa-heart"></i>`
        }
    }

    salvarLocal(){ //salva na memória local o favorito
        let estado={'selecionado':this.selecionado}
        window.localStorage.setItem(`favorito${this.dados.id}`, JSON.stringify(estado));
    }

    criaElementoCarrossel(){
        return `
        <div class="cartao-conteudo">
        <img src="${this.dados.img}" alt="Imgem ${this.dados.nome}" >  
            <button type="button col-12" class="btn" onclick="hardwareInstancias[${this.dados.id-1}].openModal()">
            <span class="texto-titulo-componentes">
                ${criaTituloCarrousel(this.dados.nome)}
            </span>                               
            </button>
            
        </div>`
    }
    openModal(){
        const modalDim=new bootstrap.Modal('#ModalHardware',{});
        modalDim.show();
        
        if(this.selecionado){
            document.getElementById('modalTitulo').innerHTML=`<h5 class="modal-title" id="ModalLabel">${this.dados.nome}&nbsp;&nbsp;</h5><button id="${this.dados.nome}" class="favoritos-coracao" onclick="hardwareInstancias[${this.dados.id-1}].actionFav()"><i class="fa-sharp fa-solid fa-heart"></i></button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        } else{
            document.getElementById('modalTitulo').innerHTML=`<h5 class="modal-title" id="ModalLabel">${this.dados.nome}&nbsp;&nbsp;</h5><button id="${this.dados.nome}" class="favoritos-coracao" onclick="hardwareInstancias[${this.dados.id-1}].actionFav()"><i class="fa-regular fa-heart"></i></button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        }
        document.getElementById('modalBody').innerHTML=`
                        <span class="modal-img"><img src="${this.dados.img}" alt=""></span>
                        <p>${this.dados.info}</p>`
    }
}


class Banners{
    constructor(info){
        this.info=info;
    }
    criaTituloBannerLeft(i){
        let letrasTitulo=this.info[i].nomeLeft.split("")
        let titulo=""
        
        
        for(let letra of letrasTitulo){
        if(letra==" "){
            titulo+=`<h3 class="title-carousel-banner-animate">&nbsp;&nbsp;</h3>`
        } else{
            titulo+=`<h3 class="title-carousel-banner-animate">${letra}</h3>`
        }
        }
        return titulo;
    }
    criaTituloBannerRight(i){
        let letrasTitulo=this.info[i].nomeRight;
        let titulo=""
        if(letrasTitulo.length>0){
            letrasTitulo=letrasTitulo.split("")
            
            for(let letra of letrasTitulo){
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
    criaBanner(){
        let bannerHtml=document.getElementById('banner');
        let elementoBanner=""
        let active=""

        for(let i=0;i<this.info.length;i++){
            
            if(i>0){
                active="";
            } else{
                active="active"
            }
    
            if(this.info[i].nomeRight.length>0){
                elementoBanner+=`
            <div class="carousel-item ${active}" data-bs-interval="5000">
                <div class="banner" style="background-image: url('${this.info[i].img}')"></div> 
                <div class="title-carousel-banner carousel-caption d-block">
                    <div class="title-carousel-banner animate__animated animate__backInLeft" >
                        ${this.criaTituloBannerLeft(i)}
                    </div>
                    <div class="title-carousel-banner animate__animated animate__backInRight" >
                        ${this.criaTituloBannerRight(i)}
                    </div>
                </div>
            </div>`
            } else {
                elementoBanner+= `
            <div class="carousel-item ${active}" data-bs-interval="5000">
                <div class="banner" style="background-image: url('${this.info[i].img}')"></div> 
                <div class="title-carousel-banner carousel-caption d-block">
                    <div class="title-carousel-banner animate__animated animate__backInLeft" >
                        ${this.criaTituloBannerLeft(i)}
                    </div>
                </div>
            </div>`
            }
            
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
        
    }
    
}

class Tooltip{
    constructor(tooltips){
        this.tooltips=tooltips;
    }

    criaTolltip(){
        for(let i=0; i<this.tooltips.length;i++){
            let id=`info-${this.tooltips[i].tipo}`
            document.getElementById(id).innerHTML=`<sup class="sup-modified"><i class="info fa-solid fa-circle-info" data-toggle="tooltip" data-bs-placement="top" title="${this.tooltips[i].info}"></i></sup>`
        }
    }
}















// const hardwares=[{"nome":"RTX-3090","img":"assets/img/rtx-3090.jpg","id":"1","tipo":"nvidea"},
//  {"nome":"RTX-3080","img":"assets/img/rtx-3080.jpg","id":"2","tipo":"nvidea"},
//  {"nome":"RTX-3070","img":"assets/img/rtx-3070.jpg","id":"3","tipo":"nvidea"},
//  {"nome":"RTX-3060","img":"assets/img/rtx-3060.jpg","id":"4","tipo":"nvidea"},
//  {"nome":"RTX-3050","img":"assets/img/rtx-3050.jpg","id":"5","tipo":"nvidea"},
//  {"nome":"RTX-2080","img":"assets/img/rtx-2080.jpg","id":"6","tipo":"nvidea"},
//  {"nome":"RTX-2070","img":"assets/img/rtx-2070.jpg","id":"7","tipo":"nvidea"},
//  {"nome":"RTX-2060","img":"assets/img/rtx-2060.jpg","id":"8","tipo":"nvidea"},
//  {"nome":"GTX-1660","img":"assets/img/gtx-1660.jpg","id":"9","tipo":"nvidea"},
//  {"nome":"GTX-1080","img":"assets/img/gtx-1080.jpg","id":"10","tipo":"nvidea"},
//  {"nome":"GTX-1050","img":"assets/img/gtx-1050.jpg","id":"11","tipo":"nvidea"},
//  {"nome":"GT-1030","img":"assets/img/gt-1030.jpg","id":"12","tipo":"nvidea"},
//  {"nome":"RX-6900XT","img":"assets/img/rx-6900xt.jpg","id":"13","tipo":"amd-vga"},
//  {"nome":"RX-6800XT","img":"assets/img/rx-6800xt.jpg","id":"14","tipo":"amd-vga"},
//  {"nome":"RX-6750XT","img":"assets/img/rx-6750xt.jpg","id":"15","tipo":"amd-vga"},
//  {"nome":"RX-6700XT","img":"assets/img/rx-6700xt.jpg","id":"16","tipo":"amd-vga"},
//  {"nome":"RX-6600XT","img":"assets/img/rx-6600xt.jpg","id":"17","tipo":"amd-vga"},
//  {"nome":"RX-570","img":"assets/img/rx-570.jpg","id":"18","tipo":"amd-vga"},
//  {"nome":"RX-550","img":"assets/img/rx-550.jpg","id":"19","tipo":"amd-vga"},
//  {"nome":"AXRX-550","img":"assets/img/axrx-550.jpg","id":"20","tipo":"amd-vga"},
//  {"nome":"i9-12900K","img":"assets/img/i9-12900K.jpg","id":"21","tipo":"processador"},
//  {"nome":"i9-12900KF","img":"assets/img/i9-12900KF.jpg","id":"22","tipo":"processador"},
//  {"nome":"i9-11900K","img":"assets/img/i9-11900K.jpg","id":"23","tipo":"processador"},
//  {"nome":"i9-10900K","img":"assets/img/i9-10900K.jpg","id":"24","tipo":"processador"},
//  {"nome":"RYZEN-9-5950X","img":"assets/img/amd-5950x.jpg","id":"25","tipo":"processador"},
//  {"nome":"RYZEN-9-5900X","img":"assets/img/amd-5900x.jpg","id":"26","tipo":"processador"},
//  {"nome":"RYZEN-7-5700G","img":"assets/img/amd-5700g.jpg","id":"27","tipo":"processador"},
//  {"nome":"RYZEN-5-5600G","img":"assets/img/amd-5600g.jpg","id":"28","tipo":"processador"},
//  {"nome":"DDR5-A","img":"assets/img/ddr5.jpg","id":"29","tipo":"ram"},
//  {"nome":"DDR5-B","img":"assets/img/ddr5.jpg","id":"30","tipo":"ram"},
//  {"nome":"DDR5-C","img":"assets/img/ddr5.jpg","id":"31","tipo":"ram"},
//  {"nome":"DDR4-A","img":"assets/img/ddr4.jpg","id":"32","tipo":"ram"},
//  {"nome":"DDR4-B","img":"assets/img/ddr4.jpg","id":"33","tipo":"ram"},
//  {"nome":"DDR4-C","img":"assets/img/ddr4.jpg","id":"34","tipo":"ram"},
//  {"nome":"DDR3-A","img":"assets/img/ddr3.jpg","id":"35","tipo":"ram"},
//  {"nome":"DDR3-B","img":"assets/img/ddr3.jpg","id":"36","tipo":"ram"},
//  {"nome":"SSD-NVMe-A","img":"assets/img/ssd1.jpg","id":"37","tipo":"ssd"},
//  {"nome":"SSD-NVMe-B","img":"assets/img/ssd2.jpg","id":"38","tipo":"ssd"},
//  {"nome":"SSD-NVMe-C","img":"assets/img/ssd3.jpg","id":"39","tipo":"ssd"},
//  {"nome":"SSD-NVMe-D","img":"assets/img/ssd4.jpg","id":"40","tipo":"ssd"},
//  {"nome":"SSD-Sata-A","img":"assets/img/ssd5.jpg","id":"41","tipo":"ssd"},
//  {"nome":"SSD-Sata-B","img":"assets/img/ssd6.jpg","id":"42","tipo":"ssd"},
//  {"nome":"SSD-Sata-C","img":"assets/img/ssd7.jpg","id":"43","tipo":"ssd"},
//  {"nome":"SSD-Sata-D","img":"assets/img/ssd8.jpg","id":"44","tipo":"ssd"},
//  {"nome":"Modular-A","img":"assets/img/fonte1.jpg","id":"45","tipo":"fontes"},
//  {"nome":"Modular-B","img":"assets/img/fonte1.jpg","id":"46","tipo":"fontes"},
//  {"nome":"Modular-C","img":"assets/img/fonte2.jpg","id":"47","tipo":"fontes"},
//  {"nome":"Modular-D","img":"assets/img/fonte2.jpg","id":"48","tipo":"fontes"},
//  {"nome":"Modular-E","img":"assets/img/fonte3.jpg","id":"49","tipo":"fontes"},
//  {"nome":"Modular-F","img":"assets/img/fonte3.jpg","id":"50","tipo":"fontes"},
//  {"nome":"Modular-G","img":"assets/img/fonte4.jpg","id":"51","tipo":"fontes"},
//  {"nome":"Modular-H","img":"assets/img/fonte4.jpg","id":"52","tipo":"fontes"}]


// const banners=[
//     {
//     nomeLeft:"NVIDEA",
//     nomeRight:"RTX-3090",
//     img:"assets/img/hardware2.jpg",
// },
// {
//     nomeLeft:"RYZEN 9",
//     nomeRight:"5950X",
//     img:"assets/img/hardware3.jpg",
// },
// {
//     nomeLeft:"HARDWARE",
//     nomeRight:"",
//     img:"assets/img/hardware.jpg",
// }
// ]
  const tooltips=[
      {
      tipo:"vga",
      info:"É responsável por gerar e renderizar gráficos tanto 2D quanto 3D. Frequentemente, estas são anunciadas como placas gráficas discretas ou dedicadas, enfatizando a distinção entre elas e as placas gráficas integradas."
     
  },
  {
     tipo:"cpu",
     info:"Circuito integrado que realiza as funções de cálculo e tomada de decisão de um computador. Todos os computadores e equipamentos eletrônicos baseiam-se nele para executar suas funções, podemos dizer que o processador é o cérebro do computador por realizar todas estas funções."
  },
  {
     tipo:"ram",
     info:"Memória de Acesso Aleatório (RAM), é a memória de curto prazo, ou seja, é um espaço para informações temporárias do sistema operacional do seu computador."
  },
  {
     tipo:"ssd",
     info:"Também conhecido como Solid-State Drive, um SSD é uma tecnologia de armazenamento, sendo a evolução do HD (Disco Rígido)."
  },
  {
     tipo:"fontes",
     info:"Uma fonte de alimentação é um equipamento usado para alimentar cargas elétricas."
  }
  ]

 const tooltipsInstancia=new Tooltip(tooltips)


function removePlaceholderCarousel(){
    elementos=document.querySelectorAll(".hardware-placeholder")
    for (let elemento of elementos){
      elemento.style.display="none"
    }
}

let bannersInstancia=[];
let banners=[]
const loadBanner=async()=>{
    const responseBanner=await fetch("https://demo7797720.mockable.io/banner");
    banners=await responseBanner.json();
    bannersInstancia=new Banners(banners);
    bannersInstancia.criaBanner();
    document.querySelector("#banner-placeholder").style.display = "none";//inserção
    
}
let hardwareInstancias=[];
let hardwares=[]
const loadHardwares = async()=>{
    const responseHardware= await fetch("https://demo7797720.mockable.io/hardware");
    hardwares = await responseHardware.json();
    for(let i=0;i<hardwares.length;i++){
        hardwareInstancias.push(new Hardware(hardwares[i].nome,hardwares[i].img,hardwares[i].id,hardwares[i].tipo))
    }
    verificaFavoritos();
    loadLocal();
    criaCarrousel('nvidea');
    criaCarrousel('processador');
    criaCarrousel('ram');
    criaCarrousel('amd-vga');
    criaCarrousel('ssd');
    criaCarrousel('fontes');
    slider();
    removePlaceholderCarousel();
}

function removeDisplayNoneLoader(){
    let elementosLoading=document.querySelectorAll('.loadingNone');
    for(let elemento of elementosLoading){
        elemento.classList.remove("loadingNone");
    }
}




document.addEventListener('DOMContentLoaded',function(){
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });
    setTimeout(()=>{
        document.querySelector('.loading').style.display="none";
        removeDisplayNoneLoader()
        loadHardwares();
        loadBanner();
        tooltipsInstancia.criaTolltip()
    },5000);
    // document.querySelector('.loading').style.display="none";
    // removeDisplayNoneLoader()
    // loadHardwares();
    // loadBanner();
    // tooltipsInstancia.criaTolltip()
})

