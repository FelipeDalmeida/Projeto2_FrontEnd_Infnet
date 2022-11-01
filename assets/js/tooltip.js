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