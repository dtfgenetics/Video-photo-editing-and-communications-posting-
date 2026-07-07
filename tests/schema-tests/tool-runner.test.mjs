import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { hasRunnableTool, listRunnableToolIds, runTool } from '../../core/tools/index.mjs';

test('tool runner lists supported tools', () => {
  const ids = listRunnableToolIds();

  assert.equal(ids.includes('media.probe'), true);
  assert.equal(ids.includes('media.validate'), true);
  assert.equal(hasRunnableTool('media.probe'), true);
  assert.equal(hasRunnableTool('missing.tool'), false);
});

test('tool runner runs media.probe', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const result = runTool('media.probe', { filePath: file });

  assert.equal(result.ok, true);
  assert.equal(result.toolId, 'media.probe');
  assert.equal(result.output.mediaMetadata.filename, 'sample.mp4');
});

test('tool runner runs media.validate after media.probe', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const probeResult = runTool('media.probe', { filePath: file });
  const validateResult = runTool('media.validate', probeResult.output);

  assert.equal(validateResult.ok, true);
  assert.equal(validateResult.toolId, 'media.validate');
  assert.equal(validateResult.output.validationReport.media.filename, 'sample.mp4');
});

test('tool runner returns clean failure for unknown tools', () => {
  const result = runTool('missing.tool', {});

  assert.equal(result.ok, false);
  assert.equal(result.toolId, 'missing.tool');
  assert.equal(result.errors[0].code, 'TOOL_NOT_FOUND');
});
