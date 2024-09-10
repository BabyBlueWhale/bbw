const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const energyElement = document.getElementById('energy-fill');
const highScoreElement = document.getElementById('high-score');
const messageElement = document.getElementById('message');
const gameOverElement = document.getElementById('game-over');
const nameInputElement = document.getElementById('name-input');
const playerNameInput = document.getElementById('playerName');
const endMessageElement = document.getElementById('end-message');
const playerNameDisplay = document.getElementById('player-name');

// Define button elements for mobile controls
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let energy = 100;
let highScore = 0;
let playerName = '';
let player;
let trashItems = [];
let rareTrashItems = [];
let obstacles = [];
let fishItems = [];
let gameInterval;
let difficultyInterval;
let messageInterval;
let isGameOver = false;
let trashSpeed = 4;
let obstacleSpeed = 5; // Set back to higher for desktop play
let fishSpeed = 2;
let maxEnergy = 100;
let difficultyIntervalTime = 8000; // Initial difficulty interval (8 seconds)
let messages = ["Is that all you got?", "Help the baby blue whale!", "Clean the ocean!"];

const images = {
    background: new Image(),
    trash: new Image(),
    trash2: new Image(),
    whale: new Image(),
    fish: new Image(),
    obstacle: new Image()
};

// Load images with provided paths
images.background.src = 'blue ocean.jpg';
images.trash.src = 'trash.png';
images.trash2.src = 'trash2.png';
images.whale.src = 'whale.png';
images.fish.src = 'fish.png';
images.obstacle.src = 'obstacle.png';

// Add event listeners to check if images load correctly
Object.values(images).forEach(img => {
    img.onload = () => console.log(`Image loaded: ${img.src}`);
    img.onerror = () => console.error(`Failed to load image: ${img.src}`);
});

// Detect if the device is mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.width = isMobile ? 60 : 83; // Smaller for mobile, larger for desktop
        this.height = isMobile ? 60 : 83;
        this.speed = isMobile ? 15 : 10; // Faster for mobile
        this.dx = 0;
    }

    draw() {
        ctx.drawImage(images.whale, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.dx;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }

    move(direction) {
        this.dx = direction === 'left' ? -this.speed : this.speed;
    }

    stop() {
        this.dx = 0;
    }
}

// Event listeners for button controls
leftButton.addEventListener('mousedown', () => player.move('left'));
rightButton.addEventListener('mousedown', () => player.move('right'));

leftButton.addEventListener('mouseup', () => player.stop());
rightButton.addEventListener('mouseup', () => player.stop());

leftButton.addEventListener('touchstart', () => player.move('left'));
rightButton.addEventListener('touchstart', () => player.move('right'));

leftButton.addEventListener('touchend', () => player.stop());
rightButton.addEventListener('touchend', () => player.stop());

class Trash {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = isMobile ? 30 : 40; // Smaller size for mobile
        this.height = isMobile ? 30 : 40;
        this.speed = trashSpeed;
        this.type = type;
    }

    draw() {
        const img = this.type === 'rare' ? images.trash2 : images.trash;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.y = -this.height;
        this.x = Math.random() * (canvas.width - this.width);
    }
}

class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = isMobile ? 30 : 40; // Smaller size for mobile
        this.height = isMobile ? 30 : 40;
        this.speed = fishSpeed;
    }

    draw() {
        ctx.drawImage(images.fish, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.y = -this.height;
        this.x = Math.random() * (canvas.width - this.width);
    }
}

class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = isMobile ? 50 : 100; // Smaller size for mobile, larger for desktop
        this.height = isMobile ? 50 : 100;
        this.speed = obstacleSpeed;
    }

    draw() {
        ctx.drawImage(images.obstacle, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.resetPosition();
        }
    }

    resetPosition() {
        this.y = -this.height;
        this.x = Math.random() * (canvas.width - this.width);
    }
}

function startGame() {
    playerName = playerNameInput.value || "Player";
    playerNameDisplay.textContent = `Player: ${playerName}`; // Display player name

    // Clear and draw background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

    nameInputElement.style.display = 'none';
    gameOverElement.style.display = 'none';

    isGameOver = false;
    score = 0;
    energy = 100;
    trashSpeed = 4;
    obstacleSpeed = isMobile ? 3 : 5; // Slower for mobile, faster for desktop
    fishSpeed = 2;
    scoreElement.textContent = `Score: ${score}`;
    energyElement.style.width = '100%';
    trashItems = [];
    rareTrashItems = [];
    obstacles = [];
    fishItems = [];
    player = new Player();

    createInitialElements();
    gameInterval = setInterval(updateGame, 1000 / 60);
    difficultyInterval = setInterval(increaseDifficulty, difficultyIntervalTime);
    messageInterval = setInterval(showRandomMessage, 10000);
}

function createInitialElements() {
    for (let i = 0; i < 10; i++) {
        trashItems.push(new Trash(Math.random() * canvas.width, Math.random() * canvas.height - canvas.height, 'common'));
    }
    for (let i = 0; i < 5; i++) {
        rareTrashItems.push(new Trash(Math.random() * canvas.width, Math.random() * canvas.height - canvas.height, 'rare'));
    }
    for (let i = 0; i < (isMobile ? 5 : 7); i++) { // Fewer obstacles for mobile
        obstacles.push(new Obstacle(Math.random() * canvas.width, Math.random() * canvas.height - canvas.height));
    }
    for (let i = 0; i < 5; i++) {
        fishItems.push(new Fish(Math.random() * canvas.width, Math.random() * canvas.height - canvas.height));
    }
}

function increaseDifficulty() {
    trashSpeed += 1; 
    obstacleSpeed += isMobile ? 0.5 : 1; // Slower increase on mobile
    fishSpeed += 0.5; 

    if (difficultyIntervalTime > 2000) { 
        difficultyIntervalTime -= 1000; 
        clearInterval(difficultyInterval); 
        difficultyInterval = setInterval(increaseDifficulty, difficultyIntervalTime); 
    }

    console.log(`Difficulty increased: Trash Speed = ${trashSpeed}, Obstacle Speed = ${obstacleSpeed}, Fish Speed = ${fishSpeed}, Next Difficulty in = ${difficultyIntervalTime / 1000} seconds`);
}

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.textContent = messages[randomIndex];
    setTimeout(() => messageElement.textContent = '', 3000);
}

function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();

    trashItems.forEach(trash => {
        trash.update();
        trash.draw();
        if (collision(player, trash)) {
            score += 5;
            scoreElement.textContent = `Score: ${score}`;
            trash.resetPosition();
        }
    });

    rareTrashItems.forEach(trash => {
        trash.update();
        trash.draw();
        if (collision(player, trash)) {
            score += 15;
            scoreElement.textContent = `Score: ${score}`;
            trash.resetPosition();
        }
    });

    obstacles.forEach(obstacle => {
        obstacle.update();
        obstacle.draw();
        if (collisionWithOverlap(player, obstacle, 0.3)) {
            endGame("You failed to clean the ocean.");
        }
    });

    fishItems.forEach(fish => {
        fish.update();
        fish.draw();
        if (collision(player, fish)) {
            energy = Math.min(maxEnergy, energy + 20);
            energyElement.style.width = `${energy}%`;
            fish.resetPosition();
        }
    });

    energy -= 0.1;
    energyElement.style.width = `${Math.max(0, energy)}%`;

    if (energy <= 0) {
        endGame("You failed to clean the ocean.");
    }
}

function collision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj2.height > obj2.y;
}

function collisionWithOverlap(obj1, obj2, overlapThreshold = 0.3) {
    const overlapX = Math.max(0, Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x));
    const overlapY = Math.max(0, Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y));

    const overlapArea = overlapX * overlapY;
    const obj1Area = obj1.width * obj1.height;
    const obj2Area = obj2.width * obj2.height;

    return overlapArea >= Math.min(obj1Area, obj2Area) * overlapThreshold;
}

function endGame(message) {
    clearInterval(gameInterval);
    clearInterval(difficultyInterval);
    clearInterval(messageInterval);
    isGameOver = true;
    gameOverElement.style.display = 'block';
    endMessageElement.textContent = message;

    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = `High Score: ${highScore}`;
        alert(`Congratulations ${playerName}, you reached a new high score!`);
    }
}

// Handle screen resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Improved touch controls for mobile
let touchStartX = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

canvas.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistanceX = touchEndX - touchStartX;

    if (swipeDistanceX > 20) {
        // Swipe right
        player.move('right');
    } else if (swipeDistanceX < -20) {
        // Swipe left
        player.move('left');
    }

    player.stop(); // Stop the player movement immediately after the swipe
});

// Keyboard controls for desktop
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') player.move('left');
    if (e.key === 'ArrowRight') player.move('right');
});

window.addEventListener('keyup', () => player.stop());

nameInputElement.style.display = 'block';
