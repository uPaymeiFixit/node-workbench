require('./utils.js');
MODE = DEG;

// From page 29 of Divide & Conquer lecture slides
function QuickSort (p, q)
{
    if (p < q) {
        let pivotposition = Partition2 (p, q);
        QuickSort (p, pivotposition -1);
        QuickSort (pivotposition+1, q);
    }
}

// From page 29 of Divide & Conquer lecture slides
function Partition (first, last, pp) // pp is a return value
{
    pivot = A[first]; tb = first + 1; ts = last;                    _print00(first, last); // Pivot =
    while (true) {
        while (tb <= last && A[tb] < pivot) {                       _print01(first, last); // Comparing
            tb = tb+1;
        }                                                           _print02(first, last); // Found big swap
        while (ts > first &&A[ts] > pivot) {                        _print03(first, last); // Comparing
            ts = ts-1;
        }                                                           _print04(first, last); // Found little swap
        if (tb<ts) swap(tb, ts, A); else break;                     _print05(first, last); // Swapped
    }                                                               _print06(first, last); // Returning pivot =
    A[first] = A[ts]; A[ts] = pivot; return ts; //pivot position
}

// From Homework 2: #2b
function Partition1 (first, last) {
    pivot = A[first];
    vacant = first;                                                 _print00(first, last); // Pivot =
    for (unknown = first+1; unknown <= last; unknown++) {           _print11(first, last); // Comparing
        if (A[unknown] < pivot) {                                   _print12(first, last); // Make appropriate swaps
            A[vacant] = A[unknown];
            A[unknown] = A[vacant+1];
            vacant++;                                               _print13(first, last); // []
        }
    }
    A[vacant] = pivot;                                              _print14(first, last); // Returning pivot =
    return vacant; //pivot position
}

// From Homework 2: #2d
function Partition2 (low, high)
{
    v = A[low];
    j = low;                                                        _print00(low, high); // Pivot =
    for (i = (low + 1); i <= high; i++) {                           _print21(low, high); // Comparing
        if (A[i] < v) {
            j++;                                                    _print22(low, high); // Swapping
            swap(i, j, A);
        }
    }                                                               _print23(low, high); // Swapping
    pivotposition = j;
    swap(low, pivotposition, A);                                    _print24(low, high); // Returning pivot =
    return j;
}

function _print00 (first, last) {
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
    o += `] // Pivot = ${Chalk.blue(A[first])}`;
    print(o);
}
function _print01 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else if (i == tb) {
            o += Chalk.green(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Comparing ${Chalk.blue(A[first])} & ${Chalk.green(A[tb])}, tb = ${tb}`;
    print(o);
}
function _print02 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else if (i == tb) {
            o += Chalk.red(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Found big swap = ${Chalk.red(A[first])}`;
    print(o);
}
function _print03 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == tb) {
            o += Chalk.red(pad(A[i], MAX));
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else if (i == ts) {
            o += Chalk.green(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Comparing ${Chalk.blue(A[first])} & ${Chalk.green(A[ts])}, ts = ${ts}`;
    print(o);
}
function _print04 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else if (i == ts || i == tb) {
            o += Chalk.red(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Found little swap = ${Chalk.red(A[ts])}`;
    print(o);
}
function _print05 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == first) {
            o += Chalk.blue(pad(A[i], MAX));
        } else if (i == ts || i == tb) {
            o += Chalk.red(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Swapped = ${Chalk.red(A[ts])} & ${Chalk.red(A[tb])}`;
    print(o);
}
function _print06 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == ts) {
            o += Chalk.blue(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Returning pivot = ${Chalk.blue(A[ts])}\n`;
    print(o);
}

function _print11 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == unknown) {
            o += Chalk.green(pad(A[i], MAX));
        }  else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Comparing ${Chalk.blue(pivot)} & ${Chalk.green(A[unknown])}, unknown = ${unknown}`;
    print(o);
}
function _print12 (first, last) {
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
    print(o);
}
function _print13 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `]`;
    print(o);
}
function _print14 (first, last) {
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
    o += `] // Returning pivot = ${Chalk.blue(A[vacant])}\n`;
    print(o);
}

function _print21 (first, last) {
    let o = '[';
    for (const k in A) {
        if (k < first || k > last) {
            o += pad(' ', MAX);
        } else if (k == first) {
            o += Chalk.blue(pad(A[k], MAX));
        } else if (k == i) {
            o += Chalk.green(pad(A[k], MAX));
        } else {
            o += pad(A[k], MAX);
        }
    }
    o += `] // Comparing ${Chalk.blue(A[first])} & ${Chalk.green(A[i])}, i = ${i}`;
    print(o);
}
function _print22 (first, last) {
    let o = '[';
    for (const k in A) {
        if (k < first || k > last) {
            o += pad(' ', MAX);
        } else if (k == i || k == j) {
            o += Chalk.red(pad(A[k], MAX));
        } else if (k == first) {
            o += Chalk.blue(pad(A[k], MAX));
        } else {
            o += pad(A[k], MAX);
        }
    }
    o += `] // Swapping ${Chalk.red(A[i])} & ${Chalk.red(A[j])}`;
    print(o);
}
function _print23 (first, last) {
    let o = '[';
    for (const k in A) {
        if (k < first || k > last) {
            o += pad(' ', MAX);
        } else if (k == first || k == j) {
            o += Chalk.red(pad(A[k], MAX));
        } else if (k == first) {
            o += Chalk.blue(pad(A[k], MAX));
        } else {
            o += pad(A[k], MAX);
        }
    }
    o += `] // Swapping ${Chalk.red(A[first])} & ${Chalk.red(A[j])}`;
    print(o);
}
function _print24 (first, last) {
    let o = '[';
    for (const i in A) {
        if (i < first || i > last) {
            o += pad(' ', MAX);
        } else if (i == j) {
            o += Chalk.blue(pad(A[i], MAX));
        } else {
            o += pad(A[i], MAX);
        }
    }
    o += `] // Returning pivot = ${Chalk.blue(A[j])}\n`;
    print(o);
}

// Initiate the quicksort function and print start and end array
function sort (A) {
    this.A = A;
    out.array(A, 4, Chalk.bgMagenta);
    print('');
    QuickSort(0, A.length - 1, A);
    out.array(A, 4, Chalk.bgGreen);
}

const MAX = 4;
sort([5,6,1,3,7,2,8,4,9]);
// sort([40,20,10,80,60,50,7,30,100,90,70]);
