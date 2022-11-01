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
    document.getElementById('contadorMobile').innerText=contador;
}

function subtraiContador(){ //SUBTRAI 1 AO CONTADOR DE FAVORITO
    let contador=parseInt(document.getElementById('contador').innerText)
    contador-=1;
    document.getElementById('contador').innerText=contador;
    document.getElementById('contadorMobile').innerText=contador;
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
//////////////////////////////////  Placeholder////////////////////////////////////////////
function removePlaceholderCarousel(){
    elementos=document.querySelectorAll(".hardware-placeholder")
    for (let elemento of elementos){
      elemento.style.display="none"
    }
}
//////////////////////////////////  Placeholder////////////////////////////////////////////

let hardwareInstancias=[]; //////////////////////////////////  Criação das instancias e carregamento////////////////////////////////////////////
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





//Caso o link esteja desativado, comentar a função acima e descomentar codigo de baixo


// let hardwares=[{"nome":"RTX-3090","img":"assets/img/rtx-3090.jpg","id":"1","tipo":"nvidea"},
// {"nome":"RTX-3080","img":"assets/img/rtx-3080.jpg","id":"2","tipo":"nvidea"},
// {"nome":"RTX-3070","img":"assets/img/rtx-3070.jpg","id":"3","tipo":"nvidea"},
// {"nome":"RTX-3060","img":"assets/img/rtx-3060.jpg","id":"4","tipo":"nvidea"},
// {"nome":"RTX-3050","img":"assets/img/rtx-3050.jpg","id":"5","tipo":"nvidea"},
// {"nome":"RTX-2080","img":"assets/img/rtx-2080.jpg","id":"6","tipo":"nvidea"},
// {"nome":"RTX-2070","img":"assets/img/rtx-2070.jpg","id":"7","tipo":"nvidea"},
// {"nome":"RTX-2060","img":"assets/img/rtx-2060.jpg","id":"8","tipo":"nvidea"},
// {"nome":"GTX-1660","img":"assets/img/gtx-1660.jpg","id":"9","tipo":"nvidea"},
// {"nome":"GTX-1080","img":"assets/img/gtx-1080.jpg","id":"10","tipo":"nvidea"},
// {"nome":"GTX-1050","img":"assets/img/gtx-1050.jpg","id":"11","tipo":"nvidea"},
// {"nome":"GT-1030","img":"assets/img/gt-1030.jpg","id":"12","tipo":"nvidea"},
// {"nome":"RX-6900XT","img":"assets/img/rx-6900xt.jpg","id":"13","tipo":"amd-vga"},
// {"nome":"RX-6800XT","img":"assets/img/rx-6800xt.jpg","id":"14","tipo":"amd-vga"},
// {"nome":"RX-6750XT","img":"assets/img/rx-6750xt.jpg","id":"15","tipo":"amd-vga"},
// {"nome":"RX-6700XT","img":"assets/img/rx-6700xt.jpg","id":"16","tipo":"amd-vga"},
// {"nome":"RX-6600XT","img":"assets/img/rx-6600xt.jpg","id":"17","tipo":"amd-vga"},
// {"nome":"RX-570","img":"assets/img/rx-570.jpg","id":"18","tipo":"amd-vga"},
// {"nome":"RX-550","img":"assets/img/rx-550.jpg","id":"19","tipo":"amd-vga"},
// {"nome":"AXRX-550","img":"assets/img/axrx-550.jpg","id":"20","tipo":"amd-vga"},
// {"nome":"i9-12900K","img":"assets/img/i9-12900K.jpg","id":"21","tipo":"processador"},
// {"nome":"i9-12900KF","img":"assets/img/i9-12900KF.jpg","id":"22","tipo":"processador"},
// {"nome":"i9-11900K","img":"assets/img/i9-11900K.jpg","id":"23","tipo":"processador"},
// {"nome":"i9-10900K","img":"assets/img/i9-10900K.jpg","id":"24","tipo":"processador"},
// {"nome":"RYZEN-9-5950X","img":"assets/img/amd-5950x.jpg","id":"25","tipo":"processador"},
// {"nome":"RYZEN-9-5900X","img":"assets/img/amd-5900x.jpg","id":"26","tipo":"processador"},
// {"nome":"RYZEN-7-5700G","img":"assets/img/amd-5700g.jpg","id":"27","tipo":"processador"},
// {"nome":"RYZEN-5-5600G","img":"assets/img/amd-5600g.jpg","id":"28","tipo":"processador"},
// {"nome":"DDR5-A","img":"assets/img/ddr5.jpg","id":"29","tipo":"ram"},
// {"nome":"DDR5-B","img":"assets/img/ddr5.jpg","id":"30","tipo":"ram"},
// {"nome":"DDR5-C","img":"assets/img/ddr5.jpg","id":"31","tipo":"ram"},
// {"nome":"DDR4-A","img":"assets/img/ddr4.jpg","id":"32","tipo":"ram"},
// {"nome":"DDR4-B","img":"assets/img/ddr4.jpg","id":"33","tipo":"ram"},
// {"nome":"DDR4-C","img":"assets/img/ddr4.jpg","id":"34","tipo":"ram"},
// {"nome":"DDR3-A","img":"assets/img/ddr3.jpg","id":"35","tipo":"ram"},
// {"nome":"DDR3-B","img":"assets/img/ddr3.jpg","id":"36","tipo":"ram"},
// {"nome":"SSD-NVMe-A","img":"assets/img/ssd1.jpg","id":"37","tipo":"ssd"},
// {"nome":"SSD-NVMe-B","img":"assets/img/ssd2.jpg","id":"38","tipo":"ssd"},
// {"nome":"SSD-NVMe-C","img":"assets/img/ssd3.jpg","id":"39","tipo":"ssd"},
// {"nome":"SSD-NVMe-D","img":"assets/img/ssd4.jpg","id":"40","tipo":"ssd"},
// {"nome":"SSD-Sata-A","img":"assets/img/ssd5.jpg","id":"41","tipo":"ssd"},
// {"nome":"SSD-Sata-B","img":"assets/img/ssd6.jpg","id":"42","tipo":"ssd"},
// {"nome":"SSD-Sata-C","img":"assets/img/ssd7.jpg","id":"43","tipo":"ssd"},
// {"nome":"SSD-Sata-D","img":"assets/img/ssd8.jpg","id":"44","tipo":"ssd"},
// {"nome":"Modular-A","img":"assets/img/fonte1.jpg","id":"45","tipo":"fontes"},
// {"nome":"Modular-B","img":"assets/img/fonte1.jpg","id":"46","tipo":"fontes"},
// {"nome":"Modular-C","img":"assets/img/fonte2.jpg","id":"47","tipo":"fontes"},
// {"nome":"Modular-D","img":"assets/img/fonte2.jpg","id":"48","tipo":"fontes"},
// {"nome":"Modular-E","img":"assets/img/fonte3.jpg","id":"49","tipo":"fontes"},
// {"nome":"Modular-F","img":"assets/img/fonte3.jpg","id":"50","tipo":"fontes"},
// {"nome":"Modular-G","img":"assets/img/fonte4.jpg","id":"51","tipo":"fontes"},
// {"nome":"Modular-H","img":"assets/img/fonte4.jpg","id":"52","tipo":"fontes"}];

// const loadHardwares =function(){
//     for(let i=0;i<hardwares.length;i++){
//         hardwareInstancias.push(new Hardware(hardwares[i].nome,hardwares[i].img,hardwares[i].id,hardwares[i].tipo))
//     }
//     verificaFavoritos();
//     loadLocal();
//     criaCarrousel('nvidea');
//     criaCarrousel('processador');
//     criaCarrousel('ram');
//     criaCarrousel('amd-vga');
//     criaCarrousel('ssd');
//     criaCarrousel('fontes');
//     slider();
//     removePlaceholderCarousel();
// }