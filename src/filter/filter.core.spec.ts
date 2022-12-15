import { Deck, Filter } from '../core/definitions.core';
import { filtering } from './filter.core';

describe('Testing filter.core.ts functions', () => {
  const newFilter = new Filter({
    format: 'modern',
    name: 'URx Murktide',
    includes: [ 'Murktide regent', 'Ragavan, nimble pilferer' ],
    excludes: []
  });

  test('Test filtering function - should return null', () => {
    const neoDeck = new Deck({});
    const result = filtering(neoDeck, newFilter);
    expect(result).toBeNull();
  });

  test('Test filtering cuntion - should return "URx Murktide"', () => {
    const newDeck = new Deck({ format: 'modern', main: [ { name: 'Murktide regent', quantity: 1 }, { name: 'Ragavan, nimble pilferer', quantity: 1 } ] });
    const result = filtering(newDeck, newFilter);
    expect(result).toBe('URx Murktide');
  });
});
