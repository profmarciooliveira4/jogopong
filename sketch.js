//Jogador 1 Jogue com W e S, Jogador 2 jogue com as setas, clique com o mouse para abrir o jogo em tela cheia

//variáveis de imagem
let fundo;
let raquete;
let bolinha;

//variáveis de som
let trilha;
let ponto;
let raquetada;

//précarregamento
function preload(){
  trilha = loadSound("Trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  }

//variáveis da bolinha
let xBolinha = 384/2;
let yBolinha = 240;
let diametro = 25;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//variáveis da raquete
let xRaquete = 15;
let yRaquete = 250;
let raqueteComprimento = 15;
let raqueteAltura = 200;

//variáveis do oponente
let xRaqueteOponente = 1330;
let yRaqueteOponente = 250;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//tamanho da tela
function setup()
  {createCanvas(1920, 1080);
  fundo = loadImage('fundo.png');
  raquete = loadImage('raquete.png');
  bolinha = loadImage('bolinha.png');
  tint(random(0, 255),random(0, 255),random(0, 255));
  trilha.setVolume(0.5)
  trilha.loop();
  }

//funções
function draw() {
  image(fundo, 0, 0)
  posicionaBolinha();
  sobreposicaoBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  Raquete();
  RaqueteOp();
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  verificaColisaoRaqueteOponente()
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  reposicionaBolinha();
    }

//desenha bolinha
function posicionaBolinha(){
  circle(xBolinha, yBolinha, diametro);
  }

//coloca o desenho da bolinha por cima do objeto
function sobreposicaoBolinha(){
  image(bolinha, xBolinha-raio, yBolinha-raio)
  }

//movimento bolinha
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  }

//verifica a colisão da bolinha com a borda
function verificaColisaoBorda(){
  if (yBolinha + raio> height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1.005;
      }
        }

//desenha a raquete
function Raquete(){
  image(raquete, xRaquete, yRaquete);
  }

//desenha o oponente
function RaqueteOp(){
  image(raquete, xRaqueteOponente, yRaqueteOponente);
  }

//teclas da raquete e velocidade
function movimentaMinhaRaquete(){
  if (keyIsDown(87) && (yRaquete>=0)){
  yRaquete -= 9;}
  if (keyIsDown(83) && (yRaquete<=580)){
  yRaquete += 9;}
    }

//verifica se a bolinha colidiu com a raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
  yBolinha - raio < yRaquete + raqueteAltura && 
  yBolinha + raio > yRaquete){
  velocidadeXBolinha *= -1;
  raquetada.play();
  tint(random(0, 255),random(0, 255),random(0, 255));
  }
    }

//verifica se a bolinha colidiu com a raquete
function verificaColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente && 
  yBolinha + raio < yRaqueteOponente + raqueteAltura && 
  yBolinha - raio > yRaqueteOponente){
  velocidadeXBolinha *= -1;
  raquetada.play();
  tint(random(0, 255),random(0, 255),random(0, 255));
  }
    }

//movimento da raquete do oponente
function movimentaRaqueteOponente(){
   if (keyIsDown(UP_ARROW) && (yRaqueteOponente>=0)){
  yRaqueteOponente -= 9;}
  if (keyIsDown(DOWN_ARROW) && (yRaqueteOponente<=580)){
  yRaqueteOponente += 9;}
    }

//marca os pontos
function marcaPonto(){
  if (xBolinha > 1400){
  meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 0){
  pontosDoOponente += 1;
  ponto.play();
  }
    }

function reposicionaBolinha(){
  if (xBolinha<0 || xBolinha>1400){
  xBolinha=700;
  yBolinha=360;
  velocidadeXBolinha *= -1;
  }
  }

//placar
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(1080, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 1100, 26);
    }

//define tela cheia ao pressionar o mouse
function mousePressed(){
  let fs = fullscreen();
  fullscreen(!fs);
      }

//redimensiona os objetos
function windowResized() {
  if (fullscreen()){
  resizeCanvas(windowWidth, windowHeight);
    fundo.resize(windowWidth, windowHeight);
    raquete.resize(15,200);
    bolinha.resize(25,25);
      }
      }
