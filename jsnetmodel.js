function Sim() {
  this.time = 0;
  this.devices = [];
  this.connections = [];

  // The queue is used for any communication between
  // two components.
  // I.e. to send a message from A to B, A registers
  // a function to add the message to the connection between A-B,
  // the connection will then forward the message, which
  // then get scheduled for delivery.

  this.queue = [];
  this.currentQueue = [];
  setInterval(this.run.bind(this), 100);
}

Sim.prototype.log = function(message) {
  var output = $('#jsnetmodel')[0];
  var text = $('<div></div>')[0];
  text.innerHTML = this.time + ": " + message;
  output.appendChild(text);
}

Sim.prototype.enqueue = function(f) {
  this.currentQueue.push(f);
}

Sim.prototype.register = function(device) {
  this.enqueue(function(){
    this.log("creating "+device.name);
    this.devices.push(device);
  }.bind(this));
}

Sim.prototype.connect = function(device1, device2) {
  var c = new Sim.Connection(this);
  this.enqueue(c.add.bind(c, device1));
  this.enqueue(c.add.bind(c, device2));
  this.enqueue(this.connections.push.bind(this, c));
}

Sim.prototype.run = function() {
  this.time++;
  if (this.currentQueue.length > 0) {
    this.queue.push(this.currentQueue);
    this.currentQueue = [];
  }
  if (this.queue.length > 0) {
    e = this.queue.shift();
    e.forEach(function(el){el()});
  }

  // call tick on every object in the system
  this.devices.forEach(function(d){d.tick(this.time)}.bind(this));
}

Sim.Proto = function() {}
