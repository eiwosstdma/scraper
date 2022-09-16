// /**
//  * Node imports
//  */
// import { resolve } from 'node:path';
// import { promisify } from 'node:util';
//
// /**
//  * Module imports
//  */
// import { JSDOM } from 'jsdom';
// import puppeteer from 'puppeteer';
//
// /**
//  * Application imports
//  */
// import { CollectedModel } from '../models/collected.model';
// import { CollectedTournament } from '../core/common.core';
//
// /**
//  * Initialisation
//  */
// const sleep = promisify(setTimeout);
//
// export class MtgoManager {
//   async linkBuilder(howManyDaysBackward: number) {
//     const baseUrl = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/';
//     const allFormat = [ 'vintage', 'legacy', 'modern', 'pioneer', 'pauper', 'standard' ];
//     const allLevel = [ 'league', 'preliminary', 'challenge', 'showcase-challenge', 'super-qualifier' ];
//     const currentDate = new Date();
//     const allLinksArray: Array<Array<string>> = [];
//
//     for (let i = 0; i <= howManyDaysBackward; i++) {
//       const dateToScrap = new Date(currentDate.getTime() - (86400*1000) *i);
//       const dayToScrap = ((dateToScrap.getUTCDate() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCDate() + 1) : dateToScrap.getUTCDate() + 1;
//       const monthToScrap = ((dateToScrap.getUTCMonth() + 1).toString().length === 1) ? '0' + (dateToScrap.getUTCMonth() + 1) : dateToScrap.getUTCMonth() + 1;
//       const yearToScrap = dateToScrap.getUTCFullYear();
//       const dateToBeBuilt = `${ yearToScrap }-${ monthToScrap }-${ dayToScrap }`;
//
//       const allLinks: Array<string> = [];
//
//       allFormat.forEach(format => allLevel.forEach(level => {
//         const url = `${baseUrl}${ format }-${ level }-${ dateToBeBuilt }`;
//         allLinks.push(url);
//       }));
//
//       allLinks.forEach((value, index, array) => {
//         const endPart = value.split('/')[value.split('/').length - 1];
//         const result = CollectedModel.get(endPart);
//
//         if (result === undefined) {
//           array.splice(index, 1);
//         }
//       });
//
//       allLinksArray.push(allLinks);
//     }
//
//     return allLinksArray;
//   }
//
//   private async checkLinkBuilderLinks(aLink: string) {
//     const fetchFromLink = await fetch(aLink);
//
//   }
//
//   private howManyClicksWeNeed (untilFrom: number): number {
//     return Math.ceil((untilFrom - 6) <= 0 ? 0 : (untilFrom - 6) / 4);
//   }
//
//   private saveTournament (tournamentName: CollectedTournament) {
//     const isTournamentAlreadyScrapped = CollectedModel.get(tournamentName.name);
//
//     if (isTournamentAlreadyScrapped === null || isTournamentAlreadyScrapped === undefined) {
//       CollectedModel.set(tournamentName);
//     }
//   }
//
//   async linkScraper(untilFrom: number) {
//     const baseUrl = 'https://magic.wizards.com'
//     const pathToSaveTournaments = resolve('./database/tournaments.html');
//
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://magic.wizards.com/en/content/deck-lists-magic-online-products-game-info');
//
//     const howManyClicksToGetAllLastTournaments = this.howManyClicksWeNeed(untilFrom);
//
//     if (howManyClicksToGetAllLastTournaments >= 1) {
//       for (let i = 0; i < howManyClicksToGetAllLastTournaments; i++) {
//         await page.click('#mtgo-decklists > div.see-more.see-more-article-listing-section > p > a');
//         await sleep(2000);
//       }
//     }
//
//     const data = await page.$eval('div.articles-listing', data => data.innerHTML);
//     await browser.close();
//
//     const dataHtml = Array.from(new JSDOM(data).window.document.querySelectorAll('div.article-item-extended'));
//
//     const allLinks = dataHtml.map((data): CollectedTournament => {
//       const endUrl = data?.getElementsByTagName('a')?.item(0)?.getAttribute('href') as string;
//       const link = 'https://magic.wizards.com' + endUrl;
//       const lengthEndUrl = endUrl.split('/').length
//
//       return {
//         name: endUrl.split('/')[lengthEndUrl - 1],
//         linkTo: link
//       }
//     });
//
//     allLinks.forEach(tournament => this.saveTournament(tournament));
//   }
// }
