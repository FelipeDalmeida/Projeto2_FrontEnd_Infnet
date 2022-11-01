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

let bannersInstancia=[];
let banners=[]
const loadBanner=async()=>{
    const responseBanner=await fetch("https://demo7797720.mockable.io/banner");
    banners=await responseBanner.json();
    bannersInstancia=new Banners(banners);
    bannersInstancia.criaBanner();
    document.querySelector("#banner-placeholder").style.display = "none";//inserção
    
}



//Caso o link esteja desativado, comentar a função acima e descomentar codigo de baixo

// banners=[
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

// const loadBanner=function(){
//     bannersInstancia=new Banners(banners);
//     bannersInstancia.criaBanner();
//     document.querySelector("#banner-placeholder").style.display = "none";//inserção
    
// }