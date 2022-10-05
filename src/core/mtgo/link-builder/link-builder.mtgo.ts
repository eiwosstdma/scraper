/**
 * Node imports
 */

/**
 * Module imports
 */
import { JSDOM } from 'jsdom';

/**
 * Application imports
 */
import { IConfigurationLinker } from '../../types.core';
import { sleepUntil, customFetch } from '../../utilities.core';

/**
 * Initialisation
 */

/**
 * Functions
 */
export function linkGenerator(howManyDaysBackward: number, configuration?: IConfigurationLinker): Array<string> {
  const baseUrl = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/';
  const allFormat = configuration?.wantedFormat ?? [ 'vintage', 'legacy', 'modern', 'pioneer', 'pauper', 'standard' ];
  const allLevel = configuration?.wantedLevel ?? [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier' ];
  const currentDate = new Date();
  const allLinksArray: Array<string> = [];

  for (let i = 0; i <= howManyDaysBackward; i++) {
    const dateToScrap = new Date(currentDate.getTime() - (86400*1000) *i);
    const dayToScrap = ((dateToScrap.getUTCDate() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCDate() + 1) : dateToScrap.getUTCDate() + 1;
    const monthToScrap = ((dateToScrap.getUTCMonth() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCMonth() + 1) : dateToScrap.getUTCMonth() + 1;
    const yearToScrap = dateToScrap.getUTCFullYear();
    const dateToBeBuilt = `${ yearToScrap }-${ monthToScrap }-${ dayToScrap }`;

    const allLinks: Array<string> = [];

    allFormat.forEach(format => allLevel.forEach(level => {
      const url = `${ baseUrl }${ format }-${ level }-${ dateToBeBuilt }`;
      allLinks.push(url);
    }));

    allLinksArray.push(... allLinks);
  }

  return allLinksArray;
}

export async function checkLink(link: string, awaitFor?: number): Promise<string | null> {
  try {
    const result = await customFetch(link);
    const doc = new JSDOM(result).window.document;

    const isNotFound = doc.querySelector('.no-result');
    await sleepUntil(awaitFor ?? 500);
    if (isNotFound?.textContent?.replace(/\s/g, '') !== 'noresultfound') {
      return link;
    } else return null;
  } catch (err) {
    console.log(err)
    return null;
  }
}

export async function checkArrayOfLinks(links: Array<string>): Promise<(string | null)[]> {
  return Promise.all(links.map(link => checkLink(link, 600)));
}

export async function linkBuilderRUN(howMuchBackward: number, configuration?: IConfigurationLinker, arrOfLinks?: Array<string>): Promise<Array<string>> {
  if (arrOfLinks) {
    return (await checkArrayOfLinks(arrOfLinks)).filter(value => value !== null) as Array<string>;
  } else {
    const allTournamentLinks = linkGenerator(howMuchBackward, configuration);
    return (await checkArrayOfLinks(allTournamentLinks)).filter(value => value !== null) as Array<string>;
  }
}

