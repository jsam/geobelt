var EventEmitter = require('events').EventEmitter,
    util = require('util');

var defaults = {
  delay: 1000
};

function TQueue(config) {
  var self = this;
  EventEmitter.call(self);

  if(!config) {
    config = 1000;
  }

  self.delay = (typeof config === 'number' ? config : config.delay);
  self.fifo = (typeof config === 'number' ? true : config.type == 'fifo');
  self._items = [];
  self._intervalId = 0;
};

util.inherits(TQueue, EventEmitter);

TQueue.prototype.push = function(item) {
  var self = this;

  this._items.push(item);
  this.emit('push', item);

  if(this._intervalId == 0) {
    this._intervalId = setInterval(function(){self.pop()}, this.delay);
    this.emit('start');
  }
};

TQueue.prototype.pop = function() {
  if(!this.empty()) {
    this.emit('pop', (this.fifo ? this._items.shift() : this._items.pop()));  
  } else {
    clearInterval(this._intervalId);
    this._intervalId = 0;
    this.emit('empty');
  }
};

TQueue.prototype.length = function() {
  return this._items.length;
};

TQueue.prototype.empty = function() {
  return (this.length() == 0);
};

module.exports = TQueue;