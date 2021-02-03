import readline from 'readline';
import chalk from 'chalk';
import { PrettyNumbers } from './pretty-numbers.js';

const pn = new PrettyNumbers();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.blue('======================================='));
console.log(chalk.blue('= Pretty Numbers                      ='));
console.log(chalk.blue('=                                     ='));
console.log(chalk.blue('= Input any number and press enter    ='));
console.log(chalk.blue('= Type q at any time to quit          ='));
console.log(chalk.blue('======================================='));

function getInput() {
    rl.question("Enter a number > ", function(num) {

        if (num.toLowerCase() === 'q') {
            rl.close();
        }
        else {
            try {
                const pretty = pn.pretty(num);
                console.log(chalk.green(`Pretty: ${pretty}`));
            }
            catch(e) {
                console.log(chalk.red(`${e.message}\n`));
            }

            getInput();
        }
    });
}

rl.on('close', function() {
    console.log(chalk.blue('\n======================================='));
    console.log(chalk.blue('= Thank you for using PrettyNumbers!  ='));
    console.log(chalk.blue('=======================================\n'));

    process.exit(0);
});

getInput();
