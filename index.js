const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/javascript/state-machines
let rooms = {
  'outside': { canChangeTo: [foyer, mrMikes, muddyWaters] },
  'foyer': { canChangeTo: [classroom, outside] },
  'classroom': { canChangeTo: [foyer] },
  'muddyWaters': { canChangeTo: [outside] },
  'mrMikes': {canChangeTo: [outside]}
};

let currentRoom = 'outside';

function enterRoom(newRoom) {
  let validTransitions = rooms[currentRoom].canChangeTo;
  if (validTransitions.includes(newRoom)) {
    currentRoom = newRoom;
  } else {
    throw 'Invalid state transition attempted - from ' + currentRoom + ' to ' + newRoom;
  }
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');

  
  process.exit();
}

//write global objects for each room

let outside = {
  name: 'Main Street'
  
}