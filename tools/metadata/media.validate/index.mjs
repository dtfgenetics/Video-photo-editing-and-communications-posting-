export function validateMedia(probeResult) {
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

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    media: probeResult
  };
}
