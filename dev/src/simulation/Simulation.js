import Configuration from "./Configuration.js";
import Resource from "./core/Resource.js";
import Agent from "./core/Agent.js";

const Simulation = new (class {

    #World = {
        width: 1001, // 1024,
        height: 591 // 768
    };

    #timePassed = 0;

    #speedFactor = 1;

    #isRunning = false;

    #resources = [];

    #agents = [];

    get timePassed() {
        return this.#timePassed;
    }

    set timePassed(value) {
        if (Number.isFinite(value)) {
            this.#timePassed = value;
        }
    }

    get speedFactor() {
        return this.#speedFactor;
    }

    set speedFactor(value) {
        if (Number.isFinite(value)) {
            if (value < Configuration.speedMultiplier.maximum && value > Configuration.speedMultiplier.minimum) {
                this.#speedFactor = value;
            }
        }
    }

    get isRunning() {
        return this.#isRunning;
    }

    set isRunning(state) {
        if (typeof state === "boolean") {
            this.#isRunning = state;
        }
    }

    getWorldAttributes() {
        return this.#World;
    }

    addEntity(entity) {
        if (entity instanceof Resource) {
            this.#resources.push(entity);
        } else if (entity instanceof Agent) {
            this.#agents.push(entity);
        }
    }

    getAgents() {
        return this.#agents;
    }

    getResources() {
        // TODO test if copy/filtered array is enough
        return this.#resources;
    }

})();

export default Simulation;