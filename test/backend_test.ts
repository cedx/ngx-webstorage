import {MapBackend} from '../src/index';

/** Tests the [[MemoryBackend]] class. */
describe('MemoryBackend', () => {
  describe('#length', () => {
    it('should return zero for an empty backend', () => {
      expect(new MapBackend().length).toEqual(0);
    });

    it('should return the number of entries for a non-empty backend', () => {
      const backend = new MapBackend;
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');
      expect(backend.length).toEqual(2);
    });
  });

  describe('#clear()', () => {
    it('should remove all backend entries', () => {
      const backend = new MapBackend;
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');
      backend.clear();
      expect(backend.length).toEqual(0);
    });
  });

  describe('#getItem() / #setItem()', () => {
    it('should properly get and set the backend entries', () => {
      const backend = new MapBackend;
      expect(backend.getItem('foo')).toBeNull();
      backend.setItem('foo', 'bar');
      expect(backend.getItem('foo')).toEqual('bar');
      backend.setItem('foo', '123');
      expect(backend.getItem('foo')).toEqual('123');
    });
  });

  describe('#removeItem()', () => {
    it('should properly remove the backend entries', () => {
      const backend = new MapBackend;
      backend.setItem('foo', 'bar');
      backend.setItem('bar', 'baz');
      expect(backend.getItem('foo')).toEqual('bar');

      backend.removeItem('foo');
      expect(backend.getItem('foo')).toBeNull();
      expect(backend.getItem('bar')).toEqual('baz');

      backend.removeItem('bar');
      expect(backend.getItem('bar')).toBeNull();
    });
  });
});
