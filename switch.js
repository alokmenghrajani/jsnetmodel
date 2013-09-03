/**
 * A switch. Currently behaves more like a hub.
 */
Sim.Switch = function(sim) {
  Sim.Device.prototype.constructor.apply(this, arguments);
  this.ARPcache = {}
}

Sim.Switch.getName = function() {
  return "switch";
}
$.extend(Sim.Switch.prototype, Sim.Device.prototype);

Sim.Switch.prototype.recv = function(src, msg) {
  Sim.Device.prototype.recv.apply(this, arguments);

  // Record src in ARPcache
  if (msg.htype.value == 0x0001) {
    this.ARPcache[msg.sha.value] = {
      ttl: this.sim.time + 1000,
      port: src
    };
  }

  if ((this.ARPcache[msg.tha.value] != undefined) &&
      (this.ARPcache[msg.tha.value].ttl > this.sim.time)) {
    // Destination address was found in ARPcache.
    // TODO: implement some kind of arp cache visualization.
    this.ARPcache[msg.tha.value].port.send(this, msg);
  } else {
    // The destination was not found, so replay the packet
    // on all the other interfaces.
    this.connections.forEach(function(conn) {
      if (conn != src) {
        conn.send(this, msg);
      }
    }.bind(this));
  }
}
