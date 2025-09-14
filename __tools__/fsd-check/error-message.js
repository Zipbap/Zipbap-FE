import { pathColor, yellow, green, blue, cyan, red } from './cli-color.js';

export const errorMessages = {
  missingPublicAPI: (filePath, layerSlice) =>
    `${pathColor(filePath)}\n${cyan(`slice "${layerSlice}" 에 public API(index.ts)가 존재하지 않습니다.`)}\n`,

  invalidCrossAPI: (filePath, crossApiSymbol, crossApiLayer) =>
    `${pathColor(filePath)}\n${blue(`cross API(@${crossApiSymbol}) 방식은 ${crossApiLayer} 레이어에서만 허용됩니다.`)}\n`,

  invalidAlias: (filePath, importPath, targetFolder) =>
    `${pathColor(filePath)} - ${pathColor(importPath)}\n` +
    `${green(`@/${targetFolder}`, '형태의 import는 허용되지 않습니다. 올바른 alias를 사용하세요.')}\n`,

  sliceWithoutPublicAPI: (filePath, importPath, importLayer) =>
    `${pathColor(filePath)} - ${pathColor(importPath)}\n` +
    `${yellow(importLayer, '레이어의 slice는 public API(index.ts)를 통해서만 import 가능합니다.')}\n`,

  notAllowImport: (filePath, importPath) =>
    `${pathColor(filePath)} - ${pathColor(importPath, '를 import 할 수 없습니다.')}\n` +
    `${red('fsd에서는 자신보다 하위의 레이어에서만 import 할 수 있습니다.')}\n`,
};
