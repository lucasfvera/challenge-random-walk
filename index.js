const SAMPLES = 1;
const SQUARE_SIZE = 10;
const DISTANCE = 2;

/**
 * @type {(HTMLCanvasElement|null)}
 */
const canvas = document.getElementById('stage');
const context = canvas.getContext('2d');

class Person {
	randomXPosition = (canvas?.width - SQUARE_SIZE) * Math.random();
	randomYPosition = (canvas?.height - SQUARE_SIZE) * Math.random();

	constructor() {
		this.size = SQUARE_SIZE;
		this.x = this.randomXPosition;
		this.y = this.randomYPosition;
		this.vx = 20;
		this.vy = 20;
		this.amountX = 0.2;
		this.amountY = 0.1;
	}

	draw() {
		context.fillRect(this.x, this.y, this.size, this.size);
	}

	moveUp() {
		if (this.canMoveUp()) {
			this.y -= this.vy;
		}
	}
	moveDown() {
		if (this.canMoveDown()) {
			this.y += this.vy;
		}
	}
	moveLeft() {
		if (this.canMoveLeft()) {
			this.x -= this.vx;
		}
	}
	moveRight() {
		if (this.canMoveRight()) {
			this.x += this.vx;
		}
	}
	moveUpRight() {
		this.moveUp();
		this.moveRight();
	}
	moveUpLeft() {
		this.moveUp();
		this.moveLeft();
	}
	moveDownLeft() {
		this.moveDown();
		this.moveLeft();
	}
	moveDownRight() {
		this.moveDown();
		this.moveRight();
	}
	collisionX() {
		this.vx = -this.vx;
		this.reduceSpeedX();
	}
	collisionY() {
		this.vy = -this.vy;
		this.reduceSpeedY();
	}
	reduceSpeedX() {
		if (this.vx > 0) {
			this.vx -= this.amountX;
		} else if (this.vx < 0) {
			this.vx += this.amountX;
		}
	}
	reduceSpeedY() {
		if (this.vy > 0) {
			this.vy -= this.amountY;
		} else if (this.vy < 0) {
			this.vy += this.amountY;
		}
	}
	checkWallsCollision() {
		if (!this.isInsideBordersY()) {
			this.collisionY();
		}
		if (!this.isInsideBordersX()) {
			this.collisionX();
		}
	}
	canMoveLeft() {
		return this.x - this.vx > 0;
	}
	canMoveRight() {
		return this.x + this.size + this.vx < canvas?.width;
	}
	canMoveUp() {
		return this.y - this.vy > 0;
	}
	canMoveDown() {
		return this.y + this.size + this.vy < canvas?.width;
	}
	isInsideBordersX() {
		return this.x + this.size < canvas?.width && this.x > 0;
	}
	isInsideBordersY() {
		return this.y + this.size < canvas?.height && this.y > 0;
	}
	moveRandomly() {
		const movementOption = Math.floor(8 * Math.random());
		switch (movementOption) {
			case 0:
				this.moveUp();
				break;
			case 1:
				this.moveDown();
				break;
			case 2:
				this.moveLeft();
				break;
			case 3:
				this.moveRight();
				break;
			case 4:
				this.moveUpLeft();
				break;
			case 5:
				this.moveUpRight();
				break;
			case 6:
				this.moveDownLeft();
				break;
			case 7:
				this.moveDownRight();
				break;
			default:
				break;
		}
	}
}

const movementOption = Math.floor(4 * Math.random());
const p1 = new Person();
const p2 = new Person();

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	p1.draw();
	p2.draw();
	p1.moveRandomly();
	p2.moveRandomly();
	p1.checkWallsCollision();
	p2.checkWallsCollision();

	window.requestAnimationFrame(draw);
}
