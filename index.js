/**
 * @type {(HTMLCanvasElement|null)}
 */
const canvas = document.getElementById('stage');
const context = canvas.getContext('2d');

const span = document.getElementById('number-of-walkers')
const form = document.getElementById('participants-form');


let persons = {};

let PERSONS = 1;

function createNPersons(n = 1){
	console.log(`Creating ${PERSONS} persons`)
	for(let i = 0; i < n; i++){
		persons[i] = new Person(canvas)
	}
}

function init(){
	createNPersons(PERSONS);
}

function draw() {
	if(PERSONS <= 0){
		return
	}
	console.log(PERSONS)
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < PERSONS; i++){
		persons[i].draw()
		persons[i].moveRandomly()
		persons[i].checkWallsCollision()
	}

	window.requestAnimationFrame(draw);
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
	const input = document.getElementById("number-of-participants")
	if(!Number.isNaN(Number(input.value)) && input.value !== ''){
		PERSONS = Number(input.value)
		span.innerHTML = input.value
		createNPersons(PERSONS);
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