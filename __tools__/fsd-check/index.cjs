const { getTypeScriptFiles, getImportsFromFile, hasErrorMessages } = require('./utils.cjs');
const { checkFSDRules } = require('./fsd-check.cjs');

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
