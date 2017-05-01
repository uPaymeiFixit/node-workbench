require('./utils.js');
MODE = DEG;

/******************************************************************************/
/************************   START SORTING ALGORITHMS   ************************/
/******************************************************************************/

// From page 25 of Intro lecture slides
function InsertionSort () {
    for (const i in A) {
        let target = A[i];
        let j = i - 1;
        while (j >= 0 && target < A[j]) {
            count++;
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = target;
    }
    return A;
}

// From page 20 of Divide & Conquer lecture slides
function MergeSort (a) {
    count++;
    if (a.length < 2) {
        return a;
    }

    let middle = parseInt(a.length / 2);
    let left   = a.slice(0, middle);
    let right  = a.slice(middle, a.length);

    A = Merge(MergeSort(left), MergeSort(right));
    return A;
}

// From page 22 of Divide & Conquer lecture slides
function Merge (left, right) {
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
        InsertionSort();
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

/******************************************************************************/
/*************************   END SORTING ALGORITHMS   *************************/
/******************************************************************************/

/******************************************************************************/
/***************************   START TESTING TOOLS   **************************/
/******************************************************************************/

// Parameters
const PRECISION = 10; // Number of times to run an algorithm to time it
const MIN_N = 1; // Starting power 2^n
const MAX_N = 16; // Stopping power 2^n
const RANDOM = true; // Test with random values?
let count = 0;

// Main testing function
(() => {
    row('n', 'Name', 'Time (ms)', 'Runs', 'Array', 'HEAD');
    for (let i = MIN_N; i <= MAX_N; i++) {
        const n = Math.pow(2, i);
        const array = makeArray(n);

        A = array.slice();
        count = 0;
        row('2^' + i, 'Original', 'N/A', 'N/A', A);
        A = array.slice();
        count = 0;
        row('', 'Insertion', time(InsertionSort), count, A);
        A = array.slice();
        count = 0;
        row('', 'Merge', time(MergeSort, A), count, A);
        A = array.slice();
        count = 0;
        row('', 'Quick 1', time(QuickSort1, 0, n - 1), count, A);
        A = array.slice();
        count = 0;
        row('', 'Quick 2', time(QuickSort2, 0, n - 1), count, A);
        A = array.slice();
        count = 0;
        row('', 'Quick 3', time(QuickSort3, 0, n - 1), count, A);
        if (i < MAX_N) {
            row(null, null, null, null, null, 'BREAK');
        }
    }
    row(null, null, null, null, null, 'TAIL');
})();

// Make an array of size n, random or sequential
function makeArray (n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        array[i] = RANDOM ? Random(0, 999) : i;
    }
    return array;
}

// Calculate the average time it takes to run f with parameters p1, p2
function time (f, p1, p2) {
    const start = milliseconds();
    for (let i = 0; i < PRECISION; i++) {
        f(p1, p2);
    }
    const end = milliseconds();
    return (end - start) / PRECISION;
}

// Print table rows (handle colors)
function row (n, name, time, count, array, position) {
    if (position == 'HEAD') {
        out.white('┌' + leftPad('┬', 7, '─') + leftPad('┬', 12, '─') + leftPad('┬', 12, '─') + leftPad('┬', 12, '─') + leftPad('┐', 133, '─'));
        n = Chalk.bold(Chalk.white(leftPad(n, 4)));
        name = Chalk.bold(Chalk.white(leftPad(name, 9)));
        time = Chalk.bold(Chalk.white(leftPad(time, 9)));
        count = Chalk.bold(Chalk.white(leftPad(count, 9)));
        array = Chalk.bold(Chalk.white(rightPad(array, 130)));
        out.white(`│ ${n} │ ${name} │ ${time} │ ${count} │ ${array} │`);
        row(null, null, null, null, null, 'BREAK');
    } else if (position == 'BREAK') {
        out.white('├' + leftPad('┼', 7, '─') + leftPad('┼', 12, '─') + leftPad('┼', 12, '─') + leftPad('┼', 12, '─') + leftPad('┤', 133, '─'));
    } else if (position == 'TAIL') {
        out.white('└' + leftPad('┴', 7, '─') + leftPad('┴', 12, '─') + leftPad('┴', 12, '─') + leftPad('┴', 12, '─') + leftPad('┘', 133, '─'));
    } else {
        name = Chalk.cyan(leftPad(name, 9));
        time = Chalk.red(leftPad(time, 9));
        count = Chalk.magenta(leftPad(count, 9));
        array = Chalk.green(rightPad(StringifyArray(array, 4, 32), 130));
        if (n != '') {
            name = Chalk.bold(name);
            time = Chalk.bold(time);
            count = Chalk.bold(count);
            array = Chalk.bold(array);
        }
        n = Chalk.bold(Chalk.yellow(leftPad(n   , 4)));
        out.white(`│ ${n} │ ${name} │ ${time} │ ${count} │ ${array} │`);
    }
}
