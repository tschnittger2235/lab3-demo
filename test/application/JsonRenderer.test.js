import { describe, it } from 'node:test';
import assert from 'node:assert';
import { JsonRenderer } from '../../src/application/JsonRenderer.js';

describe('JsonRenderer', () => {
  describe('render', () => {
    it('should return JSON string for simple roll', () => {
      const renderer = new JsonRenderer();
      const result = {
        total: 10,
        dice: [
          {
            notation: '3d6',
            rolls: [3, 4, 3],
            subtotal: 10
          }
        ],
        modifiers: []
      };

      const output = renderer.render(result);
      const parsed = JSON.parse(output);

      assert.strictEqual(parsed.total, 10);
      assert.strictEqual(parsed.dice[0].notation, '3d6');
      assert.deepStrictEqual(parsed.dice[0].rolls, [3, 4, 3]);
    });

    it('should include modifiers in JSON output', () => {
      const renderer = new JsonRenderer();
      const result = {
        total: 15,
        dice: [
          {
            notation: '2d6',
            rolls: [4, 6],
            subtotal: 10
          }
        ],
        modifiers: [5]
      };

      const output = renderer.render(result);
      const parsed = JSON.parse(output);

      assert.strictEqual(parsed.total, 15);
      assert.deepStrictEqual(parsed.modifiers, [5]);
    });
  });

  describe('renderStatistics', () => {
    it('should return statistics as JSON', () => {
      const renderer = new JsonRenderer();
      const rolls = [3, 6, 4, 5, 2, 6];
      const output = renderer.renderStatistics(rolls, '1d6');
      const parsed = JSON.parse(output);

      assert.strictEqual(parsed.notation, '1d6');
      assert.strictEqual(parsed.count, 6);
      assert.strictEqual(parsed.total, 26);
      assert.strictEqual(parsed.min, 2);
      assert.strictEqual(parsed.max, 6);
      assert.ok(Math.abs(parsed.average - 4.33) < 0.01);
    });

    it('should handle empty rolls array', () => {
      const renderer = new JsonRenderer();
      const output = renderer.renderStatistics([], '1d6');

      // parse JSON and check error field instead of raw string
      const parsed = JSON.parse(output);
      assert.strictEqual(parsed.error, 'No rolls to analyze');
    });
  });
});
