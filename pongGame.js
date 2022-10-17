//Variável Bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//Velocidade Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variável Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 8;
let raqueteAltura = 90;

//Variável Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let impacto = false;

//Placar de pontos
let meusPontos = 0;
let oponentePontos = 0;

let raquetada;
let ponto;
let trilha;
function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

// elemento de tela que define suas dimensões em pixels
function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

//executa continuamente as linhas de código contidas dentro de seu bloco até que o programa seja interrompido
function draw() {
    background(0);
    mostraBolinha();
    moveBolinha();
    bordaBolinha();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    moveRaquete();
    moveRaqueteOponente();
    //impactoRaquete();
    impactoRaqueteBiblioteca(xRaquete, yRaquete);
    impactoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();

}

//Exibe o elemento Bolinha
function mostraBolinha (){
    circle(xBolinha, yBolinha, diametro);
}

//Movimenta o elemento Bolinha
function moveBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

//Difine a área de impacto da Bolinha
function bordaBolinha(){

    if (xBolinha + raio > width || xBolinha - raio < 0){
        velocidadeXBolinha *= -1;
    }

    if (yBolinha + raio > height || yBolinha - raio < 0){
        velocidadeYBolinha *= -1;
    }
}

//Exibe o elemento Raquete
function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

//Movimenta o elemento Raquete
function moveRaquete(){
    if(keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }
    if(keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

//Movimenta o elemento RaqueteOponente
function moveRaqueteOponente(){
    if(keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if(keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}

//Difine a área de impacto da Raquete para com a Bolinha
function impactoRaquete(x, y){
   if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1
      raquetada.play();
   }
}

//biblioteca (GITHUB) para impacto da Bolinha com Raquete
function impactoRaqueteBiblioteca(x, y){
    impacto = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (impacto){
        velocidadeXBolinha *= -1
        raquetada.play();
    }
}

function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140,0));
    rect(150,10,40,20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255,140,0));
    rect(450,10,40,20);
    fill(255);
    text(oponentePontos, 470, 26)
}

function marcaPonto(){
    if (xBolinha > 590){
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10){
        oponentePontos += 1;
        ponto.play();
    }
}