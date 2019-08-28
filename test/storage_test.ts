import {SessionStorage} from '../src/index';

/** Tests the [[WebStorage]] class. */
describe('WebStorage', () => {
  beforeEach(() => sessionStorage.clear());

  describe('#keys', () => {
    it('should return an empty array for an empty storage', () => {
      expect(new SessionStorage(document).keys.length).toEqual(0);
    });

    it('should return the list of keys for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const {keys} = new SessionStorage(document);
      expect(keys.length).toEqual(2);
      expect(keys).toContain('foo');
      expect(keys).toContain('bar');
    });
  });

  describe('#length', () => {
    it('should return zero for an empty storage', () => {
      expect(new SessionStorage(document).length).toEqual(0);
    });

    it('should return the number of entries for a non-empty storage', () => {
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');
      expect(new SessionStorage(document).length).toEqual(2);
    });
  });

  describe('#onChanges', () => {
    it('should trigger an event when a value is added', done => {
      const storage = new SessionStorage(document);
      const subscription = storage.onChanges.subscribe(changes => {
        expect(Object.keys(changes)).toEqual(['foo']);
        expect(changes.foo.currentValue).toEqual('bar');
        expect(changes.foo.previousValue).toBeUndefined();
        done();
      }, done);

      storage.set('foo', 'bar');
      subscription.unsubscribe();
    });

    it('should trigger an event when a value is updated', done => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');

      const subscription = storage.onChanges.subscribe(changes => {
        expect(Object.keys(changes)).toEqual(['foo']);
        expect(changes.foo.currentValue).toEqual('baz');
        expect(changes.foo.previousValue).toEqual('bar');
        done();
      }, done);

      storage.set('foo', 'baz');
      subscription.unsubscribe();
    });

    it('should trigger an event when a value is removed', done => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');

      const subscription = storage.onChanges.subscribe(changes => {
        expect(Object.keys(changes)).toEqual(['foo']);
        expect(changes.foo.currentValue).toBeUndefined();
        expect(changes.foo.previousValue).toEqual('bar');
        done();
      }, done);

      storage.remove('foo');
      subscription.unsubscribe();
    });

    it('should trigger an event when the storage is cleared', done => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const subscription = storage.onChanges.subscribe(changes => {
        const keys = Object.keys(changes);
        expect(keys.length).toEqual(2);
        expect(keys).toContain('foo');
        expect(keys).toContain('bar');

        expect(changes.foo.currentValue).toBeUndefined();
        expect(changes.foo.previousValue).toEqual('bar');
        expect(changes.bar.currentValue).toBeUndefined();
        expect(changes.bar.previousValue).toEqual('baz');
        done();
      }, done);

      storage.clear();
      subscription.unsubscribe();
    });
  });

  describe('#[Symbol.iterator]()', () => {
    it('should return a done iterator if storage is empty', () => {
      const storage = new SessionStorage(document);
      const iterator = storage[Symbol.iterator]();
      expect(iterator.next().done).toBe(true);
    });

    it('should return a value iterator if storage is not empty', () => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');

      const iterator = storage[Symbol.iterator]();
      const values = [];

      let next = iterator.next();
      expect(next.done).toBe(false);
      values.push(next.value);
      next = iterator.next();
      expect(next.done).toBe(false);
      values.push(next.value);
      expect(iterator.next().done).toBe(true);

      expect(values).toContain(['foo', 'bar']);
      expect(values).toContain(['bar', 'baz']);
    });
  });

  describe('#clear()', () => {
    it('should remove all storage entries', () => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');
      expect(storage.length).toEqual(2);

      storage.clear();
      expect(storage.length).toEqual(0);
    });
  });

  describe('#get()', () => {
    it('should properly get the storage entries', () => {
      const storage = new SessionStorage(document);
      expect(storage.get('foo')).toBeUndefined();
      expect(storage.get('foo', '123')).toEqual('123');

      sessionStorage.setItem('foo', 'bar');
      expect(storage.get('foo')).toEqual('bar');

      sessionStorage.setItem('foo', '123');
      expect(storage.get('foo')).toEqual('123');
    });
  });

  describe('#getObject()', () => {
    it('should properly get the deserialized storage entries', () => {
      const storage = new SessionStorage(document);
      expect(storage.getObject('foo')).toBeUndefined();
      expect(storage.getObject('foo', {key: 'value'})).toEqual({key: 'value'});

      sessionStorage.setItem('foo', '123');
      expect(storage.getObject('foo')).toEqual(123);

      sessionStorage.setItem('foo', '"bar"');
      expect(storage.getObject('foo')).toEqual('bar');

      sessionStorage.setItem('foo', '{"key": "value"}');
      expect(storage.getObject('foo')).toEqual({key: 'value'});
    });

    it('should return the default value if the value can\'t be deserialized', () => {
      sessionStorage.setItem('foo', 'bar');
      expect(new SessionStorage(document).getObject('foo', 'defaultValue')).toEqual('defaultValue');
    });
  });

  describe('#has()', () => {
    it('should return `false` if the specified key is not contained', () => {
      expect(new SessionStorage(document).has('foo')).toBe(false);
    });

    it('should return `true` if the specified key is contained', () => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');
      expect(storage.has('foo')).toBe(true);
      expect(storage.has('bar')).toBe(false);
    });
  });

  describe('#remove()', () => {
    it('should properly remove the storage entries', () => {
      const storage = new SessionStorage(document);
      sessionStorage.setItem('foo', 'bar');
      sessionStorage.setItem('bar', 'baz');
      expect(sessionStorage.getItem('foo')).toEqual('bar');

      storage.remove('foo');
      expect(sessionStorage.getItem('foo')).toBeNull();
      expect(sessionStorage.getItem('bar')).toEqual('baz');

      storage.remove('bar');
      expect(sessionStorage.getItem('bar')).toBeNull();
    });
  });

  describe('#set()', () => {
    it('should properly set the storage entries', () => {
      const storage = new SessionStorage(document);
      expect(sessionStorage.getItem('foo')).toBeNull();
      storage.set('foo', 'bar');
      expect(sessionStorage.getItem('foo')).toEqual('bar');
      storage.set('foo', '123');
      expect(sessionStorage.getItem('foo')).toEqual('123');
    });
  });

  describe('#setObject()', () => {
    it('should properly serialize and set the storage entries', () => {
      const storage = new SessionStorage(document);
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
