require('./utils.js');
MODE = DEG;

// Parameters
const PRECISION = 1; // Number of times to run an algorithm to time it
const MIN_E_COEF = 0.2;
const MAX_E_COEF = 0.2;
const MIN_N = 10; // Starting power 2^n
const MAX_N = 10; // Stopping power 2^n
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
function Dijkstra (Cost, v = 1) {
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
        print += '\n\t' + Chalk.yellow(leftPad(i,2));
        for (let j = 1; j < G[i].length; j++) {
            print += G[i][j] == IN ? '   ' : leftPad(G[i][j], 3);
        }
    }
    out.cyan(Chalk.yellow(head) + print);
}

/******************************************************************************/
/**************************   END GRAPH ALGORITHMS   **************************/
/******************************************************************************/

/******************************************************************************/
/***************************   START TESTING TOOLS   **************************/
/******************************************************************************/

// Main testing function
(() => {
    let export_time = '\nTime (ms), ';

    let options = {
        columnDefault: {width: 12},
        columnCount: 5,
        boldHeader: true,
        border: Table.getBorderCharacters('norc'),
        columns: {
            0: {patch: Chalk.yellow, width: 3, alignment: 'left'},
            1: {patch: Chalk.cyan, width: 4},
            2: {patch: Chalk.red, alignment: 'right'},
            3: {patch: Chalk.magenta, alignment: 'right'},
            4: {patch: Chalk.green, width: 131}
        }
    };

    for (let E_COEF = MIN_E_COEF; E_COEF <= MAX_E_COEF; E_COEF += 0.2) {
        E_COEF = round(E_COEF, 1);
        print('');
        out.setTable(options);
        out.table(['n', 'e', 'Algorithm', 'Time (ms)', 'result']);
        for (let n = MIN_N; n <= MAX_N; n += 10) {
            const e = E_COEF * n * (n - 1) / 2;
            const Costs = generateGraphs(n, e);
            let time;


            printGraph(Costs[0]);
            print('');

            const p = Prim(Costs[0]);
            out.green(`\n\tPrim's solution: ${p.T.stringify()}`);
            out.green(`Prim's cost: ${p.MinCost}`);

            const d = Dijkstra(Costs[0], 1);
            d.Dist.shift(); // Remove leading out of bounds sentinel
            d.From.shift(); // Remove leading out of bounds sentinel
            out.magenta(`Dijkstra's dist[]: ${d.Dist.stringify()}`);
            out.magenta(`Dijkstra's from[]: ${d.From.stringify()}`);


            // time = record_data(Prim, Costs);
            // out.table([n, E_COEF + 'E', `Prim's`, time, '']);
            // export_time += time + ', ';

            // time = record_data(Dijkstra, Costs);
            // out.table([n, E_COEF + 'E', `Dijkstra's`, time, '']);
            // export_time += time + ', ';
        }
    }
    print(export_time);
})();

function generateGraphs (n, e) {
    let array = [];
    while (array.length < PRECISION) {
        array.push(generateGraph(n, e));
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
