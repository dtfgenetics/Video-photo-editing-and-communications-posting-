import { createToolResult } from '../../../core/results/index.mjs';
import { inspectMediaStreams } from '../../../core/media/ffprobe.mjs';

export function validateMedia(probeResult, options = {}) {
  const errors = [];
  const warnings = [];

  if (!probeResult || typeof probeResult !== 'object') {
    return {
      ok: false,
      errors: [
        {
          code: 'MEDIA_004',
          message: 'No probe result was provided.'
        }
      ],
      warnings,
      media: null
    };
  }

  if (!probeResult.filePath) {
    errors.push({
      code: 'MEDIA_001',
      message: 'Probe result does not include a file path.'
    });
  }

  if (probeResult.isFile !== true) {
    errors.push({
      code: 'MEDIA_002',
      message: 'Probe result does not describe a readable file.'
    });
  }

  if (probeResult.supported !== true) {
    errors.push({
      code: probeResult.errorCode ?? 'MEDIA_003',
      message: probeResult.errorMessage ?? 'Media file is not supported.'
    });
  }

  if (probeResult.supported === true && probeResult.signatureVerified !== true) {
    errors.push({
      code: 'MEDIA_007',
      message: 'Media content signature does not match a supported container.'
    });
  }

  if (typeof probeResult.fileSizeBytes !== 'number') {
    errors.push({
      code: 'MEDIA_005',
      message: 'Probe result does not include file size.'
    });
  } else if (probeResult.fileSizeBytes <= 0) {
    errors.push({
      code: 'MEDIA_006',
      message: 'Media file is empty.'
    });
  }

  // Optional until actual media processing requires stream verification.
  // Metadata-only API behavior is preserved for existing callers.
  let streamInspection = null;
  if (options.requireStreams === true && errors.length === 0) {
    streamInspection = inspectMediaStreams(probeResult.filePath, options.ffprobeOptions);
    if (!streamInspection.ok) {
      errors.push({
        code: streamInspection.code,
        message: 'Stream inspection failed; media cannot be approved for processing.'
      });
    }
  }

  return {
    streamInspection,
    ok: errors.length === 0,
    errors,
    warnings,
    media: probeResult
  };
}

export function runMediaValidateTool(input) {
  const probeResult = input?.mediaMetadata ?? input;
  const validationReport = validateMedia(probeResult, input?.validationOptions ?? {});

  return createToolResult({
    ok: validationReport.ok,
    toolId: 'media.validate',
    output: {
      validationReport
    },
    errors: validationReport.errors,
    warnings: validationReport.warnings
  });
}
