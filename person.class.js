const SQUARE_SIZE = 10;

class Person {
	constructor(canvas) {
		this.size = SQUARE_SIZE;
		this.x = (canvas?.width - SQUARE_SIZE) * Math.random();
		this.y = (canvas?.height - SQUARE_SIZE) * Math.random();
		this.vx = 1;
		this.vy = 1;
		this.amountX = 0.2;
		this.amountY = 0.1;
	}

    context = canvas.getContext('2d');

	draw() {
		this.context.fillRect(this.x, this.y, this.size, this.size);
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
