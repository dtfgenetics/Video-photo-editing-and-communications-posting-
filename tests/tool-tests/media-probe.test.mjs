import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { probeMedia } from '../../tools/metadata/media.probe/index.mjs';

test('media.probe reads basic metadata for a supported file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));

  const result = probeMedia(file);

  assert.equal(result.ok, true);
  assert.equal(result.filename, 'sample.mp4');
  assert.equal(result.extension, '.mp4');
  assert.equal(result.fileSizeBytes, 24);
  assert.equal(result.supported, true);
  assert.equal(result.signatureVerified, true);
});

test('media.probe reports missing files', () => {
  const result = probeMedia('/missing/creator-engine-file.mp4');

  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'MEDIA_001');
});

test('media.probe reports unsupported extensions', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.txt');
  fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));

  const result = probeMedia(file);

  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'MEDIA_003');
  assert.equal(result.supported, false);
});

test('media.probe detects extensions hiding non-media content', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  try {
    const file = path.join(dir, 'spoof.mp4');
    fs.writeFileSync(file, 'not really a movie');
    const result = probeMedia(file);
    assert.equal(result.supported, true);
    assert.equal(result.signatureVerified, false);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
