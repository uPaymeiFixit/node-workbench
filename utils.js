chalk = require('chalk');

// https://www.npmjs.com/package/chalk
module.exports = {}

RAD = true;
DEG = false;
MODE = RAD;

cos = (i) => {
    return MODE ? Math.cos(i) : Math.cos(radToDeg(i));
}
sin = (i) => {
    return MODE ? Math.sin(i) : Math.sin(radToDeg(i));
}
tan = (i) => {
    return MODE ? Math.tan(i) : Math.tan(radToDeg(i));
}

pow = Math.pow;
sqrt = Math.sqrt;

PI = pi = π = Math.PI;
e = E = Math.E;
º = Math.PI / 180;

radToDeg = (i) => {
    return i * Math.PI / 180;
}

abs = Math.abs;

round = (i, p) => {
    if (p == 0) {
        throw "Precision cannot be 0.";
    }
    if (p !== undefined) {
        p = Math.pow(10, p);
        return Math.round(i * p) / p;
    }
    return Math.round(i);
}

ceil = Math.ceil;
floor = Math.floor;

rand = random = Math.random;
randRange = (min, max) => {
    return Math.random() * (max - min) + min;
}
randInt = (min, max) => {
    return Math.round(randRange(min, max));
}


out = {
    default     : function(i) {
        console.log(`\t${                   (i)}`)
    },
    black       : function(i) {
        console.log(`\t${chalk.black        (i)}`)
    },
    red         : function(i) {
        console.log(`\t${chalk.red          (i)}`)
    },
    green       : function(i) {
        console.log(`\t${chalk.green        (i)}`)
    },
    yellow      : function(i) {
        console.log(`\t${chalk.yellow       (i)}`)
    },
    blue        : function(i) {
        console.log(`\t${chalk.blue         (i)}`)
    },
    magenta     : function(i) {
        console.log(`\t${chalk.magenta      (i)}`)
    },
    cyan        : function(i) {
        console.log(`\t${chalk.cyan         (i)}`)
    },
    white       : function(i) {
        console.log(`\t${chalk.white        (i)}`)
    },
    gray        : function(i) {
        console.log(`\t${chalk.gray         (i)}`)
    },
    bgBlack     : function(i) {
        console.log(`\t${chalk.bgBlack      (i)}`)
    },
    bgRed       : function(i) {
        console.log(`\t${chalk.bgRed        (i)}`)
    },
    bgGreen     : function(i) {
        console.log(`\t${chalk.bgGreen      (i)}`)
    },
    bgYellow    : function(i) {
        console.log(`\t${chalk.bgYellow     (i)}`)
    },
    bgBlue      : function(i) {
        console.log(`\t${chalk.bgBlue       (i)}`)
    },
    bgMagenta   : function(i) {
        console.log(`\t${chalk.bgMagenta    (i)}`)
    },
    bgCyan      : function(i) {
        console.log(`\t${chalk.bgCyan       (i)}`)
    },
    bgWhite     : function(i) {
        console.log(`\t${chalk.bgWhite      (i)}`)
    },

    help: function() {
        console.log(`default`);
        console.log(chalk.black(`black`));
        console.log(chalk.red(`red`));
        console.log(chalk.green(`green`));
        console.log(chalk.yellow(`yellow`));
        console.log(chalk.blue(`blue`));
        console.log(chalk.magenta(`magenta`));
        console.log(chalk.cyan(`cyan`));
        console.log(chalk.white(`white`));
        console.log(chalk.gray(`gray`));
        console.log(chalk.bgBlack(`bgBlack`));
        console.log(chalk.bgRed(`bgRed`));
        console.log(chalk.bgGreen(`bgGreen`));
        console.log(chalk.bgYellow(`bgYellow`));
        console.log(chalk.bgBlue(`bgBlue`));
        console.log(chalk.bgMagenta(`bgMagenta`));
        console.log(chalk.bgCyan(`bgCyan`));
        console.log(chalk.bgWhite(`bgWhite`));
    },

    reset: function() {
        return process.stdout.write('\033c');
    },

    array2d: function(a, p) {
        for (let i = 0; i < a.length; i++) {
            let line = ``;
            for (let j = 0; j < a[i].length; j++) {
                let b = a[i][j];
                if (b === undefined) {
                    b = '';
                }
                if (p) {
                    b = b.toFixed(p);
                }
                line += b + ` `;
            }
            this.bgMagenta(line);
        }
    }
}
