
import {print} from './utils'

export default class Actor {

	constructor() {
		this.position = new THREE.Vector3();
		this.props = []
	}

	addProp(prop) {
		this.props.push(prop);
	}

	getProps() {
		return this.props;
	}

}