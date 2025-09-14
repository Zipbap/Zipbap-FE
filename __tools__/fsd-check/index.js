import { getTypeScriptFiles, getImportsFromFile, hasErrorMessages } from './utils.js';
import { checkFSDRules } from './fsd-check.js';

async function main() {
  const targetFolder = process.argv[2].trim();

  const files = await getTypeScriptFiles(targetFolder);

  files
    .map(file => {
      const imports = getImportsFromFile(file);
      return checkFSDRules(targetFolder, file, imports);
    })
    .filter(hasErrorMessages)
    .forEach(errorMessages => {
      console.log(errorMessages.join('\n'));
    });
}

main();
