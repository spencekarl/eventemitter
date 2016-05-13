function EventEmitter() {
  this.listeners = 0;
  this.events = {};
}

EventEmitter.prototype.on = function (name, handler) {
  if (typeof name !== 'string' || typeof handler !== 'function') throw new TypeError;
  // if we get past the error handling we are ready to bind the handler functions

  // the first instance of the event
  if (!this.events[name]) {
    this.events[name] = handler;
  }
  // create an array of handlers if this is the second instance of the event
  else if (this.listeners == 1) {
    this.events[name] = [this.events[name], handler];
  }
  // push all new handlers to the previously created array
  else {
    this.events[name].push(handler);
  }

  this.listeners++;
  return this;
}

EventEmitter.prototype.off = function () {
  var name = arguments[0];
  var handler = arguments[1];
  var length = arguments.length;

  // error handling requires 1st param to be a string and 2nd to be a function
  if (length > 0 && typeof name !== 'string') throw new TypeError;
  if (length > 1 && (typeof handler === undefined || typeof handler !== 'function')) throw new TypeError;

  // if no parameters passed in, reset everything
  if (length == 0) {
    this.events = {};
    this.listeners = 0;
    return this;
  }

  // if we have a handler bound to the event
  if (this.events[name]) {
    // if we need to remove a specific handler (passed in as an argument)
    if (handler) {
      length = this.events[name].length; // figure out length of handler queue

      // loop through the handler queue and remove each instance of handler
      for (i = length - 1; i >= 0; i--) {  // goes backwards to avoid dangling commas
        if (this.events[name][i] == handler) {
          this.listeners--;
          this.events[name].splice(i, 1);
        }
      }
    }
    // ...or we just remove all handlers from the queue
    else {
      this.listeners -= this.events[name].length;
      delete this.events[name];
    }
  }

  return this;
}

EventEmitter.prototype.emit = function () {
  if (typeof arguments[0] !== 'string') throw new TypeError;
  if (typeof arguments[1] === 'function') return this;

  var handler = this.events[arguments[0]]; // get handler(s) bound to event
  var length;

  // handler could be a function
  if (typeof handler === 'function') {
    var args = [];
    length = arguments.length;

    // build a list of arguments to pass to handler
    for (i = 0; i < length; i++) {
      args[i] = arguments[i + 1];
    }
    handler.apply(this, args);
  }
  // ...or handler could be many functions
  else if (handler instanceof Array){
    length = handler.length;

    // call each function
    for (i = 0; i < length; i++) {
      handler[i].call(this);
    }
  }
}

module.exports = EventEmitter;
