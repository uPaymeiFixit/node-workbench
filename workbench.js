require('./utils.js');
MODE = DEG;

// let V = [1,2,3,4,5];
// let E = [[1,2],[1,3],[2,3],[2,4],[3,4],[3,5],[4,5]];
let V = [1,2,3,4,5,6,7];
let E = [[1,4],[1,2],[2,5],[2,3],[3,5],[6,5],[6,3],[3,7]];

COVER_ALL(V, E, []);

function COVER_ALL (V, E, U) {
    if (!E.length) {
        out.green(U);
        return;
    }
    const v = max_degree_vertex_all(V, E);
    for (let i = 0; i < v.length; i++) {
        const VV = V.clone();
        const EE = E.clone();
        const UU = U.clone();
        UU.push(v[i]);
        VV.remove(v[i]);
        remove_related(EE, v[i]);
        COVER_ALL(VV, EE, UU);
    }
}

// Return the vertex with the largest degree (most connected edges)
function max_degree_vertex_all (V, E) {
    let D = [];
    for (let v = 0; v < V.length; v++) {
        D[v] = 0;
        for (let e = 0; e < E.length; e++) {
            if (V[v] == E[e][0] || V[v] == E[e][1]) {
                D[v]++;
            }
        }
    }
    let R = [];
    let M = max_all(D);
    for (let i = 0; i < M.length; i++) {
        R.push(V[M[i]]);
    }
    return R;
}

// Return index of the largest elements in A
function max_all (A) {
    let r = 0;
    for (let i = 1; i < A.length; i++) {
        if (A[i] > A[r]) {
            r = i;
        }
    }
    let R = [];
    for (let i = 0; i < A.length; i++) {
        if (A[i] == A[r]) {
            R.push(i);
        }
    }
    return R;
}












print(COVER(V, E));

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
        for (let e = 0; e < E.length; e++) {
            if (V[v] == E[e][0] || V[v] == E[e][1]) {
                D[v]++;
            }
        }
    }
    return V[max(D)];
}

// Return index of the largest elements in A
function max (A) {
    let r = 0;
    for (let i = 1; i < A.length; i++) {
        if (A[i] > A[r]) {
            r = i;
        }
    }
    return r;
}




///////////////////////// PROBLEM 2 /////////////////////////

// JavaScript
function make_change (A, C) {
    let S = [];
    let i = 0;
    while (C != S.sum()) { // While the problem not solved
        if (A[i] + S.sum() > C) {
            i++; // Reject coin
        } else {
            S.push(A[i]); // Add the coin to the change
        }
    }
    return S;
}

// print(make_change([25, 10, 5, 1], 36)); // Returns 25,10,1

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

function test3 () {
    while (true) {
        let X = [];

        for (let i = 0; i < 2; i++) {
            X.push({C: randInt(1, 10), P: randInt(1, 10) / 10});
        }

        // Descending density
        X.sort((a,b)=>{return b.P/b.C - a.P/a.C});
        let best = total_cost(X);

        // Descending probability
        X.sort((a,b)=>{return b.P - a.P});
        let desc = total_cost(X);

        if (desc < best) {
            out.default('Best: ' + best);
            out.default('Desc: ' + desc);
            printX(X);
        }
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
