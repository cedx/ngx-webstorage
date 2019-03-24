import {Subscription} from 'rxjs';
import {SessionStorage} from '../src';
import {afterEach} from '@angular/core/testing/src/testing_internal';

/**
 * Tests the `Storage` class.
 */
describe('Storage', () => {

  /**
   * Tests the `Storage#keys` property.
   */
  describe('#keys', () => {
    it('should return an empty array for an empty storage', () => {
      expect(new SessionStorage(window.document).keys.length).toEqual(0);
    });

    it('should return the list of keys for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const keys = new SessionStorage(window.document).keys;
      expect(keys.length).toEqual(2);
      expect(keys[0]).toEqual('foo');
      expect(keys[1]).toEqual('bar');
    });
  });

  /**
   * Tests the `Storage#length` property.
   */
  describe('#length', () => {
    it('should return zero for an empty storage', () => {
      expect(new SessionStorage(window.document).length).toEqual(0);
    });

    it('should return the number of entries for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');
      expect(new SessionStorage(window.document).length).toEqual(2);
    });
  });

  /**
   * Tests the `Storage#onChanges` property.
   */
  describe('#onChanges', () => {
    let subscription: Subscription;
    afterEach(() => subscription.unsubscribe());

    it('should trigger an event when a value is added', done => {
      const storage = new SessionStorage(window.document);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).toBe('array').and.have.lengthOf(1);

        const record = changes[0];
        expect(record).toBe('object');
        expect(record.key).toEqual('foo');
        expect(record.currentValue).toEqual('bar');
        expect(record.previousValue).toBeNull();

        done();
      });

      storage.set('foo', 'bar');
    });

    it('should trigger an event when a value is updated', done => {
      sessionStorage.setItem('foo', 'bar');

      const storage = new SessionStorage(window.document);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).toBe('array').and.have.lengthOf(1);

        const record = changes[0];
        expect(record).toBe('object');
        expect(record.key).toEqual('foo');
        expect(record.currentValue).toEqual('baz');
        expect(record.previousValue).toEqual('bar');

        done();
      });

      storage.set('foo', 'baz');
    });

    it('should trigger an event when a value is removed', done => {
      sessionStorage.setItem('foo', 'bar');

      const storage = new SessionStorage(window.document);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).toBe('array').and.have.lengthOf(1);

        const record = changes[0];
        expect(record).toBe('object');
        expect(record.key).toEqual('foo');
        expect(record.currentValue).toBeNull();
        expect(record.previousValue).toEqual('bar');

        done();
      });

      storage.remove('foo');
    });

    it('should trigger an event when the storage is cleared', done => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const storage = new SessionStorage(window.document);
      subscription = storage.onChanges.subscribe(changes => {
        expect(changes).toBe('array').and.have.lengthOf(2);

        let record = changes[0];
        expect(record).toBe('object');
        expect(record.key).toEqual('foo');
        expect(record.currentValue).toBeNull();
        expect(record.previousValue).toEqual('bar');

        record = changes[1];
        expect(record).toBe('object');
        expect(record.key).toEqual('bar');
        expect(record.currentValue).toBeNull();
        expect(record.previousValue).toEqual('baz');

        done();
      });

      storage.clear();
    });
  });

  /**
   * Tests the `Storage#[Symbol.iterator]()` method.
   */
  describe('#[Symbol.iterator]()', () => {
    it('should return a done iterator if storage is empty', () => {
      const storage = new SessionStorage(window.document);
      const iterator = storage[Symbol.iterator]();
      expect(iterator.next().done).toBeTruthy();
    });

    it('should return a value iterator if storage is not empty', () => {
      const storage = new SessionStorage(window.document);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const iterator = storage[Symbol.iterator]();
      let next = iterator.next();
      expect(next.done).toBeFalsy();
      expect(next.value).toBe('array');
      expect(next.value[0]).toEqual('foo');
      expect(next.value[1]).toEqual('bar');

      next = iterator.next();
      expect(next.done).toBeFalsy();
      expect(next.value[0]).toEqual('bar');
      expect(next.value[1]).toEqual('baz');
      expect(iterator.next().done).toBeTruthy();
    });
  });

  /**
   * Tests the `Storage#clear()` method.
   */
  describe('#clear()', () => {
    it('should remove all storage entries', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const storage = new SessionStorage(window.document);
      expect(storage.length).toEqual(2);

      storage.clear();
      expect(storage.length).toEqual(0);
    });
  });

  /**
   * Tests the `Storage#get()` method.
   */
  describe('#get()', () => {
    it('should properly get the storage entries', () => {
      const storage = new SessionStorage(window.document);
      expect(storage.get('foo')).toBeNull();
      expect(storage.get('foo', '123')).toEqual('123');

      sessionStorage.setItem('foo', 'bar');
      expect(storage.get('foo')).toEqual('bar');

      sessionStorage.setItem('foo', '123');
      expect(storage.get('foo')).toEqual('123');
    });
  });

  /**
   * Tests the `Storage#getObject()` method.
   */
  describe('#getObject()', () => {
    it('should properly get the deserialized storage entries', () => {
      const storage = new SessionStorage(window.document);
      expect(storage.getObject('foo')).toBeNull();
      expect(storage.getObject('foo', {key: 'value'})).toEqual({key: 'value'});

      sessionStorage.setItem('foo', '123');
      expect(storage.getObject('foo')).toEqual(123);

      sessionStorage.setItem('foo', '"bar"');
      expect(storage.getObject('foo')).toEqual('bar');

      sessionStorage.setItem('foo', '{"key": "value"}');
      expect(storage.getObject('foo')).toBe('object')
        .and.have.property('key).toEqual('value');
    });

    it('should return the default value if the value can\'t be deserialized', () => {
      const storage = new SessionStorage(window.document);
      sessionStorage.setItem('foo', 'bar');
      expect(storage.getObject('foo', 'defaultValue')).toEqual('defaultValue');
    });
  });

  /**
   * Tests the `Storage#has()` method.
   */
  describe('#has()', () => {
    it('should return `false` if the specified key is not contained', () => {
      expect(new SessionStorage(window.document).has('foo')).toBeFalsy();
    });

    it('should return `true` if the specified key is contained', () => {
      sessionStorage.setItem('foo', 'bar');

      const storage = new SessionStorage(window.document);
      expect(storage.has('foo')).toBeTruthy();
      expect(storage.has('bar')).toBeFalsy();
    });
  });

  /**
   * Tests the `Storage#remove()` method.
   */
  describe('#remove()', () => {
    it('should properly remove the storage entries', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const storage = new SessionStorage(window.document);
      expect(sessionStorage.getItem('foo')).toEqual('bar');

      storage.remove('foo');
      expect(sessionStorage.getItem('foo')).toBeNull();
      expect(sessionStorage.getItem('bar')).toEqual('baz');

      storage.remove('bar');
      expect(sessionStorage.getItem('bar')).toBeNull();
    });
  });

  /**
   * Tests the `Storage#set()` method.
   */
  describe('#set()', () => {
    it('should properly set the storage entries', () => {
      const storage = new SessionStorage(window.document);
      expect(sessionStorage.getItem('foo')).toBeNull();

      storage.set('foo', 'bar');
      expect(sessionStorage.getItem('foo')).toEqual('bar');

      storage.set('foo', '123');
      expect(sessionStorage.getItem('foo')).toEqual('123');
    });
  });

  /**
   * Tests the `Storage#setObject()` method.
   */
  describe('#setObject()', () => {
    it('should properly serialize and set the storage entries', () => {
      const storage = new SessionStorage(window.document);
      expect(sessionStorage.getItem('foo')).toBeNull();

      storage.setObject('foo', 123);
      expect(sessionStorage.getItem('foo')).toEqual('123');

      storage.setObject('foo', 'bar');
      expect(sessionStorage.getItem('foo')).toEqual('"bar"');

      storage.setObject('foo', {key: 'value'});
      expect(sessionStorage.getItem('foo')).toEqual('{"key":"value"}');
    });
  });
});
