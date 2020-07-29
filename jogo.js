console.log('FlappyBird');

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

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
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

function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    requestAnimationFrame(loop);
}

loop();