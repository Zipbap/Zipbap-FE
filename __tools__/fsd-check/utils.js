import fg from 'fast-glob';
import fs from 'fs';
import parser from '@typescript-eslint/parser';
import path from 'path';

// constants
const SLASH = path.sep;

/** 타입스크립트 기반의 파일을 가져옵니다. */
export function getTypeScriptFiles(targetFolder) {
  return fg([`${targetFolder}/**/*.{ts,tsx}`], { absolute: true });
}

/** 파일의 import 구문을 가져옵니다. */
export function getImportsFromFile(filePath) {
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
export function getNotAllowImportMessage(filePath, importPath) {
  return (
    `🔴 ${filePath} - ${importPath}를 import 할 수 없습니다.\n` +
    `fsd에서는 자신보다 하위의 레이어에서만 import 할 수 있습니다.\n`
  );
}

/** 에러 메시지가 있는지 확인합니다. */
export function hasErrorMessages(errorMessages) {
  return errorMessages.length > 0;
}
