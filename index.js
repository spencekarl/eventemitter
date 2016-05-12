function EventEmitter() {
  this.listeners = 0;
  this.events = {};
}

EventEmitter.prototype.on = function (event, handler) {
  if (typeof event !== 'string' || typeof handler !== 'function') throw new TypeError;

  if (!this.events[event]) {
    this.events[event] = handler;
  }
  else if (this.events[event] === typeof Array) {
    this.events[event].push(handler);
  }
  else {
    this.events[event] = [this.events[event], handler];
  }

  this.listeners++;
  return this;
}

EventEmitter.prototype.off = function () {

}

EventEmitter.prototype.emit = function () {
  if (typeof arguments[0] !== 'string') throw new TypeError;
  if (typeof arguments[1] === 'function') return this;

  var handler = this.events[arguments[0]];
  var args = [];
  var length;

  if (typeof handler === 'function') {
    length = arguments.length;

    for (i = 0; i < length; i++) {
      args[i] = arguments[i + 1];
    }
    handler.apply(this, args);
  }
  else {
    var handlers = handler.slice("");
    length = handlers.length;

    for (i = 0; i < length; i++) {
      handlers[i].call(this);
    }
  }
}

//need to understand .exports better
module.exports = EventEmitter;
