import chokidar from 'chokidar';
import {
  getTypeScriptFiles,
  getImportsFromFile,
  hasErrorMessages,
  printErrorMessages,
  beforeRunCheck,
  validateTargetFolder,
} from './utils.js';
import { checkFSDRules } from './fsd-check.js';

async function runFSDCheck(targetFolder, isWatchMode = false) {
  const files = await getTypeScriptFiles(targetFolder);

  const errorMessages = files
    .flatMap(file => {
      const imports = getImportsFromFile(file);
      return checkFSDRules(targetFolder, file, imports);
    })
    .filter(hasErrorMessages);

  printErrorMessages(errorMessages, isWatchMode);
}

function watchFSDCheck(isWatchMode, targetFolder) {
  if (!isWatchMode) return;

  const watcher = chokidar.watch(targetFolder, {
    ignored: /node_modules/,
  });

  let isReady = false;

  watcher
    .on('ready', () => {
      isReady = true;
    })
    .on('all', async () => {
      if (!isReady) return;

      beforeRunCheck();

      await runFSDCheck(targetFolder, isWatchMode);
    });
}

async function main() {
  const targetFolder = process.argv[2].trim();

  const isWatchMode = process.argv.includes('--watch');

  validateTargetFolder(targetFolder);

  await runFSDCheck(targetFolder, isWatchMode);

  watchFSDCheck(isWatchMode, targetFolder);
}

main();
