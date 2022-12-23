/**
 * @type {(HTMLCanvasElement|null)}
 */
const canvas = document.getElementById('stage');
const context = canvas.getContext('2d');

let persons = {};

const PERSONS = 2

for(let i = 0; i < PERSONS; i++){
	persons[i] = new Person(canvas)
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < PERSONS; i++){
		persons[i].draw()
		persons[i].moveRandomly()
		persons[i].checkWallsCollision()
	}

	window.requestAnimationFrame(draw);
}
