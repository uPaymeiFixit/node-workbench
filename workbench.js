require('./utils.js');
MODE = DEG;

// From page 25 of Intro lecture slides
function InsertionSort () {
    for (const i in A) {
        let target = A[i];
        let j = i - 1;
        while (j >= 0 && target < A[j]) {
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = target;
    }
    return A;
}

// From page 20 of Divide & Conquer lecture slides
function MergeSort (a) {
    if (a.length < 2) {
        return a;
    }

    let middle = parseInt(a.length / 2);
    let left   = a.slice(0, middle);
    let right  = a.slice(middle, a.length);

    return Merge(MergeSort(left), MergeSort(right));
}

// From page 22 of Divide & Conquer lecture slides
function Merge(left, right) {
    let result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

// From page 29 of Divide & Conquer lecture slides
function QuickSort1 (p, q) {
    if (p < q) {
        let pivotposition = Partition (p, q);
        QuickSort1 (p, pivotposition - 1);
        QuickSort1 (pivotposition + 1, q);
    }
}

function QuickSort2 (p, q) {
    if (q - p <= 16) {
        InsertionSort();
    } else if (p < q) {
        let pivotposition = Partition (p, q);
        QuickSort2 (p, pivotposition - 1);
        QuickSort2 (pivotposition + 1, q);
    }
}

function QuickSort3 (p, q) {
    if (p < q) {
        if (q - p + 1 >= 16) {
            swap(p, p + Random() % (q - p + 1), A);
        }
        let pivotposition = Partition (p, q);
        QuickSort3 (p, pivotposition - 1);
        QuickSort3 (pivotposition + 1, q);
    }
}


// From page 29 of Divide & Conquer lecture slides
function Partition (first, last) {
    let pivot = A[first];
    let tb = first + 1;
    let ts = last;
    while (true) {
        while (tb <= last && A[tb] < pivot) {
            tb++;
        }
        while (ts > first && A[ts] > pivot) {
            ts--;
        }
        if (tb < ts) {
            swap(tb, ts, A);
        } else {
            break;
        }
    }
    A[first] = A[ts];
    A[ts] = pivot;
    return ts; //pivot position
}

function makeArray (n) {
    A = [];
    U = [];
    for (let i = 0; i < n; i++) {
        A[i] = i;
        U[i] = -1;
    }
}

function test () {
    out.green(' ———————————————————————————————————————————————————');
    out.green('|    n | Insert | Merge  | Quick1 | Quick2 | Quick3 |');
    out.green(' ———————————————————————————————————————————————————')
    for (let i = 1; i <= 16; i++) {
        let n = Math.pow(2, i);
        makeArray(n);

        let insert = ''//time(InsertionSort);
        let merges = ''//time(MergeSort, A);
        let quick1 = ''//time(QuickSort1, 0, n - 1);
        let quick2 = ''//time(QuickSort2, 0, n - 1);
        let quick3 = time(QuickSort3, 0, n - 1);

        let row = '|' + pad('2^' + i, 5) + ' |';
        row += pad(insert, 7) + ' |';
        row += pad(merges, 7) + ' |';
        row += pad(quick1, 7) + ' |';
        row += pad(quick2, 7) + ' |';
        row += pad(quick3, 7) + ' |';
        out.green(row);
    }
    out.green(' ———————————————————————————————————————————————————')
}

function time (f, p1, p2) {
    let start = milliseconds();
    for (let i = 0; i < 10000; i++) {
        f(p1, p2);
    }
    let end = milliseconds();
    return (end - start) / 10000;
}

test();

/*
     ————————————————————————————————————————————————————
    |    n | Insert | Merge  | Quick1 | Quick2  | Quick3 |
     ————————————————————————————————————————————————————
    |  2^1 | 0.0029 | 0.0009 | 0.0003 | 0.00330 | 0.0006 |
    |  2^2 | 0.0024 | 0.0030 | 0.0017 | 0.00371 | 0.0019 |
    |  2^3 | 0.0023 | 0.0052 | 0.0010 | 0.00212 | 0.0009 |
    |  2^4 | 0.0019 | 0.0101 | 0.0021 | 0.00228 | 0.0033 |
    |  2^5 | 0.0053 | 0.0212 | 0.0069 | 0.09232 | 0.0043 |
    |  2^6 | 0.0108 | 0.0448 | 0.0225 | 0.53213 | 0.0091 |
    |  2^7 | 0.0221 | 0.1024 | 0.0834 | 1.94635 | 0.0200 |
    |  2^8 | 0.0373 | 0.2800 | 0.3443 | 10.5519 | 0.0432 |
    |  2^9 | 0.0606 | 0.5697 | 1.2248 | 34.0345 | 0.0902 |
    | 2^10 | 0.1675 | 1.2813 | 5.0680 | 151.345 | 0.1981 |
    | 2^11 | 0.3847 | 2.9232 | 23.348 | 700.958 | 0.3884 |
    | 2^12 | 0.5859 | 6.6639 | 100.11 | 2179.58 | 0.8247 |
    | 2^13 | 1.2566 | 14.023 | 536.45 | 11015.2 | 1.8045 |
    | 2^14 | 2.6781 | 27.187 | 1858.0 | 43738.8 | 4.4902 |
    | 2^15 | 15.731 | 70.002 | 6454.2 | 484408. | 25.563 |
    | 2^16 | 27.023 | 159.25 | 27964. | 1730499 | 49.837 |
     ————————————————————————————————————————————————————
*/
