/**
 * Imports
 */
import { JSDOM } from 'jsdom';
import { baseURLMTGODeckLists, customFetch } from '../../utilities.core';

/**
 * Exports
 */
export const tournamentScraperMtgo = async (month?: number, year?: number) => {
  const currentMonth = month ?? (new Date().getMonth()) +1;
  const currentYear = year ?? new Date().getFullYear();

  const url = baseURLMTGODeckLists() + currentYear + '/' + currentMonth;
  const data = await customFetch(url);

  const fromDoc = new JSDOM(data).window.document;
  const listOfElements = Array.from(fromDoc.querySelectorAll('.decklists-item'));

  return listOfElements.map(element => element.firstElementChild?.getAttribute('href'));
};
