import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { probeMedia } from '../../tools/metadata/media.probe/index.mjs';

test('media.probe reads basic metadata for a supported file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const result = probeMedia(file);

  assert.equal(result.ok, true);
  assert.equal(result.filename, 'sample.mp4');
  assert.equal(result.extension, '.mp4');
  assert.equal(result.fileSizeBytes, 6);
  assert.equal(result.supported, true);
});

test('media.probe reports missing files', () => {
  const result = probeMedia('/missing/creator-engine-file.mp4');

  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'MEDIA_001');
});

test('media.probe reports unsupported extensions', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.txt');
  fs.writeFileSync(file, 'sample');

  const result = probeMedia(file);

  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'MEDIA_003');
  assert.equal(result.supported, false);
});
