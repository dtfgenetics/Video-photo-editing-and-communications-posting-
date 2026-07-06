import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createToolFailure,
  createToolResult,
  createToolSuccess,
  normalizeIssue
} from '../../core/results/index.mjs';

test('normalizeIssue converts strings into issue objects', () => {
  const issue = normalizeIssue('Something happened', 'TEST_001');

  assert.deepEqual(issue, {
    code: 'TEST_001',
    message: 'Something happened'
  });
});

test('createToolSuccess returns the standard tool result shape', () => {
  const result = createToolSuccess('media.probe', { value: true });

  assert.equal(result.ok, true);
  assert.equal(result.toolId, 'media.probe');
  assert.deepEqual(result.output, { value: true });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
});

test('createToolFailure returns a failed standard tool result', () => {
  const result = createToolFailure('media.probe', [
    { code: 'MEDIA_001', message: 'Missing file.' }
  ]);

  assert.equal(result.ok, false);
  assert.equal(result.toolId, 'media.probe');
  assert.equal(result.errors[0].code, 'MEDIA_001');
});

test('createToolResult cannot be ok when errors are present', () => {
  const result = createToolResult({
    ok: true,
    toolId: 'media.validate',
    errors: ['Validation failed']
  });

  assert.equal(result.ok, false);
  assert.equal(result.errors[0].code, 'TOOL_001');
});
