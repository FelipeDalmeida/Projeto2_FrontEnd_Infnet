function efeitoRolar(event){
    const header =document.querySelector('header'); 
    if(document.documentElement.scrollTop>50){
           
        header.style.backgroundColor='rgba(255, 101, 0.8, 0.8)'
    } else {
        header.style.backgroundColor='rgba(255, 101, 0.8)'
    }
}

function verificaFavoritos(){

    let listaFavoritos=document.getElementById('favoritos')

    if(listaFavoritos.innerHTML==""){
        listaFavoritos.innerHTML="<p>Você ainda não tem favoritos.</p>"  //AO INICIALIZAR A PÁGINA, CASO NÃO TENHA NENHUM FAVORITO OU SE TODOS OS FAVORITOS TIVEREM SIDO REMOVIDOS
    } else if(listaFavoritos.innerHTML=="<p>Você ainda não tem favoritos.</p>"){  //QUANDO O PRIMEIRO FAVORITO FOR INSERIDO, PARA REMOVER O TEXTO DE NÃO TER FAVORITOS
        listaFavoritos.innerHTML=""
    }
}

//função para ler memória
function loadLocal(){
    for(i=0;i<favoritosIntancias.length;i++){
        let id=`favoritos${i+1}`
        let valor=JSON.parse(window.localStorage.getItem(id));
        if(valor){
            if(valor.selecionado){
                favoritosIntancias[i].actionFav()
            }
        }
    }
}
