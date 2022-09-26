import { Filter, Deck } from '../common.core';

export const filtering = (deck: Deck, filter: Filter): Deck => {
  if (deck.format !== filter.format) return deck;

  let includingValue = 0;
  let excludingValue = 0;

  for (const card of deck.main) {
    const isIncluded = filter.includes.find(value => value.toLowerCase() === card.name.toLowerCase());
    if (filter.excludes.length >= 1) {
      const isExcluded = filter.excludes.find(value => value.toLowerCase() === card.name.toLowerCase());
      if (isExcluded !== undefined) excludingValue++;

    }

    if (isIncluded !== undefined) includingValue++;
  }

  if (excludingValue >= 1) {
    return deck;
  }

  if (includingValue >= 2) {
    deck.name = filter.name;
    return deck;
  }

  return deck;
};
