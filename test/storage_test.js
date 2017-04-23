'use strict';

import {expect} from 'chai';
import StorageBackend from 'dom-storage';
import {beforeEach, describe, it} from 'mocha';
import {Storage} from '../src/index';

/**
 * @test {Storage}
 */
describe('Storage', () => {
  let backend;
  beforeEach(() => backend = new StorageBackend(null, {strict: true}));

  /**
   * @test {Storage#keys}
   */
  describe('#keys', () => {
    it('should return an empty array for an empty storage', () => {
      expect(new Storage(backend).keys).to.be.empty;
    });

    it('should return the list of keys for a non-empty storage', () => {
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');

      let keys = new Storage(backend).keys;
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
      expect(new Storage(backend)).to.have.lengthOf(0);
    });

    it('should return the number of entries for a non-empty storage', () => {
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');
      expect(new Storage(backend)).to.have.lengthOf(2);
    });
  });

  /**
   * @test {Storage#Symbol.iterator}
   */
  describe('#[Symbol.iterator]()', () => {
    it('should return a done iterator if storage is empty', () => {
      let storage = new Storage(backend);
      let iterator = storage[Symbol.iterator]();
      expect(iterator.next().done).to.be.true;
    });

    it('should return a value iterator if storage is not empty', () => {
      let storage = new Storage(backend);
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');

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
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');

      let storage = new Storage(backend);
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
      let storage = new Storage(backend);
      expect(storage.get('foo')).to.be.null;
      expect(storage.get('foo', '123')).to.equal('123');

      backend.setItem('foo', 'bar');
      expect(storage.get('foo')).to.equal('bar');

      backend.setItem('foo', '123');
      expect(storage.get('foo')).to.equal('123');
    });
  });

  /**
   * @test {Storage#getObject}
   */
  describe('#getObject()', () => {
    it('should properly get the deserialized storage entries', () => {
      let storage = new Storage(backend);
      expect(storage.getObject('foo')).to.be.null;
      expect(storage.getObject('foo', {key: 'value'})).to.deep.equal({key: 'value'});

      backend.setItem('foo', '123');
      expect(storage.getObject('foo')).to.equal(123);

      backend.setItem('foo', '"bar"');
      expect(storage.getObject('foo')).to.equal('bar');

      backend.setItem('foo', '{"key": "value"}');
      expect(storage.getObject('foo')).to.be.an('object')
        .and.have.property('key').that.equal('value');
    });

    it('should throw an error if the value can\'t be deserialized', () => {
      let storage = new Storage(backend);
      backend.setItem('foo', 'bar');
      expect(() => storage.getObject('foo')).to.throw(SyntaxError);
    });
  });

  /**
   * @test {Storage#has}
   */
  describe('#has()', () => {
    it('should return `false` if the specified key is not contained', () => {
      expect(new Storage(backend).has('foo')).to.be.false;
    });

    it('should return `true` if the specified key is contained', () => {
      backend.setItem('foo', 'bar');

      let storage = new Storage(backend);
      expect(storage.has('foo')).to.be.true;
      expect(storage.has('bar')).to.be.false;
    });
  });

  /**
   * @test {Storage#remove}
   */
  describe('#remove()', () => {
    it('should properly remote the storage entries', () => {
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');

      let storage = new Storage(backend);
      expect(backend.getItem('foo')).to.equal('bar');

      storage.remove('foo');
      expect(backend.getItem('foo')).to.be.null;
      expect(backend.getItem('bar')).to.equal('baz');

      storage.remove('bar');
      expect(backend.getItem('bar')).to.be.null;
    });
  });

  /**
   * @test {Storage#set}
   */
  describe('#set()', () => {
    it('should properly set the storage entries', () => {
      let storage = new Storage(backend);
      expect(backend.getItem('foo')).to.be.null;

      storage.set('foo', 'bar');
      expect(backend.getItem('foo')).to.equal('bar');

      storage.set('foo', '123');
      expect(backend.getItem('foo')).to.equal('123');
    });
  });

  /**
   * @test {Storage#setObject}
   */
  describe('#setObject()', () => {
    it('should properly serialize and set the storage entries', () => {
      let storage = new Storage(backend);
      expect(backend.getItem('foo')).to.be.null;

      storage.setObject('foo', 123);
      expect(backend.getItem('foo')).to.equal('123');

      storage.setObject('foo', 'bar');
      expect(backend.getItem('foo')).to.equal('"bar"');

      storage.setObject('foo', {key: 'value'});
      expect(backend.getItem('foo')).to.equal('{"key":"value"}');
    });
  });
});
