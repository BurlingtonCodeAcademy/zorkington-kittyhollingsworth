const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);



function outsideRoom(answer) {
  if (answer === 'read sign') {
    console.log('The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."')
  } else if (answer === 'gargle') {
    console.log("Sorry, I don't know how to gargle.")
  } else if (answer === 'take sign') {
    console.log('That would be selfish. How will other students find their way?')
  } else if (answer === 'enter code 12345' || answer === 'key in 12345') {
    console.log('Success! The door opens. You enter the foyer and the door shuts behind you.')
    return enterRoom('foyer')
  } else if (answer === 'enter code 54321') {
    console.log('Bzzzzt! The door is still locked.')
  } else {
    console.log('The door is locked. There is a keypad on the door handle.')
  }
}

function foyer(answer) {
  console.log(answer + 'in the foyer')
}

function mrMikes(answer) {
  console.log(answer + 'I am at mr.Mikes ')
}

function muddyWaters(answer) {
  console.log(answer + 'I am at muddy waters')
}

function classroom(answer) {
  console.log(answer + 'I am learning!')
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/javascript/state-machines
let rooms = {
  'outside': { canChangeTo: ['foyer', 'mrMikes', 'muddyWaters'] },
  'foyer': { canChangeTo: ['classroom', 'outside'] },
  'classroom': { canChangeTo: ['foyer'] },
  'muddyWaters': { canChangeTo: ['outside'] },
  'mrMikes': { canChangeTo: ['outside'] }
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

  const foyerMessage = "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner."
  let answer = await ask(welcomeMessage);
  while (answer !== 'exit') {
    if (currentRoom === 'outside') {
      outsideRoom(answer);
    } else if (currentRoom === 'foyer') {
      answer = await ask(foyerMessage)
    foyer(answer)
    }
    answer = await ask('>_ ')
  }
  process.exit();
}
