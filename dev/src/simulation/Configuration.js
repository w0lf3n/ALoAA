import Value from "./core/Value.js";

const Configuration = new (class {

    constructor() {
        this.speedMultiplier = new Value({ min: 2 ** -3, now: 2, max: 2 ** 10 });
        this.Colors = {
            ANORGANIC: 0xFDE802, // 0x1BAD00,               alt: 0xD1FE49
            ORGANIC: 0xFF901B, // 0xFC5E01, 0xAD001B,       alt: 0xFAB23F
            AUTOTROPH: 0x07F985, // 0x39FF14,               alt: 0x34FE4F
            HETEROTROPH: 0xFF00FA // 0xFF1439               alt: 0xFF1F4F
        };
    }

    assign() {
        Object.freeze(this);
        Object.freeze(this.Colors);
        Object.freeze(this.speedMultiplier);
    }

})();

export default Configuration;
