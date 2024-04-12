// Your granny, who lives in town X0, has friends. These friends are given in an array, for example: array of friends is ["A1", "A2", "A3", "A4", "A5"].

// The order of friends in this array must not be changed since this order gives the order in which they will be visited.

// Friends inhabit towns and you get an array with friends and their towns (or an associative array), for example: [["A1", "X1"], ["A2", "X2"], ["A3", "X3"], ["A4", "X4"]] 
// which means A1 is in town X1, A2 in town X2... It can happen that we do not know the town of one of the friends hence it will not be visited.

// Your granny wants to visit her friends and to know approximately how many miles she will have to travel. You will make the circuit that permits her to visit her friends. 
// For example here the circuit will be:X0, X1, X2, X3, X4, X0 and you will compute approximately the total distance X0X1 + X1X2 + .. + X4X0.

// For the distances you are given an array or a dictionary that gives each distance X0X1, X0X2 and so on. For example (it depends on the language):

// [ ["X1", 100.0], ["X2", 200.0], ["X3", 250.0], ["X4", 300.0] ]
// or
// ("X1" -> 100.0, "X2" -> 200.0, "X3" -> 250.0, "X4" -> 300.0)
// which means that X1 is at 100.0 miles from X0, X2 at 200.0 miles from X0, etc... It's not real life, it's a story... : the towns X0, X1, .., X0 are placed in the following manner 

// X0X1X2 is a right triangle with the right angle in X1, X0X2X3 is a right triangle with the right angle in X2, ... In a travel X0, X1, .., Xi-1, Xi, Xi+1.., X0 you will suppose - 
// to make it easier - that there is a right angle in Xi (i > 0).

// So if a town Xi is not visited you will consider that the triangle  X0Xi-1Xi+1 is still a right triangle in Xi-1 and you can use the "Pythagorean_theorem".

// Task
// Can you help your granny and give her approximately the distance to travel?

function tour(friends, fTowns, distTable) {
    
    if (fTowns.length === 0 || distTable.length === 0) {
        return 0;
    }
    
    const friendsLocation = convertFriendsLocation(fTowns);
    const distanceTable = convertDistTable(distTable); 

    const friendsToVisit = friends.filter((f) =>
      canVisit(f, friendsLocation, distanceTable) !== -1
    );

    const firstFriendTown = friendsLocation[friendsToVisit[0]];
    const lastFriendTown = friendsLocation[friendsToVisit[friendsToVisit.length - 1]];
    let sum = distanceTable[firstFriendTown] + distanceTable[lastFriendTown];

    for (let i = 1; i < friendsToVisit.length; i++) {
        let currentFriend = friendsLocation[friends[i]]
        let prevFriend = friendsLocation[friends[i-1]]
        let diffOfPowers = Math.pow(distanceTable[currentFriend], 2) - Math.pow(distanceTable[prevFriend], 2);
        let distance = Math.sqrt(diffOfPowers);
        sum += distance;
    }

    return Math.floor(sum);
}

function canVisit(friend, friendsLocation, distanceTable) {
  if (!friendsLocation[friend] || !distanceTable[friendsLocation[friend]]) {
    return -1;
  }

  return distanceTable[friendsLocation[friend]];
}

function convertFriendsLocation(array){
    const result = {}
    for (let i = 0; i < array.length; i++) {
        result[array[i][0]] = array[i][1]
    }
    return result;
}

function convertDistTable(array) {
  const result = {};
  for (let i = 0; i < array.length; i = i + 2) {
    result[array[i]] = array[i+1];
  }
  return result;
}

var friends1 = ["A1", "A2", "A3", "A4", "A5"];
var fTowns1 = [["A1", "X1"],["A2", "X2"],["A3", "X3"],["A4", "X4"],];
var distTable1 = ["X1", 100.0, "X2", 200.0, "X3", 250.0, "X4", 300.0];

console.log(tour(friends1, fTowns1, distTable1));

var friends2 = [ 'A1', 'A2', 'A3', 'A4', 'A5' ]
var fTowns2 = [ [ 'A1', 'X1' ], [ 'A2', 'X2' ], [ 'A3', 'X3' ], [ 'A4', 'X4' ] ]
var distTable2 = ['X1', 100,  'X2', 200,  'X3', 250, 'X4', 300]

console.log(tour(friends2, fTowns2, distTable2));

var friends3 = ["A1", "A2", "A3", "A4", "A5"];
var fTowns3 = [["A1", "X1"],["A2", "X2"],["A3", "X3"],["A4", "X4"],["A5", "X5"],];
var distTable3 = ["X1", 100, "X2", 200, "X3", 250, "X4", 300, "X5", 320];

console.log(tour(friends3, fTowns3, distTable3));