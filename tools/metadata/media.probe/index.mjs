import fs from 'node:fs';
import path from 'node:path';
import { createToolResult } from '../../../core/results/index.mjs';

export const SUPPORTED_MEDIA_EXTENSIONS = new Set([
  '.mp4',
  '.mov',
  '.mkv',
  '.avi',
  '.webm',
  '.m4v',
  '.mp3',
  '.wav',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp'
]);

// Basic container signature check, not a codec/decodability or safety guarantee.
// FFprobe decoding/stream checks are required before export.
export function hasMediaSignature(extension, header) {
  if (!Buffer.isBuffer(header)) return false;
  const ascii = (a,b) => header.subarray(a,b).toString('ascii');
  switch (extension) {
    case '.mp4': case '.mov': case '.m4v':
      return header.length >= 12 && ascii(4,8) === 'ftyp';
    case '.png':
      return header.length >= 8 && header.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    case '.jpg': case '.jpeg':
      return header.length >= 3 && header[0] === 255 && header[1] === 216 && header[2] === 255;
    case '.webp':
      return header.length >= 12 && ascii(0,4) === 'RIFF' && ascii(8,12) === 'WEBP';
    case '.wav':
      return header.length >= 12 && ascii(0,4) === 'RIFF' && ascii(8,12) === 'WAVE';
    case '.avi':
      return header.length >= 12 && ascii(0,4) === 'RIFF' && ascii(8,12) === 'AVI ';
    case '.mkv': case '.webm':
      return header.length >= 4 && header.subarray(0,4).equals(Buffer.from([26,69,223,163]));
    case '.mp3':
      return ascii(0,3) === 'ID3' || (header.length >= 2 && header[0] === 255 && (header[1] & 0xe0) === 0xe0);
    default: return false;
  }
}

export function probeMedia(input) {
  const filePath = typeof input === 'string' ? input : input?.filePath;

  if (!filePath) {
    return {
      ok: false,
      errorCode: 'MEDIA_001',
      errorMessage: 'No media file path was provided.'
    };
  }

  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    return {
      ok: false,
      errorCode: 'MEDIA_001',
      errorMessage: 'Media file does not exist.',
      filePath: absolutePath
    };
  }

  const stats = fs.statSync(absolutePath);

  if (!stats.isFile()) {
    return {
      ok: false,
      errorCode: 'MEDIA_002',
      errorMessage: 'Media path is not a file.',
      filePath: absolutePath
    };
  }

  const extension = path.extname(absolutePath).toLowerCase();
  const supported = SUPPORTED_MEDIA_EXTENSIONS.has(extension);
  let signatureVerified = false;
  if (supported && stats.size > 0) {
    const fd = fs.openSync(absolutePath, 'r');
    try {
      const header = Buffer.alloc(Math.min(32, stats.size));
      const n = fs.readSync(fd, header, 0, header.length, 0);
      signatureVerified = hasMediaSignature(extension, header.subarray(0,n));
    } finally {
      fs.closeSync(fd);
    }
  }

  return {
    ok: supported,
    errorCode: supported ? null : 'MEDIA_003',
    errorMessage: supported ? null : `Unsupported media extension: ${extension || 'none'}`,
    filePath: absolutePath,
    filename: path.basename(absolutePath),
    extension,
    fileSizeBytes: stats.size,
    createdAt: stats.birthtime.toISOString(),
    modifiedAt: stats.mtime.toISOString(),
    isFile: true,
    supported,
    signatureVerified
  };
}

export function runMediaProbeTool(input) {
  const mediaMetadata = probeMedia(input);
  const errors = mediaMetadata.ok
    ? []
    : [
        {
          code: mediaMetadata.errorCode ?? 'MEDIA_001',
          message: mediaMetadata.errorMessage ?? 'Media probe failed.'
        }
      ];

  return createToolResult({
    ok: mediaMetadata.ok,
    toolId: 'media.probe',
    output: {
      mediaMetadata
    },
    errors
  });
}
