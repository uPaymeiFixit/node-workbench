require('./utils.js');
MODE = DEG;

out.reset();
out.cyan   ("Exercises");
out.default(chalk.red("9.1") + ": " + chalk.yellow("4, 13, 20, 25"   ));
out.default(chalk.red("9.2") + ": " + chalk.yellow("3, 4, 5, 9, 13"  ));
out.default(chalk.red("9.3") + ": " + chalk.yellow("2, 8, 9, 10, 15" ));

out.cyan   ("Computer Exercises");
out.default(chalk.green("9.1") + ": " + chalk.yellow("2"));


let t = generate_table(20);
let x = t.x;
let y = t.y;
let m = t.m;

let av = a(x, y, m);
let bv = b(x, y, m);
let φv = φ(av, bv, x, y);

out.cyan("———————————— TABLE ————————————");
out.array2d([x, y]);
out.default("");
out.bgRed(`a: ${av}`);
out.bgRed(`b: ${bv}`);
out.bgBlue(`φ: ${φv}`);
out.green(`y = ${round(av, 3)}x + ${round(bv, 3)}`);

function generate_table(dataset, size) {
    let t = {
        x: [],
        y: [],
        m: 0
    };

    switch (dataset) {
        case 0:
            t = {
                x: [-3, -2, -1,  0,  1,  2,  3],
                y: [ 0,  1,  2,  3,  4,  5,  6]
            };
            break;
        case 1: // Example 1
            t = {
                x: [ 4,  7, 11, 13, 17],
                y: [ 2,  0,  2,  6,  7]
            };
            break;
        case 2: // Exercise 1
            t = {
                x: [  -1,    2,    3],
                y: [ 5/4,  4/3, 5/12]
            };
            break;
        case 13: // Exercise 13
            t = {
                x: [1, 2, 3, 4],
                y: [0, 1, 1, 2]
            };
            break;
        case 20: // Exercise 20
            t = {
                x: [ 0,  1,  2],
                y: [ 5, -6,  7]
            };
            break;
        case -1:
            out.yellow("test");
            for (let i = 0; i <= size; i++) {
                t.x[i] = randInt(0, 10);
                t.y[i] = randInt(0, 10);
            }
    }
    if (t.x.length != t.y.length) {
        throw "x and y need to have the same length";
    }
    t.m = t.x.length - 1;
    return t;
}

// Equation (2) : page 427
function φ(a, b, x, y) {
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += pow(a * x[k] + b - y[k], 2);
    }
    return sum;
}


/////////////////////////////////////////////////////
////////// Linear least squares : page 428 //////////
/////////////////////////////////////////////////////
function p(x, m) {
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += x[k];
    }
    return sum;
}
function q(y, m) {
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += y[k];
    }
    return sum;
}
function r(x, y, m) {
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += x[k] * y[k];
    }
    return sum;
}
function s(x, m) {
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += pow(x[k], 2);
    }
    return sum;
}
function d(x, m) {
    return (m + 1) * s(x, m) - pow(p(x, m), 2);
}
function a(x, y, m) {
    return ((m + 1) * r(x, y, m) - p(x, m) * q(y, m)) / d(x, m);
}
function b(x, y, m) {
    return (s(x, m) * q(y, m) - p(x, m) * r(x, y, m)) / d(x, m)
}
/////////////////////////////////////////////////////
//////// END Linear least squares : page 428 ////////
/////////////////////////////////////////////////////
