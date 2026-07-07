import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkJsonReadable,
  checkRequiredDirs,
  checkRequiredFiles
} from '../core/validation/index.mjs';
import { buildRegistry } from '../core/registry/index.mjs';
import { checkRecipeReferences } from '../core/recipes/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];

const requiredFiles = [
  'README.md',
  'package.json',
  '.gitignore',
  '.env.example',
  'VERSION',
  'docs/scope.md',
  'docs/architecture.md',
  'docs/repo-structure.md',
  'docs/push-plan.md',
  'docs/scaffold-verification.md',
  'docs/implementation-order.md',
  'docs/first-code-pass.md',
  'docs/validation-plan.md',
  'docs/validation-command-plan.md',
  'docs/tooling-choice.md',
  'docs/testing.md',
  'docs/package-format.md',
  'docs/acceptance-criteria.md',
  'docs/definition-of-done.md',
  'docs/doctor-command.md',
  'docs/ci-plan.md',
  'docs/outcome-map.md',
  'docs/app-roadmap.md',
  'docs/downloadable-app-requirements.md',
  'docs/code-foundation-status.md',
  'docs/tool-result-contract.md'
];

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
  'core/results',
  'core/tools',
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
  'brand-kits/examples',
  'brand-kits/internal',
  'brand-kits/public',
  'content-packs/examples',
  'content-packs/internal',
  'content-packs/public',
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
  'tests/fixtures',
  'tests/schema-tests',
  'tests/tool-tests',
  'tests/recipe-tests',
  'tests/package-tests',
  'scripts',
  'release/notes',
  'release/installers',
  'release/checksums'
];

errors.push(...checkRequiredFiles(root, requiredFiles));
errors.push(...checkRequiredDirs(root, requiredDirs));

const schemaCheck = checkJsonReadable(root, schemaFiles, 'schema');
errors.push(...schemaCheck.errors);

const registry = buildRegistry(root);
errors.push(...registry.errors);
errors.push(...checkRecipeReferences(registry.recipes, registry.toolById));

if (registry.recipes.length === 0) warnings.push('No recipes found.');
if (registry.tools.length === 0) warnings.push('No tool manifests found.');

console.log('Creator Engine Doctor');
console.log('');
console.log(`Required files checked: ${requiredFiles.length}`);
console.log(`Required folders checked: ${requiredDirs.length}`);
console.log(`Schemas: ${schemaFiles.length}`);
console.log(`Recipes: ${registry.recipes.length}`);
console.log(`Tools: ${registry.tools.length}`);
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
