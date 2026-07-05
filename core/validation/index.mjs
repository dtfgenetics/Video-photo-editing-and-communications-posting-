import fs from 'node:fs';
import path from 'node:path';

export function toRepoPath(root, fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, '/');
}

export function exists(root, repoPath) {
  return fs.existsSync(path.join(root, repoPath));
}

export function readJson(root, repoPath) {
  const fullPath = path.join(root, repoPath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw);
}

export function walkFiles(startDir, matcher, results = []) {
  if (!fs.existsSync(startDir)) return results;

  for (const entry of fs.readdirSync(startDir, { withFileTypes: true })) {
    const fullPath = path.join(startDir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, matcher, results);
    } else if (matcher(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

export function checkRequiredFiles(root, requiredFiles) {
  const errors = [];

  for (const file of requiredFiles) {
    if (!exists(root, file)) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  return errors;
}

export function checkRequiredDirs(root, requiredDirs) {
  const errors = [];

  for (const dir of requiredDirs) {
    if (!exists(root, dir)) {
      errors.push(`Missing scaffold folder: ${dir}`);
    }
  }

  return errors;
}

export function checkJsonReadable(root, files, label = 'JSON file') {
  const errors = [];
  const loaded = [];

  for (const file of files) {
    if (!exists(root, file)) {
      errors.push(`Missing ${label}: ${file}`);
      continue;
    }

    try {
      loaded.push({ file, data: readJson(root, file) });
    } catch (error) {
      errors.push(`JSON read failed: ${file} - ${error.message}`);
    }
  }

  return { errors, loaded };
}

export function checkUniqueIds(items, label) {
  const errors = [];
  const seen = new Set();

  for (const item of items) {
    const id = item?.data?.id;

    if (!id) {
      errors.push(`${label} missing id: ${item?.file ?? 'unknown file'}`);
      continue;
    }

    if (seen.has(id)) {
      errors.push(`Duplicate ${label} id: ${id}`);
    }

    seen.add(id);
  }

  return errors;
}
