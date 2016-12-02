require('./utils.js');
MODE = DEG;

{
    out.reset();
    out.cyan   ("Exercises");
    out.default(chalk.red("9.1") + ": " + chalk.yellow("4, 13, 20, 25"   ));
    out.default(chalk.red("9.2") + ": " + chalk.yellow("3, 4, 5, 9, 13"  ));
    out.default(chalk.red("9.3") + ": " + chalk.yellow("2, 8, 9, 10, 15" ));

    out.cyan   ("Computer Exercises");
    out.default(chalk.green("9.1") + ": " + chalk.yellow("2") + '\n');
}

/////////////////////////////////////////////////////
////////// Linear least squares : page 428 //////////
/////////////////////////////////////////////////////
let f = {
    p: function(x, m) {
        let sum = 0;
        for (let k = 0; k <= m; k++) {
            sum += x[k];
        }
        return sum;
    },
    q: function(y, m) {
        let sum = 0;
        for (let k = 0; k <= m; k++) {
            sum += y[k];
        }
        return sum;
    },
    r: function(x, y, m) {
        let sum = 0;
        for (let k = 0; k <= m; k++) {
            sum += x[k] * y[k];
        }
        return sum;
    },
    s: function(x, m) {
        let sum = 0;
        for (let k = 0; k <= m; k++) {
            sum += pow(x[k], 2);
        }
        return sum;
    },
    d: function(x, m) {
        return (m + 1) * this.s(x, m) - pow(this.p(x, m), 2);
    },
    a: function(x, y, m) {
        return ((m + 1) * this.r(x, y, m) - this.p(x, m) * this.q(y, m)) / this.d(x, m);
    },
    b: function(x, y, m) {
        return (this.s(x, m) * this.q(y, m) - this.p(x, m) * this.r(x, y, m)) / this.d(x, m)
    }
}
/////////////////////////////////////////////////////
//////// END Linear least squares : page 428 ////////
/////////////////////////////////////////////////////


let t = generate_table(4.1);
let x = t.x;
let y = t.y;
let m = t.m;
let p = f.p(x, m);
let q = f.q(y, m);
let r = f.r(x, y, m);
let s = f.s(x, m);
let a = f.a(x, y, m);
let b = f.b(x, y, m);

// Generate / fill table of values
function generate_table(dataset, size) {
    let t = {
        x: [],
        y: [],
        m: 0
    };

    switch (dataset) {
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
        case 4:
            t = {
                x: [-3, -2, -1,  0,  1,  2,  3],
                y: [ 0,  1,  2,  3,  4,  5,  6]
            };
            break;
        case 4.1:
            t = {
                x: [-3, -2,  0,  2, 3],
                y: [ 4,  2,  3,  4, 6]
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
        case 25: // Exercise 25
            t = {
                x: [1.0, 2.0, 2.5, 3.0],
                y: [3.7, 4.1, 4.3, 5.0]
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
    out.cyan("———————————— TABLE ————————————");
    out.array2d([t.x, t.y], 2);
    out.default('');
    return t;
}

// Equation (2) : page 427
function φ(x, y) {
    out.cyan('Error φ(x,y):');
    let sum = 0;
    for (let k = 0; k <= m; k++) {
        sum += pow(a * x[k] + b - y[k], 2);
    }
    out.bgBlue(`φ: ${sum}`);
    return sum;
}

// Equation (3) : page 428 - normal equations
function normal_equations(x, y, m) {
    out.cyan('Normal Equations:');
    out.red(`${s}a + ${p}b = ${r}`);
    out.green(`${p}a + ${(m + 1)}b = ${q}`);
}

// Least Squares Method
function least_squares(x, y, m) {
    out.cyan('Least Squares Method:')
    out.green(`y = ${round(a, 3)}x + ${round(b, 3)}`);
}

φ(x, y);
normal_equations(x, y, m);
least_squares(x, y, m);
