import { spawnSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';

// Strictly local stream inspection: no shell, no URL inputs, bounded output.
export function inspectMediaStreams(filePath, options = {}) {
  if (typeof filePath !== 'string' || !filePath.trim() || /^(?:https?:|ftp:|data:)/i.test(filePath)) {
    return { ok: false, code: 'MEDIA_PATH_INVALID', streams: [] };
  }
  const absolutePath = resolve(filePath);
  try {
    if (!statSync(absolutePath).isFile()) return { ok: false, code: 'MEDIA_NOT_FILE', streams: [] };
  } catch {
    return { ok: false, code: 'MEDIA_NOT_FOUND', streams: [] };
  }
  const runner = options.runner ?? spawnSync;
  let result;
  try {
    result = runner(options.binary ?? 'ffprobe', [
      '-v', 'error', '-show_entries',
      'format=format_name,duration,size:stream=index,codec_type,codec_name,width,height',
      '-of', 'json', '--', absolutePath
    ], { encoding: 'utf8', timeout: 15000, maxBuffer: 1024 * 1024, shell: false });
  } catch {
    return { ok: false, code: 'MEDIA_PROBE_FAILED', streams: [] };
  }
  if (result.error || result.status !== 0) {
    return { ok: false, code: result.error?.code === 'ENOENT' ? 'FFPROBE_UNAVAILABLE' : 'MEDIA_PROBE_FAILED', streams: [] };
  }
  let payload;
  try { payload = JSON.parse(result.stdout); } catch {
    return { ok: false, code: 'MEDIA_PROBE_INVALID_JSON', streams: [] };
  }
  const streams = Array.isArray(payload.streams) ? payload.streams.filter(s =>
    s && ['audio', 'video'].includes(s.codec_type) && typeof s.codec_name === 'string' && s.codec_name.length > 0
  ).map(s => ({
    type: s.codec_type, codec: s.codec_name,
    ...(s.codec_type === 'video' ? { width: s.width, height: s.height } : {})
  })) : [];
  if (!streams.length) return { ok: false, code: 'MEDIA_NO_DECODABLE_STREAMS', streams: [] };
  return { ok: true, code: null, streams, format: String(payload.format?.format_name ?? ''), durationSeconds: Number(payload.format?.duration) || null };
}
