process.on('message', (data) => {
    console.log("Message from parent:", data);
  
    // Do some work, then respond
    process.send({ reply: "Hello parent!" });
  });
  