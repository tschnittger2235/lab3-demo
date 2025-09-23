/**
 * Represents a single die with configurable number of sides
 */
export class Die {
  #sides;
  #currentValue;

  /**
   * Creates a new die
   * @param {number} sides - Number of sides on the die (default: 6)
   * @throws {Error} If sides is less than 2
   */
  constructor(sides = 6) {
    if (sides < 2) {
      throw new Error('Die must have at least 2 sides');
    }
    this.#sides = sides;
    this.#currentValue = null;
  }

  /**
   * Rolls the die and updates the current value
   * @returns {number} The result of the roll
   */
  roll() {
    this.#currentValue = Math.floor(Math.random() * this.#sides) + 1;
    return this.#currentValue;
  }

  /**
   * Gets the number of sides on the die
   * @returns {number} Number of sides
   */
  getSides() {
    return this.#sides;
  }

  /**
   * Gets the current rolled value
   * @returns {number|null} The current value or null if not rolled
   */
  getValue() {
    return this.#currentValue;
  }

  /**
   * Checks if the die has been rolled
   * @returns {boolean} True if rolled, false otherwise
   */
  hasBeenRolled() {
    return this.#currentValue !== null;
  }

  /**
   * Resets the die to unrolled state
   */
  reset() {
    this.#currentValue = null;
  }
}

