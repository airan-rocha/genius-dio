let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const myScore = document.getElementById('myScore');
const alerta = document.getElementById('alerta');
var btAlerta = document.querySelector('#alerta img');

//Math.random() //gera valor aleatório
//Math.floor(x) //arredonda o valor
//Math.floor(Math.random() * 4)  //retorna um valor entre 0 e 3
//Math.floor(Math.random() * (max - min)) + min  //retornar um valor entre o valor máximo e o valor mínimo

//criar ordem aleatória de cores
let shuftleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }else if(clickedOrder.length == order.length) {
            exibirAlerta(1);
            score++;
            btAlerta.onclick = () => nextLevel();
        }
    }
}

//função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    }else if ( color == 1) {
        return red;
    }else if ( color == 2) {
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

//função para próximo nível do jogo
let nextLevel = () => {
    fecharAlerta();
    myScore.textContent = score;
    shuftleOrder();
}

//função para game over
let gameOver= () => {
    exibirAlerta(2);
    order = [];
    clickedOrder = [];

    btAlerta.onclick = () => {
        exibirAlerta(0);
        myScore.textContent = "- - -"
        btAlerta.onclick = () => playGame();
    };
}

//função para iniciar o jogo
let playGame = () => {
    score = 0;
    myScore.textContent = score;

    nextLevel();
}

/**
 * 
 * @param {*} number 0- inicio; 1- campeão; 2- perdeu
 */
let exibirAlerta = (number) => {
    alerta.innerHTML = (number == 0)? "<img src='imagens/iniciar.png'>" :
                       (number == 1)? "<img src='imagens/campeao.png'>" :
                       (number == 2)? `<p>Your Score: ${score}</p> <img src='imagens/perdeu.png'>` : '';
    alerta.style.visibility = 'visible';
    btAlerta = document.querySelector('#alerta img');
}

let fecharAlerta = () => alerta.style.visibility= 'hidden';

//evento de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

btAlerta.onclick = () => playGame();

// playGame();