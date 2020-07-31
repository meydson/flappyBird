console.log('FlappyBird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,//diferença da altura da imagem em relação a tela do canvas
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
            if (fazColisao(flappyBird, chao)) {
                som_HIT.play();
                setTimeout(() => {
                    mudaTela(Telas.INICIO);
                }, 500);
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        desenha() {
            contexto.drawImage(
                sprites, //imagem
                flappyBird.spriteX, flappyBird.spriteY, //Sprite X e Sprite Y
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
//Telas
const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            telaDeInicio.desenha();
        },
        click() {
            mudaTela(Telas.JOGO);
        },
        atualiza() {
            
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaTela(Telas.INICIO);
loop();