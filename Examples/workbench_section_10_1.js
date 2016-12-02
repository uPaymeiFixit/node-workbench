require('./utils.js');
MODE = DEG;

// Future random values will be based on seed, so we need
// it to not reset after we exit scope `generic_random`
// Usually we set this with something like srand(time(1));
let seed;

// Usually j = 2^31-1, A Mersenne prime close to maxint?
// Usually k = 7^5. I don't know why.
function generic_random(j, k) {
    seed = (k * seed) % j;
    return seed / j;
}

// This is a bad generator, but it's a basis for how they are created.
// One of this one's flaws is that any for any seed ≤ 12777, r < 1/10
// (To see an explanation of this, see CS 301: 10.1.2)
// Based off of page 483
function book_random(seed_f, n) {
    seed = seed_f;
    let k = 16807; // 7^5
    let j = 2147483647; // 2^31-1
    let r = [n];
    for (let i = 0; i < n; i++) {
        r[i] = generic_random(j, k);
    }
    return r;
}

// Given j, k, and a random generated r, possible seeds produced
// Note, the possible seeds produced are the specific seed (seed_n)
// used to generate the r_n. (The nth random value) Therefore it
// will usually only be equal to seed_0 (the seed you set) for
// r_0 (the first generated random value).
// j(x + n), for n ∈ ℕ
function crack_seed(j, k, r, n) {
    let s = [n];
    for (let i = 0; i < n; i++) {
        s[i] = j * (r + i) / k;
    }
    return s;
}

// Playground to show how this works
function example_crack() {
    // Play around with the following variables to see what happens
    seed = 123456;
    let j = pow(2, 31) - 1; // 2^31-1 = 2147483647
    let k = pow(7, 5); // Note: if k = 1, generated values will not change
    let n = 3;
    let r = [n];
    r[0] = generic_random(j, k);
    r[1] = generic_random(j, k);
    r[2] = generic_random(j, k);

    out.yellow(`Random values`);
    out.red(r);
    // 0.9662122432916482,0.12917300273160123,0.01065691002209527

    let s = crack_seed(j, k, r[0], n);
    out.yellow(`First ${n} possible seeds`);
    out.green(s + `, ...`);
    // 123456,251229.1687392158,379002.3374784316, ...
}
example_crack();
