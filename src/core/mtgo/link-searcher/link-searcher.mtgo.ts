/**
 * Imports
 */
import { JSDOM } from 'jsdom';
import { baseURLMTGODeckLists, customFetch } from '../../utilities.core';
import { IConfigurationLinker } from '../../types.core';

/**
 * Exports
 */
export const getDataFromYearMonth = async (monthInNumber?: number, yearInNumber?: number) => {
  const month = monthInNumber ?? (new Date().getMonth()) +1;
  const year = yearInNumber ?? new Date().getFullYear();

  const linkToScrap = baseURLMTGODeckLists() + year + '/' + month;

  return await customFetch(linkToScrap);
};

export const extractLinks = (rawData: string) => {
  const data = new JSDOM(rawData).window.document;
  const decklistItemLists = Array.from(data.querySelectorAll('.decklists-item'));

  return decklistItemLists.map((element) => element.firstElementChild?.getAttribute('href'));
};
