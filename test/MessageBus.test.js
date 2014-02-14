var assert = require('assert'),
    LocalMessageBus = require('../lib/LocalMessageBus');

describe('LocalMessageBus', function() {

  it('should create a LocalMessageBus', function () {
    var bus = new LocalMessageBus();
    assert.ok(bus instanceof LocalMessageBus);
  });

  it('should register and unregister to LocalMessageBus', function () {
    var bus = new LocalMessageBus();
    var count = 0;

    // register and send a message
    bus.register('peer1', function (from, message) {
      assert.equal(from, 'peer2');
      assert.equal(message, 'hi there');
      count++;
    });

    bus.send('peer2', 'peer1', 'hi there');
    assert.equal(count, 1);

    // unregister
    bus.unregister('peer1');
    assert.throws (function () {
      bus.send('peer2', 'peer1', 'hi there');
    }, /Error: Peer with id peer1 not found/);
  });

});