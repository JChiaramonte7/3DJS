
import System from './ecs/system';

const controls = {
	w: 'movingUp',
	s: 'movingDown',
	a: 'movingLeft',
	d: 'movingRight',
}

export default class TopDownController extends System {

	constructor() {
		super();
		this.states = {
			movingLeft: false,
			movingRight: false,
			movingUp: false,
			movingDown: false,
		}

		this.velocity = new THREE.Vector3();

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

		this.velocity.multiplyScalar(.75); 

		if (this.states.movingLeft)
			this.velocity.x = _.clamp(this.velocity.x - 2 * deltaTime, -.1, 0);
		if (this.states.movingRight)
			this.velocity.x = _.clamp(this.velocity.x + 2 * deltaTime, 0, .1);
		if (this.states.movingDown)
			this.velocity.y = _.clamp(this.velocity.y - 2 * deltaTime, -.1, 0);
		if (this.states.movingUp)
			this.velocity.y = _.clamp(this.velocity.y + 2 * deltaTime, 0, .1);	

		this.set.actors.forEach( actor => {

			if (actor.name == "player") {

				actor.props.forEach( prop => {

					if ( prop.type === "Mesh" || prop.type === "Camera" ) {

						prop.object.position.x += this.velocity.x;
						prop.object.position.y += this.velocity.y;
						prop.object.position.z += this.velocity.z;

					}

				})

			}

			

		})

	}

}