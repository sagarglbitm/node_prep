//  event module allow us to work with event in nodejs

// an event is ana action or an ocurance that has  happened in our application
// that we can respond to

// using event module we can dispatch our own custom event
// and respond to those custom event in a non-blocking manner


// this is event-driven programming
const EventEmitter=require('node:events')

const emitter=new EventEmitter();


emitter.on('order-pizza',(size,topping)=>{
    console.log(`order recieved :baking a ${size} pizza with ${topping}`)
})

emitter.on('order-pizza',(size)=>{
    if(size==='large'){
        console.log("serving compilmentary drink")
    }
})

console.log("do wrok before evnt")
emitter.emit("order-pizza",'large','mushroom')