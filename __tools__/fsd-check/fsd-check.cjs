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
const CROSS_API_SYMBOL = 'x';
const SLASH = path.sep;

// NOTE: not to be reported again (publicAPI report)
const reportedSlices = new Set();

// cache
const publicAPICache = new Map();

function getSlicePathFromFile(targetFolder, filePath) {
  const relativePath = filePath.split(`${targetFolder}${SLASH}`)[1];
  return relativePath.split(SLASH).slice(0, 2).join(SLASH);
}

function hasPublicAPI(targetFolder, slicePath) {
  // cache hit
  if (publicAPICache.has(slicePath)) return publicAPICache.get(slicePath);

  // cache miss
  const indexPath = path.join(`${targetFolder}`, slicePath, 'index.ts');

  const exists = fs.existsSync(indexPath);
  publicAPICache.set(slicePath, exists);

  return exists;
}

function checkPublicAPI(targetFolder, filePath) {
  const slicePath = getSlicePathFromFile(targetFolder, filePath);
  if (hasPublicAPI(targetFolder, slicePath) || reportedSlices.has(slicePath)) return null;

  reportedSlices.add(slicePath);

  const errorMessage = `⚠️ ${filePath}\nslice "${slicePath}" 에 public API(index.ts)가 존재하지 않습니다.\n`;

  return errorMessage;
}

const CROSS_API_LAYER = 'entities';
function checkCrossAPI(targetFolder, filePath) {
  // NOTE: cross api 방식이 아닌 경우
  if (!filePath.includes(`@${CROSS_API_SYMBOL}${SLASH}`)) return null;

  // NOTE: cross api 레이어인 경우
  if (getCurrentLayer(targetFolder, filePath) === CROSS_API_LAYER) return null;

  const errorMessage = `🔵 ${filePath}\ncross API(@${CROSS_API_SYMBOL}) 방식은 ${CROSS_API_LAYER} 레이어에서만 허용됩니다.\n`;

  return errorMessage;
}

function checkInvalidAlias(targetFolder, filePath, importPath) {
  const invalidPrefixes = LAYER.map(layer => `@/${targetFolder}/${layer}`);

  if (!invalidPrefixes.some(prefix => importPath.startsWith(prefix))) return null;

  const errorMessage =
    `❌ ${filePath} - ${importPath}\n` +
    `"@/${targetFolder}" 형태의 import는 허용되지 않습니다. 올바른 alias를 사용하세요.\n`;

  return errorMessage;
}

function checkAllowImport(filePath, importPath, currentLayer, importLayer) {
  if (isAllowImport(LAYER, currentLayer, importLayer)) return null;

  const errorMessage = getNotAllowImportMessage(filePath, importPath);

  return errorMessage;
}

function checkSlicePublicAPIImport(filePath, importPath, importLayer) {
  // NOTE: app, shared 레이어 제외
  if (!['pages', 'widgets', 'features', 'entities'].includes(importLayer)) return null;

  // NOTE: "@pages/auth/ui/LoginPage" → ["@pages","auth","ui","LoginPage"]
  const splitedPath = importPath.split('/');

  // NOTE: @pages/{domain}
  if (splitedPath.length === 2) return null;

  // NOTE: allow @pages/{domain}/index, @pages/{domain}/index.ts, @pages/{domain}/index.tsx
  if (splitedPath.length === 3) {
    const last = splitedPath[2];
    if (last === 'index' || last === 'index.ts' || last === 'index.tsx') {
      return null;
    }
  }

  const errorMessage =
    `🟪 ${filePath} - ${importPath}\n` +
    `${importLayer}레이어의 slice는 public API(index.ts)를 통해서만 import 가능합니다.\n`;

  return errorMessage;
}

function checkFSDRules(targetFolder, filePath, imports) {
  const currentLayer = getCurrentLayer(targetFolder, filePath);
  const checkMessageStack = [
    checkPublicAPI(targetFolder, filePath),
    checkCrossAPI(targetFolder, filePath),
  ];

  for (const importPath of imports) {
    checkMessageStack.push(checkInvalidAlias(targetFolder, filePath, importPath));

    if (!isFSDLayer(importPath)) continue;

    const importLayer = getImportLayer(importPath);
    checkMessageStack.push(
      checkAllowImport(filePath, importPath, currentLayer, importLayer),
      checkSlicePublicAPIImport(filePath, importPath, importLayer),
    );
  }

  return checkMessageStack.filter(Boolean);
}

module.exports = { checkFSDRules };
