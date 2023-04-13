var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	width: 32,
	height: 32,
	speed: 5,
	image: new Image()
};

player.image.src = 'player.png';

var enemies = [];

function drawPlayer() {
	context.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
	for (var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];
		var enemyImage = new Image(); // 新しい Image オブジェクトを作成
		enemyImage.src = 'enemy.png'; // 画像の URL を指定
		context.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
	}
}

function updateEnemies() {
	for (var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];
		enemy.y += enemy.speed;

		if (enemy.y > canvas.height) {
			enemies.splice(i, 1);
			i--;
		}
	}
}

function spawnEnemies() {
	var enemy = {
		x: Math.random() * (canvas.width - 32),
		y: -32,
		width: 32,
		height: 32,
		speed: 3
	};

	enemies.push(enemy);
}

setInterval(function() {
	spawnEnemies();
}, 1000);

function update() {
	updateEnemies();
	drawPlayer();
	drawEnemies();
}

setInterval(function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	update();
}, 1000 / 60);

document.addEventListener('keydown', function(event) {
	if (event.keyCode === 37) {
		player.x -= player.speed;
  	} else if (event.keyCode === 39) {
    	player.x += player.speed;
  	}
});