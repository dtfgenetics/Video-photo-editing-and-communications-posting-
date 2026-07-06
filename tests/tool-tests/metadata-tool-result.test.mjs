import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runMediaProbeTool } from '../../tools/metadata/media.probe/index.mjs';
import { runMediaValidateTool } from '../../tools/metadata/media.validate/index.mjs';

test('media.probe runnable wrapper returns standard tool result shape', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const result = runMediaProbeTool({ filePath: file });

  assert.equal(result.ok, true);
  assert.equal(result.toolId, 'media.probe');
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.equal(result.output.mediaMetadata.filename, 'sample.mp4');
});

test('media.probe runnable wrapper reports errors in standard shape', () => {
  const result = runMediaProbeTool({ filePath: '/missing/creator-engine-file.mp4' });

  assert.equal(result.ok, false);
  assert.equal(result.toolId, 'media.probe');
  assert.equal(result.errors[0].code, 'MEDIA_001');
});

test('media.validate runnable wrapper returns standard tool result shape', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const probeResult = runMediaProbeTool({ filePath: file });
  const result = runMediaValidateTool(probeResult.output);

  assert.equal(result.ok, true);
  assert.equal(result.toolId, 'media.validate');
  assert.deepEqual(result.errors, []);
  assert.equal(result.output.validationReport.media.filename, 'sample.mp4');
});

test('media.validate runnable wrapper reports validation errors in standard shape', () => {
  const result = runMediaValidateTool(null);

  assert.equal(result.ok, false);
  assert.equal(result.toolId, 'media.validate');
  assert.equal(result.errors[0].code, 'MEDIA_004');
});
