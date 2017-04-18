require('./utils.js');
MODE = DEG;

// From page 29 of Divide & Conquer lecture slides
function QuickSort (p, q)
{
    if (p < q) {
        let pivotposition = Partition (p, q);
        QuickSort (p, pivotposition -1);
        QuickSort (pivotposition+1, q);
    }
}

// From page 29 of Divide & Conquer lecture slides
function Partition (first, last, pp) // pp is a return value
{
    pivot = A[first]; tb = first + 1; ts = last;
    while (true) {
        while (tb <= last && A[tb] < pivot) { tb = tb+1; }
        while (ts > first &&A[ts] > pivot) { ts = ts-1; }
        if (tb<ts) swap(tb, ts, A); else break;
    }
    A[first] = A[ts]; A[ts] = pivot; return ts; //pivot position
}

// From Homework 2: #2b
function Partition1 (first, last) {
    pivot = A[first];
    vacant = first;
_print('STRT', first, last);
    for (unknown = first+1; unknown <= last; unknown++)
_print('CMPR', first, last, unknown);
        if (A[unknown] < pivot) {
_print('SWAP', first, last, unknown, vacant);
            A[vacant] = A[unknown];
            A[unknown] = A[vacant+1];
            vacant++;
        }
    A[vacant] = pivot;
_print('PIVT', first, last, vacant);
    return vacant; //pivot position
}

// function Partition1 (first, last, A) {
//     let pivot = A[first];
//     let vacant = first;

//     printOriginal(first, last, A);

//     for (let unknown = first + 1; unknown <= last; unknown++) {
//         printCompare(first, last, A, pivot, unknown);
//         if (A[unknown] < pivot) {
//             printPreSwaps(first, last, A, vacant, unknown);
//             A[vacant] = A[unknown];
//             A[unknown] = A[vacant + 1];
//             vacant++;
//             printPostSwaps(first, last, A);
//         }
//     }
//     A[vacant] = pivot;
//     printPivot(first, last, A, vacant);
//     return vacant; // pivot position
// }

function _print (type, first, last, u, v) {
    let o = '';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else {
            switch (type) {
                case 'STRT':
                    if (i == first) {
                        o += Chalk.blue(pad(A[i], MAX));
                        continue;
                    }
                case 'CMPR':
                    if (i == u) {
                        o += Chalk.green(pad(A[i], MAX));
                        continue;
                    }
                case 'SWAP':
                    if (i == v) {
                        o += Chalk.red(pad(A[i], MAX));
                        o += Chalk.yellow(pad(A[++i], MAX));
                        out.array(A, MAX);
                        continue;
                    } else if (i == u) {
                        o += Chalk.green(pad(A[i], MAX));

                        continue;
                    }


            }
        }
    }

}

function printOriginal (first, last, A) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Original, pivot = ${Chalk.blue(A[first])}`;
    out.default(o);
}

function printCompare(first, last, A, pivot, unknown) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == unknown) {
            o += Chalk.green(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Compare ${Chalk.blue(pivot)} & ${Chalk.green(A[unknown])}, unknown = ${unknown}`;
    out.default(o);
}

function printPreSwaps(first, last, A, vacant, unknown) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == vacant) {
            o += Chalk.red(pad(A[i], MAX));
        } else if (i == vacant + 1) {
            o += Chalk.yellow(pad(A[i], MAX));
        } else if (i == unknown) {
            o += Chalk.green(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Make appropriate swaps`;
    out.default(o);
}

function printPostSwaps (first, last, A) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `]`;
    out.default(o);
}

function printPivot(first, last, A, vacant) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == vacant) {
            o += Chalk.blue(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Returning ${Chalk.blue(A[vacant])} as our new pivot\n`;
    out.default(o);
}

// Initiate the quicksort function and print start and end array
function sort (A) {
    this.A = A;
    out.array(A, 4, Chalk.bgRed);
    QuickSort(0, A.length - 1, A);
    out.array(A, 4, Chalk.bgGreen);
}

const MAX = 4;
sort([5,6,1,3,7,2,8,4,9]);
// sort([40,20,10,80,60,50,7,30,100,90,70]);
