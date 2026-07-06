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
    supported
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
