// Input
// a string strng of n positive numbers (n = 0 or n >= 2)
// Let us call weight of a number the sum of its digits. For example 99 will have "weight" 18, 100 will have "weight" 1.

// Two numbers are "close" if the difference of their weights is small.

// Task:
// For each number in strng calculate its "weight" and then find two numbers of strng that have:

// the smallest difference of weights ie that are the closest
// with the smallest weights
// and with the smallest indices (or ranks, numbered from 0) in strng
// Output:
// an array of two arrays, each subarray in the following format:
// [number-weight, index in strng of the corresponding number, original corresponding number in strng]

// or a pair of two subarrays (Haskell, Clojure, FSharp) or an array of tuples (Elixir, C++)

// or a (char*) in C or a string in some other languages mimicking an array of two subarrays or a string

// or a matrix in R (2 rows, 3 columns, no columns names)

// The two subarrays are sorted in ascending order by their number weights if these weights are different, by their indexes in the string if they have the same weights.

// Examples:

// strng = "103 123 4444 99 2000"
// the weights are 4, 6, 16, 18, 2 (ie 2, 4, 6, 16, 18)

// closest should return [[2, 4, 2000], [4, 0, 103]] (or ([2, 4, 2000], [4, 0, 103])
// or [{2, 4, 2000}, {4, 0, 103}] or ... depending on the language)
// because 2000 and 103 have for weight 2 and 4, their indexes in strng are 4 and 0.
// The smallest difference is 2.
// 4 (for 103) and 6 (for 123) have a difference of 2 too but they are not 
// the smallest ones with a difference of 2 between their weights.
// ....................

// strng = "80 71 62 53"
// All the weights are 8.
// closest should return [[8, 0, 80], [8, 1, 71]]
// 71 and 62 have also:
// - the smallest weights (which is 8 for all)
// - the smallest difference of weights (which is 0 for all pairs)
// - but not the smallest indices in strng.

// STEP 1 - extract the numbers to an array of integers
// STEP 2 - create a hashtable -> { sum: [index].sort((a, b) => a.localCompare(b)) }
// STEP 3 - nested for loop -> smallestDiff variable, a, b
// STEP 4 - [[], []] 



function closest(strng) {
    if (strng === "") return []
  const numbers = extractNumbers(strng, " ");
  const sumTable = {}; 
    
  for (let i = 0; i < numbers.length; i++) {
    const digits = extractNumbers(String(numbers[i]), "");
    const sum = digits.reduce((acc, cv) => acc + cv);
    if (sumTable[sum]) {
        sumTable[sum].push(i);
    } else {
    sumTable[sum] = [i];
    }
  }

  for (let [key, value] of Object.entries(sumTable)) {
    if (value.length > 1) {
      return [
        [Number(key), value[0], numbers[value[0]]],
        [Number(key), value[1], numbers[value[1]]],
      ];
    }
  }

  const keys = Object.keys(sumTable).map(e => Number(e));
    let smallestDistance = Math.abs(keys[0]-keys[1]);
    let a = keys[0]
    let b = keys[1]

  for (let i = 0; i < keys.length-1; i++) {
    for (let j = i+1; j < keys.length; j++) {
        if (Math.abs(keys[i] - keys[j]) < smallestDistance){
            smallestDistance = Math.abs(keys[i] - keys[j]);
            a = keys[i]
            b = keys[j]
        }
    }
  }

    return [
      [a, sumTable[a][0], numbers[sumTable[a][0]]],
      [b, sumTable[b][0], numbers[sumTable[b][0]]]
    ];
}

const extractNumbers = (string, splitter) => string.split(splitter).filter(e => e !== "").map(e => Number(e));

console.log(closest("103 123 4444 99 2000"))
console.log(closest("239382 162 254765 182 485944 134 468751 62 49780 108 54"));
