chalk = Chalk = CHALK = require('chalk');
leftPad = require('left-pad');
rightPad = require('right-pad');
Table = require('table');

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

randomIntArray = (length = 10, min = 0, max = 100) => {
    let array = [];
    while (array.length < length) {
        array.push(randInt(min, max));
    }
    return array;
}

sequentialIntArray = (length = 10, start = 0) => {
    let array = [];
    for (let i = start; i < length; i++) {
        array[i] = i;
    }
    return array;
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
    },

    setTable: (config) => {
        out.table_header = true;
        out.table_config = config;
        out.table_stream = Table.createStream(config);
    },

    table: (array) => {
        for (const i in array) {
            if (out.table_config.columns[i].patch) {
                array[i] = out.table_config.columns[i].patch(array[i]);
            }
            if (out.table_config.boldHeader && out.table_header) {
                array[i] = Chalk.bold(array[i]);
            }
        }
        out.table_stream.write(array);
        out.table_header = false;
    }
}

out.setTable({columnDefault: {width: 20}, columnCount: 4});

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


milliseconds = () => {
    return new Date().getTime();
}

Array.prototype.stringify = function (padding = 3, max_length = -1) {
    let line = '';
    if (typeof this[0] == 'object') {
        for (const val of this) {
            line += val.stringify(padding, max_length) + '\n';
        }
    } else {
        line += '[';
        for (const val of this) {
            if (max_length != -1 && line.length >= max_length) {
                return line + ' ...';
            }
            line += leftPad(val, padding);
        }
        line += ']';
    }
    return line;
}

Array.prototype.test = function () {
    for (const i of this)
    console.log(i);
}

// Array.prototype.stringify = function (padding = 3, max_length = -1) {
//     let line = '[';
//     for (const i in this) {
//         if (typeof this[i] == 'object') {
//             line += this[i].stringify(padding, max_length) + ',\n';
//         } else {
//             if (i == max_length - 1) return line + ' ...';
//             line += leftPad(this[i], padding) + ' ';
//         }
//     }
//     return line + ']';
// }

Array.prototype.swap = function (index_a, index_b) {
    const temp = this[index_a];
    this[index_a] = this[index_b];
    this[index_b] = temp;
    return this;
}

Array.prototype.clone = function () {
    let result = [];
    for (const i in this) {
        if (typeof this[i] == 'object') {
            result[i] = this[i].clone();
        } else {
            result[i] = this[i];
        }
    }
    return result;
}

Array.prototype.median = function () {
    return this[this.length / 2];
}

Array.prototype.mean = function () {
    let sum = 0;
    for (const i of this) sum += i;
    return sum / this.length;
}
