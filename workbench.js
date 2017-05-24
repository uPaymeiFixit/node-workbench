require('./utils.js');
MODE = DEG;

function Prim (/*Cost, n, T, MinCost*/) {
    let MinCost = 0;
    Near[1] = 0;
    for (let i = 2; i < Cost.length; i++) {
        Near[i] = 1;
    }
    for (let i = 1; i < Cost.length - 1; i++) {
        let j = minJ();
        T.push(`(${j}, ${Near[j]})`); // add edge to the Minimum Spanning Tree
        MinCost += Cost[j][Near[j]];
        Near[j] = 0;
        for (let k = 1; k < Cost.length; k++) {
            if (Near[k] != 0 && Cost[k][Near[k]] > Cost[k][j]) {
                Near[k] = j; // update cost if lower
            }
        }
    }
    return MinCost;
}

function minJ () {
    let min_j = 1;
    let min_cost = Cost[1][Near[1]];
    for (let j = 2; j < Cost.length; j++) {
        if (Near[j] != 0 && Cost[j][Near[j]] < min_cost) {
            min_j = j;
            min_cost = Cost[j][Near[j]];
        }
    }
    return min_j;
}
const OB = IN = 9999;
const Cost = [
/*      OB   1   2   3   4   5   6 */
/*OB*/ [OB, OB, OB, OB, OB, OB, OB],
/* 1*/ [OB,  0, 16, IN, IN, 19, 21],
/* 2*/ [OB, 16,  0,  5,  6, IN, 11],
/* 3*/ [OB, IN,  5,  0, 10, IN, IN],
/* 4*/ [OB, IN,  6, 10,  0, 18, 14],
/* 5*/ [OB, 19, IN, IN, 18,  0, 33],
/* 6*/ [OB, 21, 11, IN, 14, 33,  0]
];
const Near = [];
Near[0] = OB;
const T = [];

out.red(Prim());
T.print();
