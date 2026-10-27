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
  fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));

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
  fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));

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

test('media.validate rejects a fake mp4 despite its supported extension', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  try {
    const file = path.join(dir, 'spoof.mp4');
    fs.writeFileSync(file, 'not really a movie');
    const result = validateMedia(probeMedia(file));
    assert.equal(result.ok, false);
    assert.ok(result.errors.some(error => error.code === 'MEDIA_007'));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('strict validation accepts verified media streams', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  try {
    const file = path.join(dir, 'valid-header.mp4');
    fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));
    const runner = () => ({status:0,stdout:JSON.stringify({streams:[{codec_type:'video',codec_name:'h264',width:1280,height:720}],format:{format_name:'mov,mp4',duration:'12'}})});
    const result = validateMedia(probeMedia(file), {requireStreams:true,ffprobeOptions:{runner}});
    assert.equal(result.ok,true);
    assert.equal(result.streamInspection.streams[0].codec,'h264');
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});

test('strict validation rejects media containers with no verified streams', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  try {
    const file = path.join(dir, 'invalid-stream.mp4');
    fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));
    const runner = () => ({status:0,stdout:JSON.stringify({streams:[]})});
    const result = validateMedia(probeMedia(file), {requireStreams:true,ffprobeOptions:{runner}});
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.code==='MEDIA_NO_DECODABLE_STREAMS'));
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});

test('strict validation reports missing ffprobe without passing silently', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'creator-engine-'));
  try {
    const file = path.join(dir, 'no-ffprobe.mp4');
    fs.writeFileSync(file, Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(16)]));
    const runner = () => ({error:{code:'ENOENT'},status:null});
    const result = validateMedia(probeMedia(file), {requireStreams:true,ffprobeOptions:{runner}});
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.code==='FFPROBE_UNAVAILABLE'));
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
