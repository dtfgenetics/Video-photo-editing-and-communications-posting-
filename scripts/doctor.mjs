import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];

function rel(...parts) {
  return path.join(root, ...parts);
}

function exists(relativePath) {
  return fs.existsSync(rel(relativePath));
}

function readJson(relativePath) {
  const fullPath = rel(relativePath);
  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    errors.push(`JSON read failed: ${relativePath} - ${error.message}`);
    return null;
  }
}

function walk(dirPath, matcher, results = []) {
  if (!fs.existsSync(dirPath)) return results;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(full, matcher, results);
    } else if (matcher(full)) {
      results.push(full);
    }
  }
  return results;
}

function relative(fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, '/');
}

function checkUnique(items, getId, label) {
  const seen = new Set();
  for (const item of items) {
    const id = getId(item);
    if (!id) {
      errors.push(`${label} missing id`);
      continue;
    }
    if (seen.has(id)) {
      errors.push(`Duplicate ${label} id: ${id}`);
    }
    seen.add(id);
  }
}

const schemaFiles = [
  'schemas/tool.schema.json',
  'schemas/recipe.schema.json',
  'schemas/plugin.schema.json',
  'schemas/connector.schema.json',
  'schemas/event.schema.json',
  'schemas/job.schema.json',
  'schemas/package_manifest.schema.json',
  'schemas/project_manifest.schema.json',
  'schemas/brand_kit.schema.json',
  'schemas/asset_manifest.schema.json'
];

const requiredDirs = [
  'apps/web',
  'apps/api',
  'apps/desktop',
  'core/validation',
  'core/registry',
  'core/recipes',
  'core/jobs',
  'core/events',
  'core/storage',
  'core/database',
  'core/config',
  'core/security',
  'tools',
  'plugins/connectors',
  'plugins/templates',
  'plugins/ai-providers',
  'plugins/storage-adapters',
  'plugins/analytics-sources',
  'plugins/compliance-packs',
  'recipes',
  'storage/originals',
  'storage/workspace',
  'storage/exports',
  'storage/thumbnails',
  'storage/captions',
  'storage/packages',
  'storage/logs',
  'storage/cache',
  'storage/backups',
  'storage/temp',
  'tests/schema-tests',
  'tests/tool-tests',
  'tests/recipe-tests',
  'tests/package-tests'
];

for (const file of schemaFiles) {
  if (!exists(file)) errors.push(`Missing schema: ${file}`);
  else readJson(file);
}

for (const dir of requiredDirs) {
  if (!exists(dir)) errors.push(`Missing scaffold folder: ${dir}`);
}

const recipePaths = fs.existsSync(rel('recipes'))
  ? fs.readdirSync(rel('recipes')).filter((name) => name.endsWith('.json')).map((name) => `recipes/${name}`)
  : [];

const toolPaths = walk(rel('tools'), (full) => path.basename(full) === 'tool.json').map(relative);

const recipes = recipePaths.map((file) => ({ file, data: readJson(file) })).filter((item) => item.data);
const tools = toolPaths.map((file) => ({ file, data: readJson(file) })).filter((item) => item.data);

checkUnique(recipes, (item) => item.data.id, 'recipe');
checkUnique(tools, (item) => item.data.id, 'tool');

const toolIds = new Map(tools.map((item) => [item.data.id, item.file]));

for (const recipe of recipes) {
  if (!Array.isArray(recipe.data.steps)) {
    errors.push(`Recipe missing steps array: ${recipe.file}`);
    continue;
  }
  for (const step of recipe.data.steps) {
    if (!step.tool) {
      errors.push(`Recipe step missing tool id: ${recipe.file}`);
      continue;
    }
    if (!toolIds.has(step.tool)) {
      errors.push(`Missing tool manifest for recipe step: ${recipe.data.id} -> ${step.tool}`);
    }
  }
}

if (recipePaths.length === 0) warnings.push('No recipes found.');
if (toolPaths.length === 0) warnings.push('No tool manifests found.');

console.log('Creator Engine Doctor');
console.log('');
console.log(`Schemas: ${schemaFiles.length}`);
console.log(`Recipes: ${recipes.length}`);
console.log(`Tools: ${tools.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Errors: ${errors.length}`);

if (warnings.length) {
  console.log('');
  console.log('Warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.log('');
  console.log('Errors:');
  for (const error of errors) console.log(`- ${error}`);
  console.log('');
  console.log('Result: FAIL');
  process.exitCode = 1;
} else {
  console.log('');
  console.log('Result: PASS');
}
