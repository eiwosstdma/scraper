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
import { sleepUntil, customFetch, baseURLMTGOWebsite } from '../../utilities.core';

/**
 * Initialisation
 */

/**
 * Functions
 */
export function timeIntoDate(dayInMilli?: number) {
  const dateTo = new Date(dayInMilli ?? new Date().getTime());

  const month = (dateTo.getUTCMonth() + 1).toString();
  const day = dateTo.getUTCDate().toString();

  const theYear = dateTo.getFullYear();
  const theMonth = month.length === 1 ? '0' + month : month;
  const theDay = day.length === 1 ? '0' + day : day;


  return `${theYear}-${theMonth}-${theDay}`;
}

export function linkGenerator(howManyDaysBackward: number, configuration?: IConfigurationLinker): Array<string> {
  const baseUrl = baseURLMTGOWebsite();
  const allFormat = configuration?.wantedFormat ?? [ 'vintage', 'legacy', 'modern', 'pioneer', 'pauper', 'standard' ];
  const allLevel = configuration?.wantedLevel ?? [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier' ];
  const currentDate = new Date();
  const allLinksArray: Array<string> = [];

  for (let i = 0; i <= howManyDaysBackward; i++) {
    const dateToScrap = new Date(currentDate.getTime() - (86400*1000) *i);
    const dateToBeBuilt = timeIntoDate(dateToScrap.getTime());

    const allLinks: Array<string> = [];

    allFormat.forEach(format => allLevel.forEach(level => {
      const url = `${ baseUrl }${ format }-${ level }-${ dateToBeBuilt }`;
      allLinks.push(url);
    }));

    allLinksArray.push(... allLinks);
  }

  return allLinksArray;
}

export function generateLinksFrom(fromTheDay: number, configuration?: IConfigurationLinker): Array<string> {
  const baseUrl = baseURLMTGOWebsite();
  const allFormat = configuration?.wantedFormat ?? [ 'vintage', 'legacy', 'modern', 'pioneer', 'pauper', 'standard' ];
  const allLevel = configuration?.wantedLevel ?? [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier' ];

  const allLinksArray: Array<string> = [];

  const dateToScrap = new Date(fromTheDay);
  const dateToBeBuilt = timeIntoDate(dateToScrap.getTime());

  const allLinks: Array<string> = [];

  allFormat.forEach(format => allLevel.forEach(level => {
    const url = `${ baseUrl }${ format }-${ level }-${ dateToBeBuilt }`;
    allLinks.push(url);
  }));

  allLinksArray.push(... allLinks);


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

export async function checkArrayOfLinks(links: Array<string>, awaitFor?: number): Promise<(string | null)[]> {
  return Promise.all(links.map(link => checkLink(link, awaitFor ?? 500)));
}

export async function linkBuilderRUN(howMuchBackward: number, configuration?: IConfigurationLinker, arrOfLinks?: Array<string>): Promise<Array<string>> {
  if (arrOfLinks) {
    return (await checkArrayOfLinks(arrOfLinks)).filter(value => value !== null) as Array<string>;
  } else {
    const allTournamentLinks = linkGenerator(howMuchBackward, configuration);
    return (await checkArrayOfLinks(allTournamentLinks)).filter(value => value !== null) as Array<string>;
  }
}

