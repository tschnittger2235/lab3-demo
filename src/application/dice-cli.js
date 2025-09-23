import { describe, it } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Polyfill __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCLI(args = '') {
  const cliPath = path.resolve(__dirname, '../../src/application/dice-cli.js');
  return execSync(`node "${cliPath}" ${args}`, { encoding: 'utf-8' });
}

describe('DiceCLI', () => {
  it('should show help when no args are given', () => {
    const output = runCLI();
    assert.match(output, /Dice Roller CLI/);
    assert.match(output, /Usage:/);
  });

  it('should roll dice with notation', () => {
    const output = runCLI('1d6');
    assert.match(output, /\d/);
  });

  it('should support JSON output', () => {
    const output = runCLI('--json 1d6');
    const parsed = JSON.parse(output);
    assert.ok(parsed.total >= 1 && parsed.total <= 6);
  });

  it('should roll multiple times', () => {
    const output = runCLI('--multiple 1d6 5');
    assert.match(output, /\[/);
  });

  it('should show info about notation', () => {
    const output = runCLI('--info 2d8+3');
    assert.match(output, /min/);
    assert.match(output, /max/);
  });

  it('should show examples', () => {
    const output = runCLI('--examples');
    assert.match(output, /Dice Notation Examples/);
    assert.match(output, /d20/);
  });
});
