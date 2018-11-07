
const controls = {
	w: 'movingForward',
	s: 'movingBackwards',
	a: 'movingLeft',
	d: 'movingRight',
	' ': 'movingUp',
	shift: 'movingDown'
}

export default class TopDownController {

	constructor(camera) {

		this.states = {
			movingForward: false,
			movingBackwards: false,
			movingLeft: false,
			movingRight: false,
			movingUp: false,
			movingDown: false,
		}

		this.velocity = new THREE.Vector3();
		this.camera = camera;

		document.addEventListener('keydown', (event) => {
			let key = event.key || event.keyCode;
			this.states[controls[key.toLowerCase()]] = true;
		})

		document.addEventListener('keyup', (event) => {
			let key = event.key || event.keyCode
			this.states[controls[key.toLowerCase()]] = false;
		})

	}

	update(deltaTime) {

		//Friction
		this.velocity.multiplyScalar(.75); 

		if (this.states.movingForward)
			this.velocity.z = _.clamp(this.velocity.z - 2 * deltaTime, -.1, 0);
		if (this.states.movingBackwards)
			this.velocity.z = _.clamp(this.velocity.z + 2 * deltaTime, 0, .1);
		if (this.states.movingLeft)
			this.velocity.x = _.clamp(this.velocity.x - 2 * deltaTime, -.1, 0);
		if (this.states.movingRight)
			this.velocity.x = _.clamp(this.velocity.x + 2 * deltaTime, 0, .1);
		if (this.states.movingDown)
			this.velocity.y = _.clamp(this.velocity.y - 2 * deltaTime, -.1, 0);
		if (this.states.movingUp)
			this.velocity.y = _.clamp(this.velocity.y + 2 * deltaTime, 0, .1);	
		
		this.camera.position.x += this.velocity.x;
		this.camera.position.y += this.velocity.y;
		this.camera.position.z += this.velocity.z;

	}

}