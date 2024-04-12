// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]
// For better understanding, please follow the numbers of the next array consecutively:

const array1 = [[1,2,3],
                [8,9,4],
                [7,6,5]]
// snail(array) #=> [1,2,3,4,5,6,7,8,9]

// [0, 0] => [0, 1] => [0, 2] => [1, 2] => [2, 2] => [2, 1] => [2, 0] => [1, 0] => [1, 1]

snail = function (array) {
  if (array[0].length === 0) {
    return [];
  }
  
  const copy = [...array];
  const directions = {
    0: [0, 1],
    1: [1, 0],
    2: [0, -1],
    3: [-1, 0],
  };

  let counter = 0;
  
  const steps = array.length * array.length;
  const result = []
  let x = 0;
  let y = 0;

  for (let i = 0; i < steps; i++) {
    result.push(copy[x][y]);
    copy[x][y] = "";
    
    if (
      x + directions[counter][0] > copy.length - 1 ||
      y + directions[counter][1] > copy.length - 1 ||
      x + directions[counter][0] < 0 ||
      y + directions[counter][1] < 0 ||
      copy[x + directions[counter][0]][y + directions[counter][1]] === ""
    ) {
      if (counter === 3) {
        counter = 0;
      } else {
        counter++;
      }
    }
    x = x + directions[counter][0];
    y = y + directions[counter][1];
  }

  return result;
};

console.log(snail(array1));

