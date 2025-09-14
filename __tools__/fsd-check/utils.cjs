const fg = require('fast-glob');
const fs = require('fs');
const parser = require('@typescript-eslint/parser');
const path = require('path');

function getTypeScriptFiles(targetFolder) {
  return fg([`${targetFolder}/**/*.{ts,tsx}`], { absolute: true });
}

function getImportsFromFile(filePath) {
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

const SLASH = path.sep;

function getCurrentLayer(targetFolder, filePath) {
  return filePath.split(`${targetFolder}${SLASH}`)[1].split(SLASH)[0];
}

function getImportLayer(importPath) {
  return importPath.split('/')[0].split('@')[1];
}

function isFSDLayer(importPath) {
  return ['@app', '@pages', '@widgets', '@features', '@entities', '@shared'].some(p =>
    importPath.startsWith(p),
  );
}

function isAllowImport(LAYER, currentLayer, importLayer) {
  return !(LAYER.indexOf(currentLayer) > LAYER.indexOf(importLayer));
}

function getNotAllowImportMessage(filePath, importPath) {
  return (
    `🔴 ${filePath} - ${importPath}를 import 할 수 없습니다.\n` +
    `fsd에서는 자신보다 하위의 레이어에서만 import 할 수 있습니다.\n`
  );
}

function hasErrorMessages(errorMessages) {
  return errorMessages.length > 0;
}

module.exports = {
  getTypeScriptFiles,
  getImportsFromFile,
  getCurrentLayer,
  getImportLayer,
  isFSDLayer,
  isAllowImport,
  getNotAllowImportMessage,
  hasErrorMessages,
};
