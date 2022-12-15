/**
 * Node imports
 */


/**
 * Module imports
 */
import { JSDOM } from 'jsdom';
import { customFetch, generateUniqueID } from '../../utilities.core';
import { TFormat, MetaData } from '../../types.core';

/**
 * Types
 */

/**
 * Application imports
 */

/**
 * Gives you back an object with;
 * rawBinary is the HTML of the page in binary.
 * rawResults is the result object that lives in the binary, which gives you players, decklists, results, and standings
 */
export const rawParserMtgo = async (url: string): Promise<MetaData> => {
  const rawBinary = await customFetch(url);
  const window = new JSDOM(rawBinary).window;
  const data = window.document;

  const title = data.querySelector('#decklist-item > div.site-content > div.container-page-fluid.decklist-item-page > h1')?.textContent as string;
  const postedAt = data.querySelector('#decklist-item > div.site-content > div.container-page-fluid.decklist-item-page > p')?.textContent as string;
  const name = (new URL(url)).pathname.split('/').at(-1) as string;
  const format = name?.split('-')[0];
  const rawDeckLists = window.document.scripts;
  const rawResults = rawDeckLists[1]?.textContent?.split('window.MTGO.decklists.data =')[1].split(';')[0] as string;
  const deckListInterpreted = (JSON.parse(rawResults as string));
  const playersName = deckListInterpreted?.decks.map((deckList: any) => deckList.player);

  return {
    title,
    postedAt,
    name,
    playersNumber: deckListInterpreted?.decks.length,
    playersName,
    uniqueID: (await generateUniqueID(url)) as string,
    format: format as TFormat,
    rawResults,
    rawBinary
  };
};
