require('./utils.js');
MODE = DEG;

// Parameters
const ALGORITHM = Prim;
const PRINT = true;
const PRECISION = 1; // Number of times to run an algorithm to time it
const MIN_E_COEF = 0.2;
const MAX_E_COEF = 1;
const MIN_N = 10; // Starting power 2^n
const MAX_N = 1000; // Stopping power 2^n
const IN = Number.MAX_SAFE_INTEGER; // Out of bounds & Infinity

/******************************************************************************/
/*************************   START GRAPH ALGORITHMS   *************************/
/******************************************************************************/

function Prim (Cost) {
    const n = Cost.length - 1;
    const T = [];

    let MinCost = 0;
    const Near = [, 0];
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
        if (j === undefined) continue;

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

// Cost, n, v are input,
// Dist, From are output
function Kruskal (Cost, v = 1) {
    const n = Cost.length - 1;
    const s = [IN];
    const Dist = [IN];
    const From = [IN];

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
        if (u === undefined) continue;

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

// Generate random undirected graph of size n and and edges e
// (may be connected or unconnected)
function generateGraph (n, e, max_weight = 99) {
    let G = [];
    for (let i = 1; i <= n; i++) {
        G[i] = [];
        for (let j = 1; j <= n; j++) {
            G[i][j] = i == j ? 0 : IN;
        }
    }
    for (let k = 0; k < e; k++) {
        let i;
        let j;
        do {
            i = Math.ceil(Math.random() * n);
            j = Math.ceil(Math.random() * n);
        } while (G[i][j] != IN)
        G[i][j] = G[j][i] = Math.ceil(Math.random() * max_weight);
    }
    return G;
}

function printGraph (G) {
    let head = '  ';
    let print = '';
    for (let i = 1; i < G.length; i++) {
        head += leftPad(i, 3);
        print += '\n\t' + Chalk.bgBlue(Chalk.bold(Chalk.white(leftPad(i,2))));
        for (let j = 1; j < G[i].length; j++) {
            if (G[i][j] == IN) {
                print += '   ';
            } else if (i == j) {
                print += Chalk.red(leftPad(G[i][j], 3));
            } else {
                print += leftPad(G[i][j], 3);
            }
        }
    }
    out.default(Chalk.bgBlue(Chalk.bold(head)) + Chalk.cyan(print));
}

/******************************************************************************/
/**************************   END GRAPH ALGORITHMS   **************************/
/******************************************************************************/

/******************************************************************************/
/***************************   START TESTING TOOLS   **************************/
/******************************************************************************/

// Main testing function
(() => {
    console.log(`n, 0.2E, 0.4E, 0.6E, 0.8E, E`);

    let dn = 10;
    for (let n = MIN_N; n <= MAX_N; n += dn) {
        if (n == 100) dn = 100;

        let csv = n;

        for (let E_COEF = MIN_E_COEF; E_COEF <= MAX_E_COEF; E_COEF += 0.2) {
            E_COEF = Math.round(10 * E_COEF) / 10;
            const e = E_COEF * n * (n - 1) / 2;

            const Costs = generateGraphs(n, e);

            csv += ', ' + record_data(ALGORITHM, Costs);

            // Show results for n = 10
            if (n == 10 && PRINT) {
                out.bgBlue(Chalk.white(Chalk.bold(`    Graph (n = ${n}, e = ${E_COEF}E)    `)));
                printGraph(Costs[0]);

                const p = Prim(Costs[0]);
                out.green(`\n\tMST: ${p.T.stringify()}`);
                out.green(`Cost: ${p.MinCost}`);

                // const d = Kruskal(Costs[0], 1);
                // d.Dist.shift(); // Remove leading out of bounds sentinel
                // d.From.shift(); // Remove leading out of bounds sentinel
                // out.magenta(`Kruskal's dist[]: ${d.Dist.stringify()}`);
                // out.magenta(`Kruskal's from[]: ${d.From.stringify()}`);
                print('\n');
            }
        }

        console.log(csv);
    }
})();

function generateGraphs (n, e) {
    let array = [];
    while (array.length < PRECISION) {
        array.push(generateGraph(n, e, 9));
    }
    return array;
}

function record_data (f, array) {
    const start = microseconds();
    for (let i = 0; i < PRECISION; i++) {
        f(array[i]);
    }
    const stop = microseconds();
    return round((stop - start) / PRECISION, 3);
}
