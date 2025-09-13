const { getTypeScriptFiles, getImportsFromFile } = require('./utils.cjs');
const { checkFSDRule } = require('./fsdRuleCheck.cjs');

async function main() {
  const files = await getTypeScriptFiles();
  for (const file of files) {
    // import
    const imports = getImportsFromFile(file);

    // rule check
    const messages = checkFSDRule(file, imports);
    if (messages.length > 0) console.log(messages.join('\n'));
  }
}

main();
