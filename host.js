/**
 * A host
 */
Sim.Host = function(sim) {
  Sim.Device.prototype.constructor.apply(this, arguments);
}

Sim.Host.getName = function() {
  return "host";
}

$.extend(Sim.Host.prototype, Sim.Device.prototype);
