require('./utils.js');
MODE = DEG;

// Parameters
const PRECISION = 1; // Number of times to run an algorithm to time it
const MIN_N = 16; // Starting power 2^n
const MAX_N = 16; // Stopping power 2^n
const RANDOM = false; // Test with random values?

/******************************************************************************/
/************************   START SORTING ALGORITHMS   ************************/
/******************************************************************************/

// From page 25 of Intro lecture slides
function InsertionSort (p, q) {
    for (let i = p; i <= q; i++) {
        let target = A[i];
        let j = i - 1;
        count++;
        while (j >= 0 && target < A[j]) {
            count++;
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = target;
    }
}

// My solution, theoretically faster but it's not working yet
// function MergeSort (low, high) {
//     if (low < high) {
//         const mid = floor((low + high) / 2);
//         MergeSort(low, mid);
//         MergeSort(mid + 1, high);
//         Merge(low, mid, high);
//     }
// }

// function Merge (low, mid, high) {
//     out.red(low + ', ' + mid + ', ' + high);
//     let i = low;
//     let j = mid;
//     let k = low;
//     const U = [];
//     while (i <= mid && j <= high) {
//         if (A[i] < A[j]) {
//             U[k] = A[i];
//             i++;
//         } else {
//             U[k] = A[j];
//             j++;
//         }
//         k++;
//     }
//     for (; j <= high; j++, k++) {
//         U[k] = A[j];
//     }
//     for (; i <= mid; i++, k++) {
//         U[k] = A[i];
//     }
//     out.yellow(U);
//     for (let p = 0; p < U.length; p++) {
//         A[p + low] = U[p];
//     }
//     out.green(A);
// }

// From page 20 of Divide & Conquer lecture slides
function MergeSort () {
    A = _MergeSort(A);
}

function _MergeSort(array) {
    count++;
    if (array.length < 2) return array;

    const middle = array.length / 2;
    const L = array.slice(0, middle);
    const R = array.slice(middle, array.length);

    return Merge(_MergeSort(L), _MergeSort(R));
}

function Merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());

    return result;
}

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
            A.swap(p, p + Random() % (q - p + 1));
        }
        let pivotposition = Partition (p, q);
        QuickSort3 (p, pivotposition - 1);
        QuickSort3 (pivotposition + 1, q);
    }
}

function Partition (first, last) {
// ##################################################################################################################################################################################################################################################################
    const pivot = A[first];
    let tb = first + 1;
    let ts = last;
    while (true) {
        while (tb <= last && A[tb] <= pivot) tb++;
        while (ts > first && A[ts] > pivot) ts--;
        if (tb < ts) A.swap(tb, ts);
        else break;
    }
    A[first] = A[ts];
    A[ts] = pivot;
    return ts; // pivot position
}

/******************************************************************************/
/*************************   END SORTING ALGORITHMS   *************************/
/******************************************************************************/

/******************************************************************************/
/***************************   START TESTING TOOLS   **************************/
/******************************************************************************/

let count = 0;
let A;

// Main testing function
(() => {
    let export_runs = RANDOM ? 'Random (count)\n' : 'Sorted (count)\n';
    let export_time = RANDOM ? 'Random (time)\n' : 'Sorted (time)\n';

    let options = {
        columnDefault: {width: 12},
        columnCount: 5,
        boldHeader: true,
        border: Table.getBorderCharacters('norc'),
        columns: {
            0: {patch: Chalk.yellow, width: 4, alignment: 'left'},
            1: {patch: Chalk.cyan},
            2: {patch: Chalk.red, alignment: 'right'},
            3: {patch: Chalk.magenta, alignment: 'right'},
            4: {patch: Chalk.green, width: 131}
        }
    };
    out.setTable(options);
    out.table(['n', 'Name', 'Time (ms)', 'Count', 'Array']);

    for (let i = MIN_N; i <= MAX_N; i++) {
        const n = pow(2, i);
        const array = generateArrays(n);
        let res;

        print('');
        out.setTable(options);

        // Original
        A = array[PRECISION - 1];
        out.table([`2^${i}`, 'Original', 'N/A', 'N/A', A.stringify(3, 131)]);

        // Insertion
        res = record_data(InsertionSort, array);
        out.table(['', 'Insertion', res.time, res.count, A.stringify(3, 131)]);
        export_runs += res.count + ', '; export_time += res.time + ', ';

        // Merge
        res = record_data(MergeSort, array);
        out.table(['',     'Merge', res.time, res.count, A.stringify(3, 131)]);
        export_runs += res.count + ', '; export_time += res.time + ', ';

        // Quick1
        res = record_data(QuickSort1, array);
        out.table(['',   'Quick 1', res.time, res.count, A.stringify(3, 131)]);
        export_runs += res.count + ', '; export_time += res.time + ', ';

        // Quick 2
        res = record_data(QuickSort2, array);
        out.table(['',   'Quick 2', res.time, res.count, A.stringify(3, 131)]);
        export_runs += res.count + ', '; export_time += res.time + ', ';

        // Quick 3
        res = record_data(QuickSort3, array);
        out.table(['',   'Quick 3', res.time, res.count, A.stringify(3, 131)]);
        export_runs += res.count + '\n'; export_time += res.time + '\n';
    }
    print('\n' + export_runs + '\n' + export_time);
})();

// Make PRECISION arrays of size length, random or sequential
function generateArrays (length) {
    let array = [];
    while (array.length < PRECISION) {
        if (RANDOM) array.push(randomIntArray(length, 0, 999));
        else array.push(sequentialIntArray(length));
    }
    return array;
}

function record_data (f, array) {
    const B = array.clone();
    const n = B[0].length - 1;
    let counts = [];
    const start = microseconds();
    for (let i = 0; i < PRECISION; i++) {
        count = 0;
        A = B[i];
        f(0, n);
        counts.push(count);
    }
    const stop = microseconds();
    const time = round((stop - start) / PRECISION, 3);
    return {time: time, count: counts.median()};
}
