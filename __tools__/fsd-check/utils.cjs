const fg = require('fast-glob');
const fs = require('fs');
const parser = require('@typescript-eslint/parser');

function getTypeScriptFiles() {
  return fg(['src/**/*.{ts,tsx}'], { absolute: true });
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

function getCurrentLayer(filePath) {
  return filePath.split('src/')[1].split('/')[0];
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
