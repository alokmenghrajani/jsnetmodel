/**
 * Abstract devices
 */
Sim.Device = function(sim) {
  this.sim = sim;
  this.name = this.constructor.getName() + "_" + (++Sim.Device.id);
  this.connections = [];
  sim.register(this);

  var e = $('<div class="device"></div>')[0];
  e.id = this.name;
  e.innerHTML = this.name;
  e.appendChild($('<div class="dump"></div>')[0]);
  $('#jsnetmodel')[0].appendChild(e);
}
Sim.Device.id = 0;

Sim.Device.getName = function() { return "unknown" }

Sim.Device.prototype.connect = function(other) {
  this.sim.log("plugging " + other.name + " into " + this.name);
  this.connections.push(other);
}

/**
 * Gets called for every simulation frame.
 */
Sim.Device.prototype.tick = function(n) {}

/**
 * Gets called for every incoming message.
 */
Sim.Device.prototype.recv = function(src, msg) {
  var output = $('#'+this.name+' .dump')[0];
  var text = $('<div></div>')[0];
  text.innerHTML = this.sim.time + ": received " + JSON.stringify(msg) + " on " + src.name;
  output.appendChild(text);

  // Give a chance for the message to get processed.
  // TODO: in the long term, I'm not sure this is the right way of doing things.
  msg.process(this);
}
