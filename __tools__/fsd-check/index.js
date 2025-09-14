import {
  getTypeScriptFiles,
  getImportsFromFile,
  hasErrorMessages,
  printErrorMessages,
} from './utils.js';
import { checkFSDRules } from './fsd-check.js';

async function main() {
  const targetFolder = process.argv[2].trim();
  const files = await getTypeScriptFiles(targetFolder);

  const errorMessages = files
    .map(file => {
      const imports = getImportsFromFile(file);
      return checkFSDRules(targetFolder, file, imports);
    })
    .flat()
    .filter(hasErrorMessages);

  printErrorMessages(errorMessages);
}

main();
