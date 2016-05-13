function EventEmitter() {
  this.listeners = 0;
  this.events = {};
}

EventEmitter.prototype.on = function (event, handler) {
  if (typeof event !== 'string' || typeof handler !== 'function') throw new TypeError;

  if (!this.events[event]) {
    this.events[event] = handler;
  }
  else if (typeof this.events[event] === 'object') {
    this.events[event].push(handler);
  }
  else {
    this.events[event] = [this.events[event], handler];
  }

  this.listeners++;
  return this;
}

EventEmitter.prototype.off = function () {
  var length = arguments.length;

  if (length > 0 && typeof arguments[0] !== 'string') throw new TypeError;

  if (length === 0) {
    this.events = {};
    this.listeners = 0;
  }
  else if (this.events[arguments[0]]) {
    if (typeof arguments[1] === 'function') {
      length = this.events[arguments[0]].length;
      for (i = length - 1; i >= 0; i--) {
        if (this.events[arguments[0]][i] == arguments[1]) {
          this.listeners--;
          this.events[arguments[0]].splice(i, 1);
        }
      }
    }
    else {
      this.listeners -= this.events[arguments[0]].length;
      delete this.events[arguments[0]];
    }
  }
  else {

  }

  return this;
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
  else if (typeof handler === 'object'){
    var handlers = handler.slice("");
    length = handlers.length;

    for (i = 0; i < length; i++) {
      handlers[i].call(this);
    }
  }
}

//need to understand .exports better
module.exports = EventEmitter;
