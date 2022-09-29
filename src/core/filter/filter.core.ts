import { IFilter, IDeck } from '../types.core';

export const filtering = (deck: IDeck, filter: IFilter): IFilter['name'] | null => {
  if (deck.format !== filter.format) return null;

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
    return filter.name;
  }

  if (includingValue >= 2) {
    deck.name = filter.name;
    return filter.name;
  }

  return filter.name;
};
