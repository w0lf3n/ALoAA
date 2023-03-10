import createEnum from "../../utilities/Enum.js";
import { add, setMagnitude } from "../../pixi-adapter/math.js";

let uniqueID = -1;
const createUniqueId = () => {
    uniqueID = uniqueID + 1;
    return uniqueID;
};

const Entity = class {

    // TODO move to Configuration?
    static Type = createEnum("NONE", "ANORGANIC", "ORGANIC", "AUTOTROPH", "MIXOTROPH", "HETEROTROPH");

    /**
     * @param {{ x: number, y: number }} param0
     */
    constructor({ x, y }) {

        this.id = createUniqueId();

        this.type = Entity.Type.NONE;

        this.position = (Number.isFinite(x) && Number.isFinite(y)) ? { x, y } : { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 }; // TODO check what this variable influences -> current speed AND orientation??

        // pool for all abilities, bars and traits, identified by unique id
        this.genes = {};

        this.target = null;
        this.threat = null;
        this.activity = null;

        this.pixelSize = 0;
        this.graphics = null;
        this.color = null;

        Object.seal(this);
    }

    // TODO refactor to utilities or math or ability?
    calculateDistanceFromCurrentPosition(length) {
        let distance = { ...this.velocity };
        distance = setMagnitude(distance, length);
        return add(distance, this.position);
    }

    mutate() {
        const mutatedValues = [];
        Object.values(this.genes).forEach((gene) => {
            if (gene.id === "Speed" || gene.id === "Food") {
                // console.log(gene);
                mutatedValues.push(gene.mutate());
            }
        });
        // console.log(mutatedValues);
        return mutatedValues;
    }

};

export default Entity;
