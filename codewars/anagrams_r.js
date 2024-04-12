// What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:

// 'abba' & 'baab' == true

// 'abba' & 'bbaa' == true

// 'abba' & 'abbba' == false

// 'abba' & 'abca' == false
// Write a function that will find all the anagrams of a word from a list. 
// You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:

// anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

// anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

// anagrams('laser', ['lazing', 'lazy',  'lacer']) => []

// #1 - empty array? -> return []
// #2 - making a copy of the array and filter based on if the sorted versions are the same 
// #2.5 - helper function for splitting the string, sorting all the chars and joining

function anagrams(word, words) {
    if (words.length === 0) return []

    const copy = [...words]
    return copy.filter(w => getSorted(w) === getSorted(word));
}

const getSorted = (string) => string.split("").sort().join("")

console.log(anagrams("abba", ["aabb", "abcd", "bbaa", "dada"]));
console.log(anagrams("racer", ["crazer", "carer", "racar", "caers", "racer"]));
console.log(anagrams("laser", ["lazing", "lazy", "lacer"]));