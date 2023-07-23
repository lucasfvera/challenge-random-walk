/**
 * @type {(HTMLCanvasElement|null)}
 */
const canvas = document.getElementById('stage');
const context = canvas.getContext('2d');

const span = document.getElementById('number-of-walkers')
const form = document.getElementById('participants-form');


let persons = {};

let NUMBER_OF_PERSONS = 1;

function createNPersons(n = 1){
	console.log(`Creating ${NUMBER_OF_PERSONS} persons`)
	for(let i = 0; i < n; i++){
		// Random color assign
		const type = Math.floor(3 * Math.random())
		persons[i] = new Person(canvas, type)
	}
}

function init(){
	createNPersons(NUMBER_OF_PERSONS);
}

function draw() {
	if(NUMBER_OF_PERSONS <= 0){
		return
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < NUMBER_OF_PERSONS; i++){
		persons[i].draw()
		persons[i].moveRandomly()
		persons[i].checkWallsCollision()
		persons[i].checkPersonCollision(persons)
	}

	window.requestAnimationFrame(draw);
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
	const input = document.getElementById("number-of-participants")
	if(!Number.isNaN(Number(input.value)) && input.value !== ''){
		NUMBER_OF_PERSONS = Number(input.value)
		span.innerHTML = input.value
		createNPersons(NUMBER_OF_PERSONS);
	}

    // You must return false to prevent the default form behavior
    return false;
}

if (form.attachEvent) {
	form.attachEvent("submit", processForm);
} else {
	form.addEventListener("submit", processForm);
}

init();