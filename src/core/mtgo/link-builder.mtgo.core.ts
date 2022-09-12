import { CollectedModel } from '../../models/collected.model';
import { Format } from '../common.core';


export const linkBuilderMtgo = async (howManyDaysBackward: number) => {
  const baseUrl = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/';
  const allFormat = [ 'vintage', 'legacy', 'modern', 'pioneer', 'pauper', 'standard' ];
  const allLevel = [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier' ];
  const currentDate = new Date();
  const allLinksArray: Array<Array<string>> = [];

  for (let i = 0; i <= howManyDaysBackward; i++) {
    const dateToScrap = new Date(currentDate.getTime() - (86400*1000) *i);
    const dayToScrap = ((dateToScrap.getUTCDate() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCDate() + 1) : dateToScrap.getUTCDate() + 1;
    const monthToScrap = ((dateToScrap.getUTCMonth() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCMonth() + 1) : dateToScrap.getUTCMonth() + 1;
    const yearToScrap = dateToScrap.getUTCFullYear();
    const dateToBeBuilt = `${ yearToScrap }-${ monthToScrap }-${ dayToScrap }`;

    const allLinks: Array<string> = [];

    allFormat.forEach(format => allLevel.forEach(level => {
      const url = `${baseUrl}${ format }-${ level }-${ dateToBeBuilt }`;
      allLinks.push(url);
    }));

    allLinks.forEach((value, index, array) => {
      const endPart = value.split('/')[value.split('/').length - 1];
      const result = CollectedModel.get(endPart);

      if (result === undefined) {
        array.splice(index, 1);
      }
    });

    allLinksArray.push(allLinks);
  }

  return allLinksArray;
};
