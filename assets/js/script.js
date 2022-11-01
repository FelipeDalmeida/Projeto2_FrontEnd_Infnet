

function efeitoRolar(event){  //Efeito de ao rolar o mouse, adiciona transparencia ao header
    const header =document.querySelector('header'); 
    if(document.documentElement.scrollTop>50){
           
        header.style.backgroundColor='rgba(255, 101, 0.8, 0.8)'
    } else {
        header.style.backgroundColor='rgba(255, 101, 0.8)'
    }
}


function removeDisplayNoneLoader(){   //Função para mostrar o conteúdo do site após animação de load
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
})

