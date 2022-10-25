class Hardware{
    constructor(nome,foto,id,tipo,info='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quo eius suscipit repellendus doloribus neque deleniti fugit labore eum reprehenderit architecto accusamus harum officiis rerum, voluptatum expedita nostrum recusandae laborum!'){

        this.dados={'nome':nome, 'foto':foto, 'tipo':tipo, 'info':info, "id":id}
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

    criaElementoCarrossel(){
        return `
        <div class="cartao-conteudo">
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#Modal${this.dados.nome}">
                <img src="${this.dados.foto}" alt="Imgem ${this.dados.nome}" title="${this.dados.nome}">                                    
            </button>
            <div class="texto-titulo-componentes">
                ${criaTituloCarrousel(this.dados.nome)}
            </div>
        </div>`
    }

    criaModal(){
        let div =document.createElement('div')
        div.setAttribute('id',`Modal${this.dados.nome}`)
        div.classList.add('zindex999', 'modal', 'fade')
        div.setAttribute('tabindex','-1')
        div.setAttribute('aria-labelledby',`Modal${this.dados.nome}Label`)
        div.setAttribute('aria-hidden',`true`)
        div.innerHTML=`
            <div class="modal-dialog">
                <div class="modal-customizado modal-content">
                    <div class="modal-customizado-header modal-header">
                        <h5 class="modal-title" id="Modal${this.dados.nome}Label">${this.dados.nome}&nbsp;&nbsp;</h5><button id='${this.dados.nome}' class="favoritos-coracao" onclick="${this.dados.id}.actionFav()"><i class="fa-regular fa-heart"></i></button>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <span class="modal-img"><img src="${this.dados.foto}" alt=""></span>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quo eius suscipit repellendus doloribus neque deleniti fugit labore eum reprehenderit architecto accusamus harum officiis rerum, voluptatum expedita nostrum recusandae laborum!</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quo eius suscipit repellendus doloribus neque deleniti fugit labore eum reprehenderit architecto accusamus harum officiis rerum, voluptatum expedita nostrum recusandae laborum!</p>
                    </div>                                          
                </div>
            </div>
        `
        let modais=document.getElementById('modal')
        modais.appendChild(div)
    }
}



















hardware1= new Hardware('RTX-3090',"assets/img/rtx-3090.jpg","hardware1","nvidea")
hardware2= new Hardware('RTX-3080',"assets/img/rtx-3080.jpg","hardware2","nvidea")
hardware3= new Hardware('RTX-3070',"assets/img/rtx-3070.jpg","hardware3","nvidea")
hardware4= new Hardware('RTX-3060',"assets/img/rtx-3060.jpg","hardware4","nvidea")
hardware5= new Hardware('RTX-3050',"assets/img/rtx-3050.jpg","hardware5","nvidea")
hardware6= new Hardware('RTX-2080',"assets/img/rtx-2080.jpg","hardware6","nvidea")
hardware7= new Hardware('RTX-2070',"assets/img/rtx-2070.jpg","hardware7","nvidea")
hardware8= new Hardware('RTX-2060',"assets/img/rtx-2060.jpg","hardware8","nvidea")
hardware9= new Hardware('GTX-1660',"assets/img/gtx-1660.jpg","hardware9","nvidea")
hardware10= new Hardware('GTX-1080',"assets/img/gtx-1080.jpg","hardware10","nvidea")
hardware11= new Hardware('GTX-1050',"assets/img/gtx-1050.jpg","hardware11","nvidea")
hardware12= new Hardware('GT-1030',"assets/img/gt-1030.jpg","hardware12","nvidea")
hardware13= new Hardware('RX-6900XT',"assets/img/rx-6900xt.jpg","hardware13","amd-vga")
hardware14= new Hardware('RX-6800XT',"assets/img/rx-6800xt.jpg","hardware14","amd-vga")
hardware15= new Hardware('RX-6750XT',"assets/img/rx-6750xt.jpg","hardware15","amd-vga")
hardware16= new Hardware('RX-6700XT',"assets/img/rx-6700xt.jpg","hardware16","amd-vga")
hardware17= new Hardware('RX-6600XT',"assets/img/rx-6600xt.jpg","hardware17","amd-vga")
hardware18= new Hardware('RX-570',"assets/img/rx-570.jpg","hardware18","amd-vga")
hardware19= new Hardware('RX-550',"assets/img/rx-550.jpg","hardware19","amd-vga")
hardware20= new Hardware('AXRX-550',"assets/img/axrx-550.jpg","hardware20","amd-vga")
hardware21= new Hardware('i9-12900K',"assets/img/i9-12900K.jpg","hardware21","processador")
hardware22= new Hardware('i9-12900KF',"assets/img/i9-12900KF.jpg","hardware22","processador")
hardware23= new Hardware('i9-11900K',"assets/img/i9-11900K.jpg","hardware23","processador")
hardware24= new Hardware('i9-10900K',"assets/img/i9-10900K.jpg","hardware24","processador")
hardware25= new Hardware('RYZEN-9-5950X',"assets/img/amd-5950x.jpg","hardware25","processador")
hardware26= new Hardware('RYZEN-9-5900X',"assets/img/amd-5900x.jpg","hardware26","processador")
hardware27= new Hardware('RYZEN-7-5700G',"assets/img/amd-5700g.jpg","hardware27","processador")
hardware28= new Hardware('RYZEN-5-5600G',"assets/img/amd-5600g.jpg","hardware28","processador")


const favoritosIntancias=[
    hardware1,
    hardware2,
    hardware3,
    hardware4,
    hardware5,
    hardware6,
    hardware7,
    hardware8,
    hardware9,
    hardware10,
    hardware11,
    hardware12,
    hardware13,
    hardware14,
    hardware15,
    hardware16,
    hardware17,
    hardware18,
    hardware19,
    hardware20,
    hardware21,
    hardware22,
    hardware23,
    hardware24,
    hardware25,
    hardware26,
    hardware27,
    hardware28,
    ]


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






document.addEventListener('DOMContentLoaded',function(){criaBanner();})
document.addEventListener('DOMContentLoaded',function(){criaCarrousel('nvidea');})
document.addEventListener('DOMContentLoaded',function(){criaCarrousel('amd-vga');})
document.addEventListener('DOMContentLoaded',function(){criaCarrousel('processador');})
document.addEventListener('DOMContentLoaded',function(){criaModais();})
document.addEventListener('DOMContentLoaded',function(){slider();})
// loadLocal()

