import fg from 'fast-glob';
import fs from 'fs';
import parser from '@typescript-eslint/parser';
import path from 'path';
import { errorMessages } from './error-message.js';
import { bgBlack, bgGreen } from './cli-color.js';

// constants
const SLASH = path.sep;

/** 타입스크립트 기반의 파일을 가져옵니다. */
export function getTypeScriptFiles(targetFolder) {
  return fg([`${targetFolder}/**/*.{ts,tsx}`], {
    absolute: true,
    ignore: ['**/node_modules/**'],
  });
}

const astCache = new Map();
/** 파일의 import 구문을 가져옵니다. */
export function getImportsFromFile(filePath) {
  if (astCache.has(filePath)) return astCache.get(filePath);
  const code = fs.readFileSync(filePath, 'utf-8');

  const ast = parser.parse(code, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    range: true,
    tokens: true,
  });
  const imports = [];
  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      imports.push(node.source.value);
    }
  }

  astCache.set(filePath, imports);
  return imports;
}

/** 파일의 현재 레이어를 가져옵니다. */
export function getCurrentLayer(targetFolder, filePath) {
  return filePath.split(`${targetFolder}${SLASH}`)[1].split(SLASH)[0];
}

/** import 구문의 레이어를 가져옵니다. */
export function getImportLayer(importPath) {
  return importPath.split('/')[0].split('@')[1];
}

/** FSD 레이어인지 확인합니다. */
export function isFSDLayer(importPath) {
  return ['@app', '@pages', '@widgets', '@features', '@entities', '@shared'].some(p =>
    importPath.startsWith(p),
  );
}

/** import 구문이 FSD Layer 규칙을 준수하는지 확인합니다. */
export function isAllowImport(LAYER, currentLayer, importLayer) {
  return !(LAYER.indexOf(currentLayer) > LAYER.indexOf(importLayer));
}

/** import 구문이 FSD Layer 규칙을 준수하지 않는 경우의 메시지를 가져옵니다. */
export function getNotAllowImportMessage(currentLayer, filePath, importPath) {
  return errorMessages.notAllowImport(currentLayer, filePath, importPath);
}

/** 에러 메시지가 있는지 확인합니다. */
export function hasErrorMessages(errorMessages) {
  return errorMessages.length > 0;
}

/** Layer/Slice를 가져옵니다.
 *
 * 예: pages/auth
 */
export function getLayerSlice(targetFolder, filePath) {
  const relativePath = filePath.split(`${targetFolder}${SLASH}`)[1];
  return relativePath.split(SLASH).slice(0, 2).join(SLASH);
}

/** Layer/Slice 경로에 Public API가 존재하는지 확인 */
export function hasPublicAPI(publicAPICache, targetFolder, slicePath) {
  // cache hit
  if (publicAPICache.has(slicePath)) return publicAPICache.get(slicePath);

  // cache miss
  const PUBLIC_API = 'index.ts';
  const indexPath = path.join(`${targetFolder}`, slicePath, PUBLIC_API);
  const exists = fs.existsSync(indexPath);
  publicAPICache.set(slicePath, exists);

  return exists;
}

/** 전체 에러 메시지를 출력합니다. */
export function printErrorMessages(errorMessages) {
  if (errorMessages.length === 0) {
    console.log(`${bgGreen('모든 FSD 규칙을 준수했습니다.')}`);
    return;
  }

  console.log(errorMessages.join('\n'));
  console.log(`${bgBlack(`\n아직 해결하지 못한 총 ${errorMessages.length}개의 에러가 있습니다.`)}`);
}
