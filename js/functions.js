let palavras = []

//Função que utiliza http request para obter os 20 objetos. Aqui é realizado um "FILTER" para retornar a quantidade solicitada.
function randomEstado() {  
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.overrideMimeType("application/json");
  xmlHttp.open( "GET", "https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Cidades.json", false ); // false for synchronous request
  xmlHttp.send( null );
  palavras = JSON.parse(xmlHttp.responseText); 
  palavras = palavras.filter(palavras => palavras.ID < 21) 
  console.log("Cidades selecionadas: ", palavras);
  populaTabela();
  usaCall();
  console.log('############# Função recursiva para soletrar cidade: ##################');
  mostraCaracteresRecursiva(palavras[getRandomInt(1,20)]["Nome"]);
  utilizaPrototype();
}

//Função para cria cada linha da tabela no HTML com os objetos da http request.  Aqui é realizado um "MAP" para criar cada row da table.
function populaTabela(){
    if(Array.isArray(palavras)){
        $("#tableClient tbody").html("")
        var cidadesPorEstado = palavras.map(function(item){
            return `<tr>
                        <td>${item.ID}</td>
                        <td>${item.Nome}</td>
                        <td>${item.Estado}</td>
                    </tr>`;
        });
        document.querySelector("#tableClient tbody").innerHTML = cidadesPorEstado.join("");
    }    
}

//Função com a utilização do this.
function showEstado () {
    console.log('############# Função com o this: ##################');
    console.log('ID: ', this.ID);
    console.log('Nome: ', this.Nome);
    console.log('Estado: ', this.Estado);
}

//Função para selecionar um número aleatório de 1 a 20.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Utilização do call para executar a função com this, apresentando no console um dos registros da array de cidades.
function usaCall(){
    showEstado.call(palavras[getRandomInt(1,20)]);
}


//Função recursiva para soletrar 
function mostraCaracteresRecursiva(string) {
    // debugger;
    // Caso base
    if (string == '') {
        return;
    }
    //console.log(string);
    console.log(string[0]);
    mostraCaracteresRecursiva(string.substr(1));
    //console.log(string);
    // return; -> existe de forma implícita
}

//Função para remover um elemento da array.  Aqui é realizado um "REDUCE" para remover o elemento.
function reduceFunction(){
    var a = getRandomInt(0,19).toString();
    palavras = palavras.reduce((acc, curr) => {
        if (curr.ID !== a) acc.push(curr);
        return acc;
      }, []);
    populaTabela();
}


//Função para remover um elemento da array.  Aqui é realizado um "REDUCE" para remover o elemento.
function utilizaPrototype(){ 
    console.log('############# Prototype que lista cada registro, o ID e o array: ##################');
    Array.prototype.forEach2 = function(func, thisArg){
        for(let i = 0; i < this.length; i++){
            func.call(thisArg, this[i], i, this);
        }
    } 
    palavras.forEach2(function (c, i, array) {
        //console.log(this);
        console.log(c, i, array);
    }); 
}


//Inicializa a função para retornar os objetos.
randomEstado();
reduceFunction();

//Utilização do spread operator.
var multiplicaEstado = palavras.reduce((arr, item) => {
    arr = [...arr, parseInt(item.Estado) * getRandomInt(1,20)];
    return arr;
}, []);
console.log('############# Utilização do spread operator ##################');
console.log(multiplicaEstado);

//Utilização do sort (função de alta ordem) para ordernar os valores.
multiplicaEstado.sort(function(a, b){return a-b});
console.log('############# Utilização do sort (função de alta ordem) para ordernar os valores ##################');
console.log(multiplicaEstado);

//Printar array com spread operator.
console.log('############# Printar array com spread operator ##################');
console.log(...palavras);