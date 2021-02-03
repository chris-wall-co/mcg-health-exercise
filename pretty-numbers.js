/**
 * @enum
 * @readonly
 */
const ORDERS_OF_MAGNITUDE = Object.freeze({
    MILLIONS: 'M',
    BILLIONS: 'B',
    TRILLIONS: 'T',
});

/**
 * Represents an Order of Magnitude for numbers
 * @class
 */
class OrderOfMagnitude {

    /**
     * Creates a new instance of the {OrderOfMagnitude} class.
     * @param {string} abbreviation - the readable abbreviation
     * @param {number} magnitude - the magnitude place for this range
     */
    constructor(abbreviation, magnitude) {
        this._abbr = abbreviation;
        this._magnitude = magnitude;
    }

    /**
     * Checks to see if a number falls within the allowable range
     * @param {number} num - the number to verify
     * @returns {boolean}
     */
    isInRange(num) {
        if (typeof num !== 'number' || isNaN(num) === true) {
            throw new Error('OrderOfMagnitude::isInRange expects argument "num" to be a number');
        }

        // since we are allowing negatives, we need to flip negative numbers before doing the range check
        num = (num < 0 ? num * -1 : num);

        return (num >= (this._magnitude) && num <= ((this._magnitude * 1000) - 1));
    }

    /**
     * Rounds and formats the supplied number for readability
     * @param {number} num - the number to round
     * @returns {string}
     */
    round(num) {
        if (typeof num !== 'number' || isNaN(num) === true) {
            throw new Error('OrderOfMagnitude::round expects argument "num" to be a number');
        }

        if (this.isInRange(num) !== true) {
            throw new Error('OrderOfMagnitude::round expects argument "num" to be within range');
        }

        // -- Most JS implementations have issues with rounding when the decimal ends with "5" creating inconsistent results.  This fixes that issue
        const fixedRounding = (num, precision) => {
            return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
        }

        const formatted = fixedRounding((num / this._magnitude), 1);
        return `${formatted.endsWith('.0') ? formatted.substr(0, formatted.length - 2) : formatted}${this._abbr.toUpperCase()}`;
    }
}

/**
 * PrettyNumbers contains logic to clean up numbers for display purposes
 * @class
 */
export class PrettyNumbers {

    /**
     * Creates a new instance of the {PrettyNumbers} class
     */
    constructor() {
        this._breakpoints = Object.freeze([
            Object.freeze(new OrderOfMagnitude(ORDERS_OF_MAGNITUDE.MILLIONS, 1000000)),
            Object.freeze(new OrderOfMagnitude(ORDERS_OF_MAGNITUDE.BILLIONS, 1000000000)),
            Object.freeze(new OrderOfMagnitude(ORDERS_OF_MAGNITUDE.TRILLIONS, 1000000000000)),
        ]);
    }

    /**
     * Gets the list of breakpoints
     * @type {OrderOfMagnitude[]}
     */
    get breakpoints() { return [...this._breakpoints]; }

    /**
     * pretty converts a number to a more user-friendly form
     * @param {number | string} num - number to pretty up
     * @returns {string}
     */
    pretty(num) {

        const n = (typeof num === 'string' ? parseInt(num) : num);

        // Regex for correct formatting as parseInt can return inconsitent results when numeric and space characters are mixed with invalid characters
        if (isNaN(n) === true || /^-?\d+(\.\d+)?$/.test(num) !== true) {
            throw new Error('PrettyNumbers::pretty expected argument num to be a number or valid numeric string.');
        }

        const oom = this.breakpoints.find(bp => bp.isInRange(n) === true);

        if (typeof oom === 'object' && oom !== null) {
            return oom.round(n);
        }
        else {
            return `${n}`;
        }
    }
}