chalk = Chalk = CHALK = require('chalk');
leftPad = require('left-pad');
rightPad = require('right-pad');

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

mod = (n, m) => {
    return n % m;
}

PI = pi = π = Math.PI;
e = E = Math.E;
º = Math.PI / 180;

radToDeg = (i) => {
    return i * Math.PI / 180;
}

abs = Math.abs;

round = (i, p = 4) => {
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
Random = randInt = (min = 0, max = 2048) => {
    return Math.round(randRange(min, max));
}


out = {
    default  : (i) => {
        console.log(`\t${               (i)}`)
    },
    black    : (i) => {
        console.log(`\t${chalk.black    (i)}`)
    },
    red      : (i) => {
        console.log(`\t${chalk.red      (i)}`)
    },
    green    : (i) => {
        console.log(`\t${chalk.green    (i)}`)
    },
    yellow   : (i) => {
        console.log(`\t${chalk.yellow   (i)}`)
    },
    blue     : (i) => {
        console.log(`\t${chalk.blue     (i)}`)
    },
    magenta  : (i) => {
        console.log(`\t${chalk.magenta  (i)}`)
    },
    cyan     : (i) => {
        console.log(`\t${chalk.cyan     (i)}`)
    },
    white    : (i) => {
        console.log(`\t${chalk.white    (i)}`)
    },
    gray     : (i) => {
        console.log(`\t${chalk.gray     (i)}`)
    },
    bgBlack  : (i) => {
        console.log(`\t${chalk.bgBlack  (i)}`)
    },
    bgRed    : (i) => {
        console.log(`\t${chalk.bgRed    (i)}`)
    },
    bgGreen  : (i) => {
        console.log(`\t${chalk.bgGreen  (i)}`)
    },
    bgYellow : (i) => {
        console.log(`\t${chalk.bgYellow (i)}`)
    },
    bgBlue   : (i) => {
        console.log(`\t${chalk.bgBlue   (i)}`)
    },
    bgMagenta: (i) => {
        console.log(`\t${chalk.bgMagenta(i)}`)
    },
    bgCyan   : (i) => {
        console.log(`\t${chalk.bgCyan   (i)}`)
    },
    bgWhite  : (i) => {
        console.log(`\t${chalk.bgWhite  (i)}`)
    },

    help: () => {
        console.log(                'default'   );
        console.log(chalk.black(    'black'    ));
        console.log(chalk.red(      'red'      ));
        console.log(chalk.green(    'green'    ));
        console.log(chalk.yellow(   'yellow'   ));
        console.log(chalk.blue(     'blue'     ));
        console.log(chalk.magenta(  'magenta'  ));
        console.log(chalk.cyan(     'cyan'     ));
        console.log(chalk.white(    'white'    ));
        console.log(chalk.gray(     'gray'     ));
        console.log(chalk.bgBlack(  'bgBlack'  ));
        console.log(chalk.bgRed(    'bgRed'    ));
        console.log(chalk.bgGreen(  'bgGreen'  ));
        console.log(chalk.bgYellow( 'bgYellow' ));
        console.log(chalk.bgBlue(   'bgBlue'   ));
        console.log(chalk.bgMagenta('bgMagenta'));
        console.log(chalk.bgCyan(   'bgCyan'   ));
        console.log(chalk.bgWhite(  'bgWhite'  ));
    },

    reset: () => {
        return process.stdout.write('\033c');
    },

    // Outputs a 2d array
    array2d: (array, padding = 4, chalk_color = Chalk.bgMagenta) => {
        out.default(chalk_color(Stringify2dArray(array, padding)));
    },

    // Outputs a 1d array
    array: (array, padding, chalk_color) => {
        out.array2d([array], padding, chalk_color);
    }
}

Stringify2dArray = (array, padding = 4, max = -1) => {
    let line = '';
    for (const p of array) {
        line += '[';
        for (const q in p) {
            if (q == max - 1) {
                return line + ' ...';
            }
            line += leftPad(p[q], padding);
        }
        line += ']';
    }
    return line;
}

StringifyArray = (array, padding = 4, max = -1) => {
    return Stringify2dArray([array], padding, max);
}

print = out.default;

swap = (index_a, index_b, array) => {
    const temp = array[index_a];
    array[index_a] = array[index_b];
    array[index_b] = temp;
}

milliseconds = () => {
    return new Date().getTime();
}
