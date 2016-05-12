function EventEmitter() {
  this.listeners = 0;
  this.events = {};
}

EventEmitter.prototype.on = function (name, handler) {
  if (typeof name !== 'string' || typeof handler !== 'function') throw new TypeError;

  if (!this.events[name]) {
    this.events[name] = handler;
  }
  else if (this.listeners == 1) {
    this.events[name] = [this.events[name], handler];
  }
  else {
    this.events[name].push(handler);
  }

  this.listeners++;
  return this;
}

EventEmitter.prototype.off = function () {
  var length = arguments.length;

  if (length > 0 && typeof arguments[0] !== 'string') throw new TypeError;
  if (length > 1 && (typeof arguments[1] === undefined || typeof arguments[1] !== 'function')) throw new TypeError;

  if (!length) {
    this.events = {};
    this.listeners = 0;
  }

  if (this.events[arguments[0]]) {
    if (arguments[1]) {
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

  return this;
}

EventEmitter.prototype.emit = function () {
  if (typeof arguments[0] !== 'string') throw new TypeError;
  if (typeof arguments[1] === 'function') return this;

  var handler = this.events[arguments[0]];
  var length;
  var args = [];

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
