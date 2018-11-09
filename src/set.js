

export default class Set {

	constructor() {
		this.actors = [];
		this.systems = [];
	}

	registerActor(actor) {
		actor.set = this;
		this.actors.push(actor);
	}

	registerSystem(system) {
		system.set = this;
		this.systems.push(system);
	}

	update(delta) {
		if (!this.systems)
			return
		this.systems.forEach(system => system.update(delta));
	}

}