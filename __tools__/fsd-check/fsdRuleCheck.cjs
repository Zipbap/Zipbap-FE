const path = require('path');
const fs = require('fs');
const {
  getCurrentLayer,
  getImportLayer,
  getNotAllowImportMessage,
  isAllowImport,
  isFSDLayer,
} = require('./utils.cjs');

const LAYER = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

// NOTE: not to be reported again (publicAPI report)
const reportedSlices = new Set();

// cache
const publicAPICache = new Map();

function checkAllowImport(filePath, importPath, currentLayer, importLayer) {
  if (isAllowImport(LAYER, currentLayer, importLayer)) return null;
  return getNotAllowImportMessage(filePath, importPath);
}

function getSlicePath(importPath) {
  const parts = importPath.replace(/^@/, '').split('/');
  return parts.slice(0, 2).join(path.sep);
}

function hasPublicAPI(slicePath) {
  // cache hit
  if (publicAPICache.has(slicePath)) {
    return publicAPICache.get(slicePath);
  }

  // cache miss
  const indexPath = path.join('src', slicePath, 'index.ts');
  const hasPublicAPI = fs.existsSync(indexPath);

  publicAPICache.set(slicePath, hasPublicAPI);

  return hasPublicAPI;
}

function checkPublicAPI(filePath, importPath) {
  const slicePath = getSlicePath(importPath);

  if (!hasPublicAPI(slicePath) && !reportedSlices.has(slicePath)) {
    reportedSlices.add(slicePath);
    return (
      `⚠️ ${filePath} - ${importPath}\n` +
      `slice "${slicePath}" 에 public API(index.ts)가 존재하지 않습니다.\n`
    );
  }

  return null;
}

function checkFSDRule(filePath, imports) {
  let messages = [];
  const currentLayer = getCurrentLayer(filePath);

  imports.forEach(importPath => {
    if (!isFSDLayer(importPath)) return;

    const importLayer = getImportLayer(importPath);

    const checks = [
      checkAllowImport(filePath, importPath, currentLayer, importLayer),
      checkPublicAPI(filePath, importPath),
    ];

    messages.push(...checks.filter(Boolean));
  });

  return messages;
}

module.exports = { checkFSDRule };
