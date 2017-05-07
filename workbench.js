require('./utils.js');
MODE = DEG;

// let V = [1,2,3,4,5];
// let E = [[1,2],[1,3],[2,3],[2,4],[3,4],[3,5],[4,5]];
let V = [1,2,3,4,5,6];
let E = [[1,2],[2,3],[3,6],[4,5],[5,6],[1,4]];

// out.green(COVER(V, E));

function COVER (V, E) {
    U = []; // U = Ø;
    while (E.length) { // loop
        let v = max_degree_vertex(V, E); // let v in V be a vertex of maximum degree;
        U.push(v); // U = U ∪ {v};
        V.remove(v); // V = V − {v};
        remove_related(E, v); // E = E − {(u,w) such that u=v or w=v}
    }
    return U;
}

// Remove any edges from E that contain v
function remove_related (E, v) {
    for (let e = 0; e < E.length; e++)
        if (E[e][0] == v || E[e][1] == v) E.splice(e--, 1);
}

// Return the vertex with the largest degree (most connected edges)
function max_degree_vertex (V, E) {
    let D = [];
    for (let v = 0; v < V.length; v++) {
        D[v] = 0;
        for (let e = 0; e < E.length; e++)
            if (V[v] == E[e][0] || V[v] == E[e][1]) D[v]++;
    }
    return V[max(D)];
}

// Return index of the largest element in A
function max (A) {
    let r = 0;
    for (let i = 1; i < A.length; i++)
        if (A[i] > A[r]) r = i;
    return r;
}


///////////////////////// PROBLEM 3 /////////////////////////

// C = [   1,    2,    3,    4];
// P = [0.10, 0.20, 0.30, 0.40];

// let X = [
//     {C: 1, P: 0.10},
//     {C: 2, P: 0.20},
//     {C: 3, P: 0.30},
//     {C: 4, P: 0.40},
//     {C: 5, P: 0.50},
//     {C: 6, P: 0.60},
// ];


for (let x = 0; x < 10; x++) {
    let X = [];

    for (let i = 0; i < 2; i++) {
        X.push({C: randInt(1, 10), P: randInt(1, 10) / 10});
    }

    // Descending density
    X.sort((a,b)=>{return b.P/b.C - a.P/a.C});
    let desc = total_cost(X);

    // Descending probability
    X.sort((a,b)=>{return b.P - a.P});
    let best = total_cost(X);

    if (desc < best) {
        out.default('Best: ' + best);
        out.default('Desc: ' + desc);
        printX(X);
    }
}

function printX (X) {
    let P = '';
    let C = '';
    let D = '';
    for (const x of X) {
        P += leftPad(x.P, 5);
        C += leftPad(x.C, 5);
        D += leftPad(x.P/x.C, 5);
    }
    out.green(P);
    out.cyan(C);
    out.magenta(D);
}

function total_cost (X) {
    let p = 0;
    for (let j = 0; j < X.length; j++) {
        let c = 0;
        for (let i = 0; i <= j; i++) {
            c += X[i].C;
        }
        p += X[j].P * c;
    }
    return p;
}
