import path from 'path';

import {
  getCurrentLayer,
  getImportLayer,
  getLayerSlice,
  getNotAllowImportMessage,
  hasPublicAPI,
  isAllowImport,
  isFSDLayer,
} from './utils.js';
import { errorMessages } from './error-message.js';

// constant
const LAYER = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const CROSS_API_SYMBOL = 'x';
const SLASH = path.sep;
const CROSS_API_LAYER = 'entities';

// NOTE: not to be reported again (publicAPI report)
const alreadyReportedSlices = new Set();

// cache
const publicAPICache = new Map();

/** Layer/Slice 경로에 Public API가 존재하는지 확인 및 에러 메시지 반환 */
function checkPublicAPI(targetFolder, filePath) {
  const layerSlice = getLayerSlice(targetFolder, filePath);

  if (
    hasPublicAPI(publicAPICache, targetFolder, layerSlice) ||
    alreadyReportedSlices.has(layerSlice)
  )
    return null;

  alreadyReportedSlices.add(layerSlice);

  return errorMessages.missingPublicAPI(filePath, layerSlice);
}

/** cross API 방식이 아닌 경우의 에러 메시지 반환 */
function checkCrossAPI(targetFolder, filePath) {
  // NOTE: cross api 방식이 아닌 경우
  if (!filePath.includes(`@${CROSS_API_SYMBOL}${SLASH}`)) return null;

  // NOTE: cross api 레이어인 경우
  if (getCurrentLayer(targetFolder, filePath) === CROSS_API_LAYER) return null;

  return errorMessages.invalidCrossAPI(filePath, CROSS_API_SYMBOL, CROSS_API_LAYER);
}

/** invalid alias 사용 경우의 에러 메시지 반환 */
function checkInvalidAlias(targetFolder, filePath, importPath) {
  const invalidPrefixes = LAYER.map(layer => `@/${targetFolder}/${layer}`);

  if (!invalidPrefixes.some(prefix => importPath.startsWith(prefix))) return null;

  return errorMessages.invalidAlias(filePath, importPath, targetFolder);
}

/** FSD Layer 규칙을 준수하지 않는 경우의 에러 메시지 반환 */
function checkAllowImport(filePath, importPath, currentLayer, importLayer) {
  if (isAllowImport(LAYER, currentLayer, importLayer)) return null;

  const errorMessage = getNotAllowImportMessage(filePath, importPath);

  return errorMessage;
}

/** Layer의 Slice에서 public API로 import를 하지 않는 경우의 에러 메시지 반환 */
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

  return errorMessages.sliceWithoutPublicAPI(filePath, importPath, importLayer);
}

// core
export function checkFSDRules(targetFolder, filePath, imports) {
  const currentLayer = getCurrentLayer(targetFolder, filePath);

  const errorMessageStack = [];

  errorMessageStack.push(
    checkPublicAPI(targetFolder, filePath),
    checkCrossAPI(targetFolder, filePath),
  );

  for (const importPath of imports) {
    errorMessageStack.push(checkInvalidAlias(targetFolder, filePath, importPath));

    if (!isFSDLayer(importPath)) continue;

    const importLayer = getImportLayer(importPath);
    errorMessageStack.push(
      checkAllowImport(filePath, importPath, currentLayer, importLayer),
      checkSlicePublicAPIImport(filePath, importPath, importLayer),
    );
  }

  return errorMessageStack.filter(Boolean);
}
