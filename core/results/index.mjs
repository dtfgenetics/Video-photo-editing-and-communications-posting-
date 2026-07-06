export function normalizeIssue(issue, fallbackCode = 'TOOL_001') {
  if (typeof issue === 'string') {
    return {
      code: fallbackCode,
      message: issue
    };
  }

  return {
    code: issue?.code ?? fallbackCode,
    message: issue?.message ?? 'Tool issue reported.',
    details: issue?.details
  };
}

export function createToolResult({
  ok = false,
  toolId,
  output = {},
  errors = [],
  warnings = [],
  metadata = {}
} = {}) {
  const normalizedErrors = errors.map((error) => normalizeIssue(error, 'TOOL_001'));
  const normalizedWarnings = warnings.map((warning) => normalizeIssue(warning, 'TOOL_WARNING'));

  return {
    ok: Boolean(ok) && normalizedErrors.length === 0,
    toolId: toolId ?? 'unknown.tool',
    output,
    errors: normalizedErrors,
    warnings: normalizedWarnings,
    metadata
  };
}

export function createToolSuccess(toolId, output = {}, metadata = {}) {
  return createToolResult({
    ok: true,
    toolId,
    output,
    metadata
  });
}

export function createToolFailure(toolId, errors = [], output = {}, metadata = {}) {
  return createToolResult({
    ok: false,
    toolId,
    output,
    errors,
    metadata
  });
}
