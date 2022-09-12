import { resolve } from 'node:path';
import puppeteer from 'puppeteer';
import { promisify } from 'util';
import { JSDOM } from 'jsdom';
import { CollectedTournament } from '../common.core';
import { CollectedModel } from '../../models/collected.model';


const sleep = promisify(setTimeout);

const howManyClicksWeNeed = (untilFrom: number): number => Math.ceil((untilFrom - 6) <= 0 ? 0 : (untilFrom - 6)/4);

const saveTournaments = (tournamentName: CollectedTournament) => {
  const isTournamentAlreadyScrapped = CollectedModel.get(tournamentName.name);

  if (isTournamentAlreadyScrapped === null || isTournamentAlreadyScrapped === undefined) {
    CollectedModel.set(tournamentName);
  }
};

export const managerMtgo = async (untilFrom: number) => {
  const baseUrl = 'https://magic.wizards.com'
  const pathToSaveTournaments = resolve('./database/tournaments.html');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://magic.wizards.com/en/content/deck-lists-magic-online-products-game-info');

  const howManyClicksToGetAllLastTournaments = howManyClicksWeNeed(untilFrom);

  if (howManyClicksToGetAllLastTournaments >= 1) {
    for (let i = 0; i < howManyClicksToGetAllLastTournaments; i++) {
      await page.click('#mtgo-decklists > div.see-more.see-more-article-listing-section > p > a');
      await sleep(2000);
    }
  }

  const data = await page.$eval('div.articles-listing', data => data.innerHTML);
  await browser.close();

  const dataHtml = Array.from(new JSDOM(data).window.document.querySelectorAll('div.article-item-extended'));

  const allLinks = dataHtml.map((data): CollectedTournament => {
    const endUrl = data?.getElementsByTagName('a')?.item(0)?.getAttribute('href') as string;
    const link = 'https://magic.wizards.com' + endUrl;
    const lengthEndUrl = endUrl.split('/').length

    return {
      name: endUrl.split('/')[lengthEndUrl - 1],
      linkTo: link
    }
  });

  allLinks.forEach(tournament => saveTournaments);
};

export const run = async (untilFrom: number) => {
  setInterval(async () => await managerMtgo(untilFrom), 2160000);
};
