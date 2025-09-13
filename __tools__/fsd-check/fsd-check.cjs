const path = require('path');
const fs = require('fs');

const {
  getCurrentLayer,
  getImportLayer,
  getNotAllowImportMessage,
  isAllowImport,
  isFSDLayer,
} = require('./utils.cjs');

// constant
const LAYER = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

// NOTE: not to be reported again (publicAPI report)
const reportedSlices = new Set();

// cache
const publicAPICache = new Map();

function getSlicePathFromFile(filePath) {
  const relativePath = filePath.split(`src${path.sep}`)[1];
  return relativePath.split(path.sep).slice(0, 2).join(path.sep);
}

function hasPublicAPI(slicePath) {
  // cache hit
  if (publicAPICache.has(slicePath)) return publicAPICache.get(slicePath);

  // cache miss
  const indexPath = path.join('src', slicePath, 'index.ts');

  const exists = fs.existsSync(indexPath);
  publicAPICache.set(slicePath, exists);

  return exists;
}

function checkPublicAPI(filePath) {
  const slicePath = getSlicePathFromFile(filePath);

  if (hasPublicAPI(slicePath) || reportedSlices.has(slicePath)) return null;

  reportedSlices.add(slicePath);

  const errorMessage = `⚠️ ${filePath}\nslice "${slicePath}" 에 public API(index.ts)가 존재하지 않습니다.\n`;

  return errorMessage;
}

function checkInvalidAlias(filePath, importPath) {
  const invalidPrefixes = LAYER.map(layer => `@/src/${layer}`);

  if (!invalidPrefixes.some(prefix => importPath.startsWith(prefix))) return null;

  const errorMessage =
    `❌ ${filePath} - ${importPath}\n` +
    `"@/src" 형태의 import는 허용되지 않습니다. 올바른 alias를 사용하세요.\n`;

  return errorMessage;
}

function checkAllowImport(filePath, importPath, currentLayer, importLayer) {
  if (isAllowImport(LAYER, currentLayer, importLayer)) return null;

  const errorMessage = getNotAllowImportMessage(filePath, importPath);

  return errorMessage;
}

function checkFSDRules(filePath, imports) {
  const currentLayer = getCurrentLayer(filePath);
  const checkMessageStack = [checkPublicAPI(filePath)];

  for (const importPath of imports) {
    checkMessageStack.push(checkInvalidAlias(filePath, importPath));

    if (!isFSDLayer(importPath)) continue;

    const importLayer = getImportLayer(importPath);
    checkMessageStack.push(checkAllowImport(filePath, importPath, currentLayer, importLayer));
  }

  return checkMessageStack.filter(Boolean);
}

module.exports = { checkFSDRules };
