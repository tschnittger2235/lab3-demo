  /**
   * Rolls dice multiple times
   * @param {string} notation - Dice notation
   * @param {number} times - Number of times to roll
   * @returns {string} Rendered results with statistics
   */
  rollMultiple(notation, times) {
    if (times < 1 || times > 1000) {
      return 'Error: Roll count must be between 1 and 1000';
    }
    try {
      const parsed = DiceNotation.parse(notation);
      const rolls = [];

      for (let i = 0; i < times; i++) {
        const result = parsed.roll();
        rolls.push(result.total);
      }

      // Add to history
      this.#history.push({
        notation: `${notation} x${times}`,
        result: rolls,
        timestamp: new Date()
      });

      // Render statistics
      if (this.#renderer.renderStatistics) {
        return this.#renderer.renderStatistics(rolls, notation);
      }

      // Fallback if renderer doesn’t support statistics
      const avg = (rolls.reduce((a, b) => a + b, 0) / rolls.length).toFixed(2);
      return `Rolled ${notation} ${times} times.\nResults: ${rolls.join(', ')}\nAverage: ${avg}`;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
