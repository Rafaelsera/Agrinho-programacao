let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 6; // Número de pares de cartas
let isGameOver = false;

// Estrutura para uma carta
class Card {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isFlipped = false;
    this.isMatched = false;
    this.width = 100;
    this.height = 100;
  }

  show() {
    if (this.isFlipped || this.isMatched) {
      fill(255);
      rect(this.x, this.y, this.width, this.height);
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(0);
      text(this.value, this.x + this.width / 2, this.y + this.height / 2);
    } else {
      fill(150);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  contains(px, py) {
    return px > this.x && px < this.x + this.width && py > this.y && py < this.y + this.height;
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  reset() {
    this.isFlipped = false;
    this.isMatched = false;
  }
}

function setup() {
  createCanvas(800, 600);
  createRestartButton();  // Criando o botão de reiniciar

  startNewGame();
}

function startNewGame() {
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  isGameOver = false;

  let values = ['Trigo', 'Milho', 'Arroz', 'Feijão', 'Soja', 'Aveia', 'Trigo', 'Milho', 'Arroz', 'Feijão', 'Soja', 'Aveia'];
  shuffle(values, true); // Embaralha as cartas

  let startX = 100;
  let startY = 100;
  let spacing = 120;

  // Cria as cartas
  for (let i = 0; i < totalPairs * 2; i++) {
    let x = startX + (i % 4) * spacing;
    let y = startY + Math.floor(i / 4) * spacing;
    cards.push(new Card(x, y, values[i]));
  }
}

function draw() {
  background(220);

  // Mostra as cartas
  for (let card of cards) {
    card.show();
  }

  // Verifica se o jogo acabou
  if (matchedPairs === totalPairs) {
    isGameOver = true;
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Você ganhou! Clique em 'Reiniciar' para jogar novamente.", width / 4, height / 4);
  }
}

function mousePressed() {
  if (isGameOver) return; // Não faz nada se o jogo acabou

  for (let card of cards) {
    if (card.contains(mouseX, mouseY) && !card.isFlipped && flippedCards.length < 2) {
      card.flip();
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkMatch();
      }
      break;
    }
  }
}

function checkMatch() {
  if (flippedCards[0].value === flippedCards[1].value) {
    flippedCards[0].isMatched = true;
    flippedCards[1].isMatched = true;
    matchedPairs++;
  } else {
    setTimeout(() => {
      flippedCards[0].flip();
      flippedCards[1].flip();
      flippedCards = [];
    }, 1000);
  }
}

// Função para criar o botão de reiniciar
function createRestartButton() {
  let button = createButton('Reiniciar');
  button.position(width / 2 - 50, height - 100);
  button.mousePressed(startNewGame); // Chama a função que reinicia o jogo
}

function shuffle(array, randomize) {
  if (randomize) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  return array;
}
