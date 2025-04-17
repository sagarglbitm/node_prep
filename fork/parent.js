const { fork } = require('child_process');

const child = fork('child.js');

// Send data to the child
child.send({ message: "Hey child!" });

// Receive message from child
child.on('message', (data) => {
  console.log("Message from child:", data);
});



// output

// Message from parent: { message: 'Hey child!' }
// Message from child: { reply: 'Hello parent!' }
