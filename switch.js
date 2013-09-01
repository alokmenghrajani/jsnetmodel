/**
 * A switch. Currently behaves more like a hub.
 */
Sim.Switch = function(sim) {
  Sim.Device.prototype.constructor.apply(this, arguments);
}

Sim.Switch.getName = function() {
  return "switch";
}
$.extend(Sim.Switch.prototype, Sim.Device.prototype);

Sim.Switch.prototype.recv = function(src, msg) {
  Sim.Device.prototype.recv.apply(this, arguments);

  this.connections.forEach(function(conn) {
    if (conn != src) {
      conn.send(this, msg);
    }
  }.bind(this));
}
