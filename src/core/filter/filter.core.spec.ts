import { Deck, Filter } from '../common.core';
import { filtering } from './filter.core';

describe('Testing filtering function', () => {
  test('Verify that the deck includes at least two cards', () => {
    const urXFilter: Filter = {
      format: 'modern',
      name: 'URx',
      includes: [ 'Murktide regent', 'Ragavan, Nimble Pilferer', 'Spirebluff Canal', 'Counterspell' ],
      excludes: []
    };

    const urXExample: Deck = {
      tournamentName: '',
      playedAt: '',
      postedAt: '',
      name: '',
      subId: '',
      owner: '',
      format: 'modern',
      main: [
        {
          name: 'Ragavan, Nimble Pilferer',
          quantity: 4
        },
        {
          name: 'Murktide regent',
          quantity: 3
        }
      ],
      side: []
    };

    const filtered = filtering(urXExample, urXFilter);
    expect(filtered.name).toBe('URx');
  });

  test('Verify that the deck does not name it, because of excludes', () => {
    const urXFilter: Filter = {
      format: 'modern',
      name: 'URx',
      includes: [ 'Murktide regent', 'Ragavan, Nimble Pilferer', 'Spirebluff Canal', 'Counterspell' ],
      excludes: [ "Death's shadow" ]
    };

    const urXExample: Deck = {
      tournamentName: '',
      playedAt: '',
      postedAt: '',
      name: 'unknown',
      subId: '',
      owner: '',
      format: 'modern',
      main: [
        {
          name: 'Ragavan, Nimble Pilferer',
          quantity: 4
        },
        {
          name: 'Murktide regent',
          quantity: 3
        },
        {
          name: "Death's shadow",
          quantity: 3
        }
      ],
      side: []
    };

    const filtered = filtering(urXExample, urXFilter);
    expect(filtered.name).toBe('unknown');
  });
});
