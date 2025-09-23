import { describe, it } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point to your CLI script
const cliPath = path.resolve(__dirname, '../../src/application/dice-cli.js');

function runCLI(args = '') {
  return execSync(`node "${cliPath}" ${args}`, { encoding: 'utf-8' });
}

describe('DiceCLI', () => {
  it('should show help when no args are given', () => {
    const output = runCLI('');
    assert.ok(output.includes('Dice Roller CLI'));
    assert.ok(output.includes('Usage:'));
  });

  it('should roll dice with notation', () => {
    const output = runCLI('1d6');
    assert.ok(output.includes('d6'));
  });

  it('should support JSON output', () => {
    const output = runCLI('--json 1d6');
    const parsed = JSON.parse(output);
    assert.ok(parsed.total >= 1 && parsed.total <= 6);
  });

  it('should roll multiple times', () => {
    const output = runCLI('--multiple 1d6 3');
    assert.ok(output.includes('Roll'));
  });

  it('should show info about notation', () => {
    const output = runCLI('--info 2d6+3');
    assert.ok(output.includes('min'));
    assert.ok(output.includes('max'));
  });

  it('should show examples', () => {
    const output = runCLI('--examples');
    assert.ok(output.includes('Dice Notation Examples'));
    assert.ok(output.includes('d20'));
  });
});
