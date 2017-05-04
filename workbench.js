require('./utils.js');
MODE = DEG;

// Parameters
const PRECISION = 1; // Number of times to run an algorithm to time it
const MIN_N = 1; // Starting power 2^n
const MAX_N = 8; // Stopping power 2^n
const RANDOM = true; // Test with random values?

/******************************************************************************/
/************************   START SORTING ALGORITHMS   ************************/
/******************************************************************************/

// From page 25 of Intro lecture slides
function InsertionSort (p, q) {
    for (let i = p; i < q; i++) {
        let target = A[i];
        let j = i - 1;
        while (++count && j >= 0 && target < A[j]) {
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = target;
    }
}

// From page 20 of Divide & Conquer lecture slides
// function MergeSort (low, high) {
//     if (low < high) {
//         const mid = Math.floor((low + high) / 2);
//         MergeSort(low, mid);
//         MergeSort(mid + 1, high);
//         Merge(low, mid, high);
//     }
// }

// function Merge (low, mid, high) {
//     let i = low;
//     let j = mid + 1;
//     let k = low;
//     while (i <= mid && j <= high) {
//         if (A[i] <= A[j]) {
//             U[k] = A[i];
//         }
//     }
// }


function MergeSort () {
    count++;
    if (A.length < 2) {
        return A;
    }

    let middle = parseInt(A.length / 2);
    let left   = A.slice(0, middle);
    let right  = A.slice(middle, A.length);

    A = Merge(MergeSort(left), MergeSort(right));
}

function Merge (L, R) {
    let A = [];
    let l = 0;
    let r = 0;
    while (l < L.length && r < R.length) {
        A.push(L[l] < R[r] ? L[l++] : R[r++]);
    }
    while (l < L.length) A.push(L[l++]);
    while (r < R.length) A.push(R[r++]);
    return A;
}

// // From page 22 of Divide & Conquer lecture slides
// function Merge (L, R) {
//     let result = [];

//     while (L.length && R.length) {
//         if (L[0] <= R[0]) {
//             result.push(L.shift());
//         } else {
//             result.push(R.shift());
//         }
//     }

//     while (L.length) {
//         result.push(L.shift());
//     }

//     while (R.length) {
//         result.push(R.shift());
//     }

//     return result;
// }



// From page 29 of Divide & Conquer lecture slides
function QuickSort1 (p, q) {
    count++;
    if (p < q) {
        let pivotposition = Partition (p, q);
        QuickSort1 (p, pivotposition - 1);
        QuickSort1 (pivotposition + 1, q);
    }
}

function QuickSort2 (p, q) {
    count++;
    if (q - p <= 16) {
        InsertionSort(p, q);
    } else if (p < q) {
        let pivotposition = Partition (p, q);
        QuickSort2 (p, pivotposition - 1);
        QuickSort2 (pivotposition + 1, q);
    }
}

function QuickSort3 (p, q) {
    count++;
    if (p < q) {
        if (q - p + 1 >= 16) {
            swap(p, p + Random() % (q - p + 1), A);
        }
        let pivotposition = Partition (p, q);
        QuickSort3 (p, pivotposition - 1);
        QuickSort3 (pivotposition + 1, q);
    }
}


function Partition (first, last) {
    const pivot = A[first];
    let tb = first + 1;
    let ts = last;
    while (true) {
        while (tb <= last && A[tb] <= pivot) tb++;
        while (ts > first && A[ts] > pivot) ts--;
        if (tb < ts) swap(tb, ts, A);
        else break;
    }
    A[first] = A[ts];
    A[ts] = pivot;
    return ts; // pivot position
}

// function Partition (AA) {
//     const pivot = AA[0];
//     let tb = 1;
//     let ts = AA.length - 1;
//     while (true) {
//         while (tb < AA.length && AA[tb] < pivot) {
//             tb++;
//         }
//         while (ts > 0 && AA[ts] > pivot) {
//             ts--;
//         }
//         if (tb < ts) {
//             swap(tb, ts, AA);
//         } else {
//             break;
//         }
//     }
//     AA[0] = AA[ts];
//     AA[ts] = pivot;
//     return [ts, AA]; //pivot position
// }

/******************************************************************************/
/*************************   END SORTING ALGORITHMS   *************************/
/******************************************************************************/

/******************************************************************************/
/***************************   START TESTING TOOLS   **************************/
/******************************************************************************/

let count = 0;
let B;
let A;
out.setTable({
    columnDefault: {width: 10},
    columnCount: 5,
    boldHeader: true,
    columns: {
        0: {patch: Chalk.yellow, width: 5, alignment: 'right'},
        1: {patch: Chalk.cyan},
        2: {patch: Chalk.red, alignment: 'right'},
        3: {patch: Chalk.magenta, alignment: 'right'},
        4: {patch: Chalk.green, width: 131}
    }
});

// Main testing function
(() => {

    let export_runs = RANDOM ? 'Random (count)\n' : 'Sorted (count)\n';
    let export_time = RANDOM ? 'Random (time)\n' : 'Sorted (time)\n';

    out.table(['n', 'Name', 'Time (ms)', 'Count', 'Array']);
    for (let i = MIN_N; i <= MAX_N; i++) {
        const n = Math.pow(2, i);
        let array = makeArray(n);

        let time = '';
        // Original
        A = array[PRECISION - 1];
        out.table([`2^${i}`, 'Original', 'N/A', 'N/A', StringifyArray(A, 4, 32)]);



        // // Insertion
        // B = array.slice();
        // time = record_time(InsertionSort, 0, n - 1);
        // row('', 'Insertion', time, count, A);
        // export_runs += count;
        // export_time += time;

        // // Merge
        // B = array.slice();
        // time = record_time(MergeSort, A);
        // row('', 'Merge', time, count, A);
        // export_runs += ', ' + count;
        // export_time += ', ' + time;

        // Quick1
        B = array.slice();
        time = record_time(QuickSort1, 0, n - 1);
        out.table(['', 'Quick 1', time, count, StringifyArray(A, 4, 32)]);
        export_runs += ', ' + count;
        export_time += ', ' + time;

        // // Quick2
        // B = array;
        // time = record_time(QuickSort2, 0, n - 1);
        // row('', 'Quick 2', time, count, A);
        // export_runs += ', ' + count;
        // export_time += ', ' + time;

        // // Quick 3
        // B = array;
        // time = record_time(QuickSort3, 0, n - 1);
        // row('', 'Quick 3', time, count, A);
        // export_runs += ', ' + count + '\n';
        // export_time += ', ' + time + '\n';

    }
    console.log(export_runs + '\n' + export_time);
})//();

// Make PRECISION arrays of size length, random or sequential
function generateArrays (length) {
    let array = [];
    while (array.length < PRECISION) {
        if (RANDOM) array.push(randomIntArray(length, 0, 999));
        else array.push(sequentialIntArray(length));
    }
    return array;
}

// Calculate the average time it takes to run f with parameters p1, p2
function record_time (f, p1, p2) {
    count = 0;
    const start = milliseconds();
    for (let i = 0; i < PRECISION; i++) {
        // A = f(B[i]);
        A = B[i];
        f(0, A.length - 1);
    }
    const end = milliseconds();
    count /= PRECISION;
    return (end - start) / PRECISION;
}
