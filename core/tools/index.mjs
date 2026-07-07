import { createToolFailure } from '../results/index.mjs';
import { runMediaProbeTool } from '../../tools/metadata/media.probe/index.mjs';
import { runMediaValidateTool } from '../../tools/metadata/media.validate/index.mjs';

const RUNNERS = new Map([
  ['media.probe', runMediaProbeTool],
  ['media.validate', runMediaValidateTool]
]);

export function listRunnableToolIds() {
  return [...RUNNERS.keys()];
}

export function hasRunnableTool(toolId) {
  return RUNNERS.has(toolId);
}

export function runTool(toolId, input = {}) {
  const runner = RUNNERS.get(toolId);

  if (!runner) {
    return createToolFailure(toolId ?? 'unknown.tool', [
      {
        code: 'TOOL_NOT_FOUND',
        message: `No runnable tool is registered for: ${toolId ?? 'unknown.tool'}`
      }
    ]);
  }

  try {
    const result = runner(input);

    if (!result || typeof result !== 'object') {
      return createToolFailure(toolId, [
        {
          code: 'TOOL_BAD_RESULT',
          message: 'Runnable tool did not return a result object.'
        }
      ]);
    }

    return result;
  } catch (error) {
    return createToolFailure(toolId, [
      {
        code: 'TOOL_RUNTIME_ERROR',
        message: error?.message ?? 'Tool runner failed.'
      }
    ]);
  }
}
