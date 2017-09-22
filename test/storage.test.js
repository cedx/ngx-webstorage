import {expect} from 'chai';
import {Storage} from '../src';

/**
 * @test {Storage}
 */
describe('Storage', () => {

  /**
   * @test {Storage#keys}
   */
  describe('#keys', () => {
    it('should return an empty array for an empty storage', () => {
      expect(new Storage(sessionStorage).keys).to.be.empty;
    });

    it('should return the list of keys for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      let keys = new Storage(sessionStorage).keys;
      expect(keys).to.have.lengthOf(2);
      expect(keys[0]).to.equal('foo');
      expect(keys[1]).to.equal('bar');
    });
  });

  /**
   * @test {Storage#length}
   */
  describe('#length', () => {
    it('should return zero for an empty storage', () => {
      expect(new Storage(sessionStorage)).to.have.lengthOf(0);
    });

    it('should return the number of entries for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');
      expect(new Storage(sessionStorage)).to.have.lengthOf(2);
    });
  });

  /**
   * @test {Storage#onChanges}
   */
  describe('#onChanges', () => {
    let subscription;
    afterEach('cancel the subscription', () =>
      subscription.unsubscribe()
    );

    it('should trigger an event when a value is added', done => {
      let storage = new Storage(sessionStorage);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).to.be.an('array').and.have.lengthOf(1);

        let record = changes[0];
        expect(record).to.be.an('object');
        expect(record).to.have.property('key').that.equal('foo');
        expect(record).to.have.property('currentValue').that.equal('bar');
        expect(record).to.have.property('previousValue').that.is.null;

        done();
      });

      storage.set('foo', 'bar');
    });

    it('should trigger an event when a value is updated', done => {
      sessionStorage.setItem('foo', 'bar');

      let storage = new Storage(sessionStorage);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).to.be.an('array').and.have.lengthOf(1);

        let record = changes[0];
        expect(record).to.be.an('object');
        expect(record).to.have.property('key').that.equal('foo');
        expect(record).to.have.property('currentValue').that.equal('baz');
        expect(record).to.have.property('previousValue').that.equal('bar');

        done();
      });

      storage.set('foo', 'baz');
    });

    it('should trigger an event when a value is removed', done => {
      sessionStorage.setItem('foo', 'bar');

      let storage = new Storage(sessionStorage);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).to.be.an('array').and.have.lengthOf(1);

        let record = changes[0];
        expect(record).to.be.an('object');
        expect(record).to.have.property('key').that.equal('foo');
        expect(record).to.have.property('currentValue').that.is.null;
        expect(record).to.have.property('previousValue').that.equal('bar');

        done();
      });

      storage.remove('foo');
    });

    it('should trigger an event when the storage is cleared', done => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      let storage = new Storage(sessionStorage);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).to.be.an('array').and.have.lengthOf(2);

        let record = changes[0];
        expect(record).to.be.an('object');
        expect(record).to.have.property('key').that.equal('foo');
        expect(record).to.have.property('currentValue').that.is.null;
        expect(record).to.have.property('previousValue').that.equal('bar');

        record = changes[1];
        expect(record).to.be.an('object');
        expect(record).to.have.property('key').that.equal('bar');
        expect(record).to.have.property('currentValue').that.is.null;
        expect(record).to.have.property('previousValue').that.equal('baz');

        done();
      });

      storage.clear();
    });
  });

  /**
   * @test {Storage#Symbol.iterator}
   */
  describe('#[Symbol.iterator]()', () => {
    it('should return a done iterator if storage is empty', () => {
      let storage = new Storage(sessionStorage);
      let iterator = storage[Symbol.iterator]();
      expect(iterator.next().done).to.be.true;
    });

    it('should return a value iterator if storage is not empty', () => {
      let storage = new Storage(sessionStorage);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      let iterator = storage[Symbol.iterator]();
      let next = iterator.next();
      expect(next.done).to.be.false;
      expect(next.value).to.be.an('array');
      expect(next.value[0]).to.equal('foo');
      expect(next.value[1]).to.equal('bar');

      next = iterator.next();
      expect(next.done).to.be.false;
      expect(next.value[0]).to.equal('bar');
      expect(next.value[1]).to.equal('baz');
      expect(iterator.next().done).to.be.true;
    });
  });

  /**
   * @test {Storage#clear}
   */
  describe('#clear()', () => {
    it('should remove all storage entries', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      let storage = new Storage(sessionStorage);
      expect(storage).to.have.lengthOf(2);

      storage.clear();
      expect(storage).to.have.lengthOf(0);
    });
  });

  /**
   * @test {Storage#get}
   */
  describe('#get()', () => {
    it('should properly get the storage entries', () => {
      let storage = new Storage(sessionStorage);
      expect(storage.get('foo')).to.be.null;
      expect(storage.get('foo', '123')).to.equal('123');

      sessionStorage.setItem('foo', 'bar');
      expect(storage.get('foo')).to.equal('bar');

      sessionStorage.setItem('foo', '123');
      expect(storage.get('foo')).to.equal('123');
    });
  });

  /**
   * @test {Storage#getObject}
   */
  describe('#getObject()', () => {
    it('should properly get the deserialized storage entries', () => {
      let storage = new Storage(sessionStorage);
      expect(storage.getObject('foo')).to.be.null;
      expect(storage.getObject('foo', {key: 'value'})).to.deep.equal({key: 'value'});

      sessionStorage.setItem('foo', '123');
      expect(storage.getObject('foo')).to.equal(123);

      sessionStorage.setItem('foo', '"bar"');
      expect(storage.getObject('foo')).to.equal('bar');

      sessionStorage.setItem('foo', '{"key": "value"}');
      expect(storage.getObject('foo')).to.be.an('object')
        .and.have.property('key').that.equal('value');
    });

    it('should return the default value if the value can\'t be deserialized', () => {
      let storage = new Storage(sessionStorage);
      sessionStorage.setItem('foo', 'bar');
      expect(storage.getObject('foo', 'defaultValue')).to.equal('defaultValue');
    });
  });

  /**
   * @test {Storage#has}
   */
  describe('#has()', () => {
    it('should return `false` if the specified key is not contained', () => {
      expect(new Storage(sessionStorage).has('foo')).to.be.false;
    });

    it('should return `true` if the specified key is contained', () => {
      sessionStorage.setItem('foo', 'bar');

      let storage = new Storage(sessionStorage);
      expect(storage.has('foo')).to.be.true;
      expect(storage.has('bar')).to.be.false;
    });
  });

  /**
   * @test {Storage#remove}
   */
  describe('#remove()', () => {
    it('should properly remove the storage entries', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      let storage = new Storage(sessionStorage);
      expect(sessionStorage.getItem('foo')).to.equal('bar');

      storage.remove('foo');
      expect(sessionStorage.getItem('foo')).to.be.null;
      expect(sessionStorage.getItem('bar')).to.equal('baz');

      storage.remove('bar');
      expect(sessionStorage.getItem('bar')).to.be.null;
    });
  });

  /**
   * @test {Storage#set}
   */
  describe('#set()', () => {
    it('should properly set the storage entries', () => {
      let storage = new Storage(sessionStorage);
      expect(sessionStorage.getItem('foo')).to.be.null;

      storage.set('foo', 'bar');
      expect(sessionStorage.getItem('foo')).to.equal('bar');

      storage.set('foo', '123');
      expect(sessionStorage.getItem('foo')).to.equal('123');
    });
  });

  /**
   * @test {Storage#setObject}
   */
  describe('#setObject()', () => {
    it('should properly serialize and set the storage entries', () => {
      let storage = new Storage(sessionStorage);
      expect(sessionStorage.getItem('foo')).to.be.null;

      storage.setObject('foo', 123);
      expect(sessionStorage.getItem('foo')).to.equal('123');

      storage.setObject('foo', 'bar');
      expect(sessionStorage.getItem('foo')).to.equal('"bar"');

      storage.setObject('foo', {key: 'value'});
      expect(sessionStorage.getItem('foo')).to.equal('{"key":"value"}');
    });
  });
});
