function EventEmitter() {
  this.listeners = 0;
}

EventEmitter.prototype.on = function (arg1, arg2) {
  if (typeof arg1 !== 'string' || typeof arg2 !== 'function') throw new TypeError;

  this.listeners++;
  return this;
}

EventEmitter.prototype.emit = function (arg1) {
  if (typeof arg1 !== 'string') throw new TypeError;

  return this;
}

//need to understand .exports better
module.exports = EventEmitter;
