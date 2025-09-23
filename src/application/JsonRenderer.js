export class JsonRenderer {
    /**
     * Render a dice roll result as JSON
     * @param {Object} result
     * @returns {string}
     */
    render(result) {
      return JSON.stringify(result, null, 2);
    }
  
    /**
     * Render statistics about multiple rolls as JSON
     * @param {number[]} rolls
     * @param {string} notation
     * @returns {string}
     */
    renderStatistics(rolls, notation) {
      if (!rolls || rolls.length === 0) {
        return JSON.stringify({ error: 'No rolls to analyze' });
      }
  
      const count = rolls.length;
      const total = rolls.reduce((sum, val) => sum + val, 0);
      const min = Math.min(...rolls);
      const max = Math.max(...rolls);
      const average = total / count;
  
      const stats = {
        notation,
        count,
        total,
        min,
        max,
        average: parseFloat(average.toFixed(2))
      };
  
      return JSON.stringify(stats, null, 2);
    }
  }
  