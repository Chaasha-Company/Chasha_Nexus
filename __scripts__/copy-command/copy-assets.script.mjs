/* eslint-disable */
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const FILES_TO_COPY = ['.env', '.env.production', '.env.development', '.htaccess', '.dockerignore', '.gitignore', 'index.html', 'package.json', 'package-lock.json', 'public', 'data'];

async function copyAssets() {
  console.log(chalk.blue.bold('\n🚀 Starting Asset Copy Process...\n'));

  try {
    await fs.ensureDir(DIST_DIR);

    for (const item of FILES_TO_COPY) {
      const srcPath = path.join(ROOT_DIR, item);

      if (!(await fs.pathExists(srcPath))) {
        console.warn(chalk.yellow(`⚠️ Skipped: ${item} (Not Found)\n`));
        continue;
      }

      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        const folderName = path.basename(item);
        const destPath = path.join(DIST_DIR, folderName);

        console.log(chalk.cyan(`📂 Copying Directory: ${item}`));
        await fs.copy(srcPath, destPath, { overwrite: true });
        console.log(chalk.green(`   ✅ Copied to: dist/${folderName}\n`));
      } else {
        const destPath = path.join(DIST_DIR, item);
        console.log(chalk.cyan(`📄 Copying File: ${item}`));
        await fs.copy(srcPath, destPath);
        console.log(chalk.green(`   ✅ Success\n`));
      }
    }

    console.log(chalk.bgGreen.black.bold('✨ Assets copied successfully.\n'));
  } catch (error) {
    console.error(chalk.red.bold('❌ Error copying assets:'), error.message);
    process.exit(1);
  }
}

copyAssets();
