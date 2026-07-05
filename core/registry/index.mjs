import fs from 'node:fs';
import path from 'node:path';
import { readJson, toRepoPath, walkFiles, checkUniqueIds } from '../validation/index.mjs';

export function findToolManifestPaths(root) {
  return walkFiles(path.join(root, 'tools'), (fullPath) => path.basename(fullPath) === 'tool.json')
    .map((fullPath) => toRepoPath(root, fullPath));
}

export function findRecipePaths(root) {
  const recipesDir = path.join(root, 'recipes');

  if (!fs.existsSync(recipesDir)) {
    return [];
  }

  return fs.readdirSync(recipesDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => `recipes/${name}`);
}

export function loadToolManifests(root) {
  const items = [];
  const errors = [];

  for (const file of findToolManifestPaths(root)) {
    try {
      items.push({ file, data: readJson(root, file) });
    } catch (error) {
      errors.push(`Tool manifest read failed: ${file} - ${error.message}`);
    }
  }

  errors.push(...checkUniqueIds(items, 'tool'));

  return { items, errors };
}

export function loadRecipes(root) {
  const items = [];
  const errors = [];

  for (const file of findRecipePaths(root)) {
    try {
      items.push({ file, data: readJson(root, file) });
    } catch (error) {
      errors.push(`Recipe read failed: ${file} - ${error.message}`);
    }
  }

  errors.push(...checkUniqueIds(items, 'recipe'));

  return { items, errors };
}

export function buildRegistry(root) {
  const tools = loadToolManifests(root);
  const recipes = loadRecipes(root);

  const toolById = new Map();
  const recipeById = new Map();

  for (const item of tools.items) {
    if (item.data.id) toolById.set(item.data.id, item);
  }

  for (const item of recipes.items) {
    if (item.data.id) recipeById.set(item.data.id, item);
  }

  return {
    tools: tools.items,
    recipes: recipes.items,
    toolById,
    recipeById,
    errors: [...tools.errors, ...recipes.errors]
  };
}
