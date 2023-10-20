#!/usr/bin/env node
import ora from 'ora';
import args from 'args';
import chalk from 'chalk';
import { transform } from '../src/index.mjs';

try {
  console.log(
    chalk.magenta(`
=========================
 A-Transform-Transformer
=========================
             __
 _(\\    |@@|
(__/\\__ \\--/ __
   \\___|----|  |   __
       \\ }{ /\\ )_ / _\\
       /\\__/\\ \\__O (__
      (--/\\--)    \\__/
      _)(  )(_
     \`---''---\`
    `)
  );

  args
    .option('b', 'Add transform booleanAttribute to all inputs of type boolean')
    .option('n', 'Add transform numbersAttribute to all inputs of type number');

  const flags = args.parse(process.argv);

  if (Object.keys(flags).length === 0) {
    console.log(chalk.red('ATT: No flags provided - there is nothing to do!'));
    console.log(
      chalk.blue(
        'ATT: Please provide a flag. To see the available flags run: a-transform-transformer --help'
      )
    );
    process.exit(1);
  }

  const { b: booleanAttributes, n: numberAttributes } = flags;
  const infoMessage = `${booleanAttributes ? ' booleanAttributes' : ''}${
    numberAttributes ? ' numberAttributes' : ''
  }`;

  const spinner = ora(`Transforming${infoMessage}`).start();
  transform(booleanAttributes, numberAttributes);
  spinner.succeed(`Transformed${infoMessage}`);
} catch (e) {
  console.log(chalk.red('ATT: Something went wrong!', e));
  process.exit(1);
}
