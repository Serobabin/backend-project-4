#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import pageLoader from '../src/index.js';

const program = new Command();
const currentDir = process.cwd();

program
  .description('some description')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<url>')
  .option('-o, --output [dir]', 'output dir', currentDir)
  .action((url, options) => {
    console.log(pageLoader(url, options.output));
  });

program.parse();
