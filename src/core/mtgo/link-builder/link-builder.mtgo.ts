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
import { ConfigurationLinker } from '../../common.core';
import { sleepUntil } from '../../utilities.core';

/**
 * Initialisation
 */

/**
 * Class
 */
export class LinkBuilderMtgo {
  protected linkBuilder(howManyDaysBackward: number, configuration?: ConfigurationLinker) {
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

  protected async checkLink(link: string): Promise<string | null> {
    try {
      const data = await fetch(link);
      const result = await data.text();
      const doc = new JSDOM(result).window.document;

      const isNotFound = doc.querySelector('.no-result');
      await sleepUntil(100);
      if (isNotFound?.textContent?.replace(/\s/g, '') !== 'noresultfound') {
        return link;
      } else return null;
    } catch (err) {
      console.log(err)
      return null;
    }
  }

  protected async checkArrayOfLinks(links: Array<string>) {
    return Promise.all(links.map(link => this.checkLink(link)));
  }

  async run(howMuchBackward: number, configuration?: ConfigurationLinker) {
    const allTournamentLinks = this.linkBuilder(howMuchBackward, configuration);
    return (await this.checkArrayOfLinks(allTournamentLinks)).filter(value => value !== null) as Array<string>;
  }
}
