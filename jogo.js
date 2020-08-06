console.log('FlappyBird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'
const som_CAIU = new Audio();
som_CAIU.src = './efeitos/caiu.wav'
const som_PONTO = new Audio();
som_PONTO.src = './efeitos/ponto.wav';
const som_PULO = new Audio();
som_PULO.src = './efeitos/pulo.wav';
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
let frames = 0;
let paraJOGO = false;

//Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,//diferença da altura da imagem em relação a tela do canvas
    desenha() {
        contexto.fillStyle = '#70c5ce'; //cor de fundo
        contexto.fillRect(0,0, canvas.width, canvas.height); //preenchimento da cor de fundo
        contexto.drawImage(
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na imagem
            planoDeFundo.x, planoDeFundo.y, //Posição do recorte da imagem na tela do canvas
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho da imagem dentro do canvas
        );
        //preencher toda a tela com o chão
        contexto.drawImage(
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na imagem
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //Posição do recorte da imagem na tela do canvas
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho da imagem dentro do canvas
        );
    },
};

//Chão
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,//diferença da altura da imagem em relação a tela do canvas
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
        desenha() {
            contexto.drawImage(
                sprites, //imagem
                chao.spriteX, chao.spriteY, //Sprite X e Sprite Y
                chao.largura, chao.altura, //Tamanho do recorte na imagem
                chao.x, chao.y, //Posição do recorte da imagem na tela do canvas
                chao.largura, chao.altura, //Tamanho da imagem dentro do canvas
            );
            //preencher toda a tela com o chão
            contexto.drawImage(
                sprites, //imagem
                chao.spriteX, chao.spriteY, //Sprite X e Sprite Y
                chao.largura, chao.altura, //Tamanho do recorte na imagem
                (chao.x + chao.largura), chao.y, //Posição do recorte da imagem na tela do canvas
                chao.largura, chao.altura, //Tamanho da imagem dentro do canvas
            );
        },
    };
    return chao;
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                som_CAIU.play();
                setTimeout(() => {
                    mudaTela(Telas.INICIO);
                }, 500);
                paraJOGO = true;
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY: 0,}, // asa para cima
            {spriteX: 0, spriteY: 26,}, // asa no meio
            {spriteX: 0, spriteY: 52,}, // asa para baixo
            {spriteX: 0, spriteY: 26,}, // asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites, //imagem
                spriteX, spriteY, //Sprite X e Sprite Y
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte na imagem
                flappyBird.x, flappyBird.y, //Posição do recorte da imagem na tela do canvas
                flappyBird.largura, flappyBird.altura, //Tamanho da imagem dentro do canvas
            );
        }
    }
    return flappyBird;
}

//Tela de Inicio
const telaDeInicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 100,
    desenha() {
        contexto.drawImage(
            sprites, //imagem
            telaDeInicio.spriteX, telaDeInicio.spriteY, //Sprite X e Sprite Y
            telaDeInicio.largura, telaDeInicio.altura, //Tamanho do recorte na imagem
            telaDeInicio.x, telaDeInicio.y, //Posição do recorte da imagem na tela do canvas
            telaDeInicio.largura, telaDeInicio.altura, //Tamanho da imagem dentro do canvas
        );
    }
}
const globais = {};
//console.log(globais.flappyBird.altura);
let telaAtiva = {};
function mudaTela(novaTela) {
    telaAtiva = novaTela;
    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
};

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                //cano do céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                //cano do chão
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }
            })
        },
        temColisaoComFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
            if (globais.flappyBird.x >= par.x) {
                //console.log('perdeu');
                
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;

                };
                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                };
            }
            return false;
        },
        pares: [],
        atualiza() {
            const passou100frames = frames % 100 === 0;
            if (passou100frames) {
                console.log('passou 100 frames'); 
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }
            canos.pares.forEach(function(par) {
                par.x = par.x - 2; 
                if (canos.temColisaoComFlappyBird(par)) {
                    console.log('Vc perdeu');
                    som_HIT.play();
                    paraJOGO = true;
                    setTimeout(() => {
                        mudaTela(Telas.INICIO);
                    }, 500);
                }
                if (par.x + canos.largura <= 0) {
                    som_PONTO.play();
                    canos.pares.shift();
                }
            });

        },
    }
    return canos;
}
//Telas
const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            telaDeInicio.desenha();
        },
        click() {
            mudaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha(); 
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        som_PULO.play();
        globais.flappyBird.pula();
    },
    //if (paraJOGO )
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
    }
};


function loop() {
   if (paraJOGO == false) {
        telaAtiva.desenha();
        telaAtiva.atualiza();
        frames = frames + 1;
        requestAnimationFrame(loop);
        console.log(paraJOGO);
   } else {
       //console.log('parar')
        setTimeout(() => {
            console.log('parar')
            mudaTela(Telas.INICIO);
            paraJOGO = false;
            loop()
        }, 500);
   }
};
    


window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaTela(Telas.INICIO);
loop();