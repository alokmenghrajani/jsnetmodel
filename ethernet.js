Sim.Proto.Ethernet = function() {}

Sim.Proto.Ethernet.prototype.ethernet_init = function(mac, ip) {
  this.mac = mac;
  // TODO: what if the IP address is from DHCP or some other protocol?
  this.ip = ip;
}

Sim.Proto.Ethernet.prototype.ARPing = function(dest_ip_address) {
  var msg = new Sim.Proto.Arp();
  msg.oper = 1;
  msg.sha.value = this.mac;
  msg.spa.value = this.ip;
  msg.tha.value = "FF:FF:FF:FF:FF:FF";
  msg.tpa.value = dest_ip_address;

  // TODO: how do we choose which peer to use?
  this.connections[0].send(this, msg);
}

Sim.Proto.Ethernet.prototype.ARPing_response = function(msg) {
  if (msg.oper != 1) {
    // wasn't a ping
    return;
  }
  if (msg.tpa.value != this.ip) {
    // wasn't for us
    return;
  }

  var resp = new Sim.Proto.Arp();
  resp.oper = 2;
  resp.sha.value = this.mac;
  resp.spa.value = this.ip;
  resp.tha.value = msg.sha.value;
  resp.tpa.value = msg.spa.value;

  // TODO: assuming there's only one connection here
  this.connections[0].send(this, resp);
}

Sim.Proto.Arp = function() {
  this.htype = {name: "Hardware type", len: 16, value: 0x0001};
  this.ptype = {name: "Protocol type", len: 16, value: 0x0800};
  this.hlen = {name: "Hardware address length", len: 8, value: 6};
  this.plen = {name: "Protocol address length", len: 8, value: 4};
  this.oper = {name: "Operation", len: 16};
  this.sha = {name: "Sender hardware address", len: this.hlen.value * 8};
  this.spa = {name: "Sender protocol address", len: this.plen * 8};
  this.tha = {name: "Target hardware address", len: this.hlen.value * 8};
  this.tpa = {name: "Target protocol address", len: this.plen * 8};
}

Sim.Proto.Arp.prototype.process = function(device) {
  if ((this.htype.value == 0x0001) && (typeof(device.ethernet_init) == "function")) {
    device.ARPing_response(this);
  }
}