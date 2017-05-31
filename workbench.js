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

const p = Prim(Cost);
out.red(p.MinCost);
p.T.print();

////////////////// DIJKSTRA /////////////////

// Cost, n, v are input,
// Dist, From are output
function Dijkstra (Cost, v) {
    const n = Cost.length - 1;
    const s = [OB];
    const Dist = [OB];
    const From = [OB];

    for (let i = 1; i <= n; i++) {
        s[i] = 0;
        Dist[i] = Cost[v][i];
        From[i] = v;
    }
    s[v] = 1;
    for (let num = 1; num < n; num++) {
        //choose u s.t. s[u] = 0 and Dist[u] is minimum;
        let min_u;
        let min_dist = IN;
        for (let u = 1; u <= n; u++) {
            if (s[u] == 0 && Dist[u] < min_dist) {
                min_u = u;
                min_dist = Dist[u];
            }
        }
        let u = min_u;
        s[u] = 1;

        // for each neighbor w of u with s[w] = 0 {
        for (let w = 1; w <= n; w++) {
            if (Cost[u][w] != IN && s[w] == 0) {

                if (Dist[u] + Cost[u][w] < Dist[w]) {
                    Dist[w] = Dist[u] + Cost[u][w];
                    From[w] = u;
                }

            }
        }
    }

    return {Dist: Dist, From: From};
}

function Find2 (x) {
    let i = x;
    while (A[i] != i) {
        i = A[i];
    }
    return i;
}

// merge sets labeled a and b
function Merge3 (a,b) {
    if (height[a] == height[b]) {
        A[b] = a;
        height[a] = height[a]+1;
    } else if (height[a] > height[b]) {
        A[b] = a;
    } else {
        A[a] = b;
    }
}

const d = Dijkstra(Cost, 1);
d.Dist.shift(); // Remove leading out of bounds sentinel
d.From.shift(); // Remove leading out of bounds sentinel
d.Dist.print();
d.From.print();
