require('./utils.js');
MODE = DEG;

const OB = IN = 9999; // Out of bounds & Infinity

function Prim (Cost) {
    const n = Cost.length - 1;
    const T = [];

    let MinCost = 0;
    const Near = [OB, 0];
    for (let i = 2; i <= n; i++) {
        Near[i] = 1;
    }
    for (let i = 1; i <= n - 1; i++) {
        // let j be an index s.t. (Near(j) != 0) and Cost(j, Near(j)) is minimum;
        let min_j;
        let min_cost = IN;
        for (let j = 1; j <= n; j++) {
            if (Near[j] != 0 && Cost[j][Near[j]] < min_cost) {
                min_j = j;
                min_cost = Cost[j][Near[j]];
            }
        }
        let j = min_j;

        T.push(`(${j}, ${Near[j]})`); // add edge to the Minimum Spanning Tree
        MinCost += Cost[j][Near[j]];
        Near[j] = 0;
        for (let k = 1; k <= n; k++) {
            if (Near[k] != 0 && Cost[k][Near[k]] > Cost[k][j]) {
                Near[k] = j; // update cost if lower
            }
        }
    }
    return {MinCost: MinCost, T: T};
}

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

const o = Prim(Cost);
out.red(o.MinCost);
o.T.print();
