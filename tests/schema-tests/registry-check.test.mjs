import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRegistry } from '../../core/registry/index.mjs';
import { checkRecipeReferences } from '../../core/recipes/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

test('registry loads current manifests', () => {
  const registry = buildRegistry(root);

  assert.equal(registry.errors.length, 0);
  assert.ok(registry.tools.length > 0);
  assert.ok(registry.recipes.length > 0);
  assert.ok(registry.toolById.has('media.probe'));
  assert.ok(registry.toolById.has('package.zip'));
  assert.ok(registry.recipeById.has('recipe.clean_posting_package'));
});

test('recipe steps resolve through registry', () => {
  const registry = buildRegistry(root);
  const errors = checkRecipeReferences(registry.recipes, registry.toolById);

  assert.deepEqual(errors, []);
});
