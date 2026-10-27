import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspectMediaStreams } from '../../core/media/ffprobe.mjs';

function withFixture(fn) {
 const dir = mkdtempSync(join(tmpdir(), 'dtf-ffprobe-'));
 const file = join(dir, 'video.mp4');
 writeFileSync(file, 'fake-header-for-testing-runner');
 try { fn(file); } finally { rmSync(dir, { recursive: true, force: true }); }
}
test('accepts a valid reported video stream with no shell execution', () => withFixture(file => {
 const runner = (bin, args, config) => {
   assert.equal(bin, 'ffprobe');
   assert.equal(config.shell, false);
   assert.equal(args.at(-1), file);
   return { status: 0, stdout: JSON.stringify({ streams:[{codec_type:'video',codec_name:'h264',width:1920,height:1080}],format:{format_name:'mov,mp4',duration:'10.5'}}) };
 };
 const result = inspectMediaStreams(file, { runner });
 assert.equal(result.ok,true);
 assert.equal(result.streams[0].width,1920);
 assert.equal(result.durationSeconds,10.5);
}));
test('rejects unsupported URL inputs without invoking runner', () => {
 const result = inspectMediaStreams('https://example.test/video.mp4', {runner:()=>{throw Error('called')}});
 assert.equal(result.code,'MEDIA_PATH_INVALID');
});
test('rejects forged containers without valid audio/video streams', () => withFixture(file => {
 const result = inspectMediaStreams(file,{runner:()=>({status:0,stdout:'{"streams":[{"codec_type":"data","codec_name":"bin_data"}]}'})});
 assert.equal(result.code,'MEDIA_NO_DECODABLE_STREAMS');
}));
test('reports missing ffprobe separately from corrupt media', () => withFixture(file => {
 const result = inspectMediaStreams(file,{runner:()=>({error:{code:'ENOENT'},status:null})});
 assert.equal(result.code,'FFPROBE_UNAVAILABLE');
}));
test('rejects invalid tool output and missing paths', () => {
 assert.equal(inspectMediaStreams('/missing/file.mp4').code,'MEDIA_NOT_FOUND');
 withFixture(file=>{
  assert.equal(inspectMediaStreams(file,{runner:()=>({status:0,stdout:'bad'})}).code,'MEDIA_PROBE_INVALID_JSON');
 });
});
