/* eslint-disable */
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const copyJsonFilePlugin = () => {
  return {
    name: 'copy-json-files',
    apply: 'build',

    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'src');
      const distDir = path.resolve(process.cwd(), 'dist');

      const copyRecursive = (currentPath) => {
        if (!fs.existsSync(currentPath)) {
          console.log(chalk.gray(`[copyJsonPlugin] Not found: ${currentPath}`));
          return;
        }

        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry.name);
          const relativePath = path.relative(srcDir, fullPath);
          const destPath = path.join(distDir, relativePath);

          if (entry.isDirectory()) {
            copyRecursive(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.json')) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(fullPath, destPath);

            console.log(chalk.green('[copied]'), chalk.cyan(relativePath));
          }
        }
      };

      console.log(chalk.blue.bold('[copyJsonPlugin] Start copying JSON files...'));
      copyRecursive(srcDir);
      console.log(chalk.green.bold('[copyJsonPlugin] Done.'));
    },
  };
};
