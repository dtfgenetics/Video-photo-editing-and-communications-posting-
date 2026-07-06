import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { probeMedia } from '../../tools/metadata/media.probe/index.mjs';
import { validateMedia } from '../../tools/metadata/media.validate/index.mjs';

test('media.validate passes a supported probed file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.mp4');
  fs.writeFileSync(file, 'sample');

  const probe = probeMedia(file);
  const result = validateMedia(probe);

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.media.filename, 'sample.mp4');
});

test('media.validate fails when no probe result is provided', () => {
  const result = validateMedia(null);

  assert.equal(result.ok, false);
  assert.equal(result.errors[0].code, 'MEDIA_004');
});

test('media.validate fails unsupported media from probe', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'sample.txt');
  fs.writeFileSync(file, 'sample');

  const probe = probeMedia(file);
  const result = validateMedia(probe);

  assert.equal(result.ok, false);
  assert.equal(result.errors[0].code, 'MEDIA_003');
});

test('media.validate fails empty supported files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  const file = path.join(dir, 'empty.mp4');
  fs.writeFileSync(file, '');

  const probe = probeMedia(file);
  const result = validateMedia(probe);

  assert.equal(result.ok, false);
  assert.equal(result.errors.some((error) => error.code === 'MEDIA_006'), true);
});
