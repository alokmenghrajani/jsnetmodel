/**
 * A connection between 2 or more devices.
 *
 * It's kind of weird, but a connection is a device.
 */
Sim.Connection = function(sim) {
  Sim.Device.prototype.constructor.apply(this, arguments);
}

Sim.Connection.getName = function() {
  return "conn";
}

Sim.Connection.prototype.add = function(device) {
  // It makes sense for both these connections to happen at the
  // same time.
  device.connect(this);
  this.connections.push(device);
}
$.extend(Sim.Connection.prototype, Sim.Device.prototype);

Sim.Connection.prototype.send = function(src, msg) {
  // Check that the message is valid
  for (e in msg) {
    if (msg[e] == undefined) {
      console.log("INVALID MSG. ("+e+" not defined)");
      return;
    }
  }

  var output = $('#'+src.name+' .dump')[0];
  var text = $('<div></div>')[0];
  text.innerHTML = this.sim.time + ": sending " + JSON.stringify(msg) + " on " + this.name;
  output.appendChild(text);

  // Enqueue msg delivery on next tick
  this.connections.forEach(function(device) {
    if (device != src) {
      this.sim.enqueue(device.recv.bind(device, this, msg));
    }
  }.bind(this));
}
