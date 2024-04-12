// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.

// Notes:

// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered.
// Examples
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

function scramble(str1, str2) {
  const wordSplitted = str2.split("");
  const string = createHashTable(str1.split(""));

  for (let i = 0; i < wordSplitted.length; i++) {
    if (!string[wordSplitted[i]] || string[wordSplitted[i]] <= 0) {
      return false;
    }
    string[wordSplitted[i]]--;
  }
  return true;
}

function createHashTable(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]]) {
      obj[arr[i]]++;
    } else {
      obj[arr[i]] = 1;
    }
  }
  return obj;
}