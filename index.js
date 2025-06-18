import { canvas, context, SQUARE_SIZE } from './canvas.js';

class Person {
	/**
	 * Represents a Person.
	 * @constructor
	 * @param {HTMLCanvasElement} canvas - The target canvas to render the person
	 */
	constructor(canvas) {
		/**
		 *  @type {HTMLCanvasElement}
		 */
		this.canvas = canvas;
		/**
		 *  @type {number}
		 */
		this.size = SQUARE_SIZE;
		/**
		 *  @type {number}
		 */
		this.x = (this.canvas.width - SQUARE_SIZE) * Math.random();
		/**
		 *  @type {number}
		 */
		this.y = (this.canvas.height - SQUARE_SIZE) * Math.random();
		/**
		 *  @type {number}
		 */
		this.vx = 20;
		/**
		 *  @type {number}
		 */
		this.vy = 20;
		/**
		 *  @type {number}
		 */
		this.amountX = 0.2;
		/**
		 *  @type {number}
		 */
		this.amountY = 0.1;
	}

	draw() {
		context?.fillRect(this.x, this.y, this.size, this.size);
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
		return this.x + this.size + this.vx < this.canvas.width;
	}
	canMoveUp() {
		return this.y - this.vy > 0;
	}
	canMoveDown() {
		return this.y + this.size + this.vy < this.canvas.width;
	}
	isInsideBordersX() {
		return this.x + this.size < this.canvas.width && this.x > 0;
	}
	isInsideBordersY() {
		return this.y + this.size < this.canvas.height && this.y > 0;
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
const p1 = canvas && new Person(canvas);
const p2 = canvas && new Person(canvas);

function draw() {
	if (!p1 || !p2) {
		throw new Error('Persons were not defined');
	}
	if (!canvas) {
		throw new Error('Canvas is not defined');
	}
	context?.clearRect(0, 0, canvas.width, canvas.height);
	p1.draw();
	p2.draw();
	p1.moveRandomly();
	p2.moveRandomly();
	p1.checkWallsCollision();
	p2.checkWallsCollision();

	window.requestAnimationFrame(draw);
}

window.draw = draw;
