import chokidar from 'chokidar';
import path from 'path';
import {
  getTypeScriptFiles,
  getImportsFromFile,
  hasErrorMessages,
  printErrorMessages,
} from './utils.js';
import { checkFSDRules } from './fsd-check.js';
import { red } from './cli-color.js';

async function runCheck(targetFolder) {
  const files = await getTypeScriptFiles(targetFolder);
  const errorMessages = files
    .flatMap(file => {
      const imports = getImportsFromFile(file);
      return checkFSDRules(targetFolder, file, imports);
    })
    .filter(hasErrorMessages);

  printErrorMessages(errorMessages);
}
async function main() {
  const targetFolder = process.argv[2].trim();

  const isWatchMode = process.argv.includes('--watch');

  if (!targetFolder) {
    console.log(red('targetFolder is required'));
    process.exit(1);
  }

  await runCheck(targetFolder);

  if (isWatchMode) {
    chokidar
      .watch(`${targetFolder}`, {
        ignored: /node_modules/,
      })
      .on('all', async (event, changedPath) => {
        console.log(`\n파일 변경 감지: [${event}] ${path.relative(process.cwd(), changedPath)}`);
        await runCheck(targetFolder);
      });
  }
}

main();
