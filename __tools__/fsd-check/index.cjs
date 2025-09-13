const { getTypeScriptFiles, getImportsFromFile, hasErrorMessages } = require('./utils.cjs');
const { checkFSDRules } = require('./fsd-check.cjs');

async function main() {
  const files = await getTypeScriptFiles();

  files
    .map(file => {
      const imports = getImportsFromFile(file);
      return checkFSDRules(file, imports);
    })
    .filter(hasErrorMessages)
    ?.forEach(errorMessages => {
      console.log(errorMessages.join('\n'));
    });
}

main();
