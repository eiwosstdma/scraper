/**
 * Node imports
 */
import { resolve } from 'node:path';
import { writeFile, readFile, rm } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

/**
 * Module imports
 */
import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

/**
 * Types
 */
import { CollectedTournament, Deck, Format, LevelOfPlay, Tournament } from '../core/common.core';

/**
 * Application imports
 */
import { CollectedModel } from '../models/collected.model';
import { DeckModel } from '../models/deck.model';
import { ReferenceModel } from '../models/reference.model';
import { TournamentModel } from '../models/tournament.model';

/**
 * Initialisations
 */
const sleep = promisify(setTimeout);
const loop = promisify(setInterval);

/**
 * Class
 */
export class ControllerMtgo {
  private async buildLinks(howManyDaysBackward: number): Promise<Array<Array<string>>> {
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
        const url = `${ baseUrl }${ format }-${ level }-${ dateToBeBuilt }`;
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
  }

  private howManyClicksWeNeed (untilFrom: number): number {
    return Math.ceil((untilFrom - 6) <= 0 ? 0 : (untilFrom - 6) / 4);
  }

  private saveTournaments (tournamentName: CollectedTournament) {
    const isTournamentAlreadyScrapped = CollectedModel.get(tournamentName.name);

    if (isTournamentAlreadyScrapped === null || isTournamentAlreadyScrapped === undefined) {
      CollectedModel.set(tournamentName);
    }
  }

  async managerMtgo (untilFrom: number) {
    const baseUrl = 'https://magic.wizards.com'
    const pathToSaveTournaments = resolve('./database/tournaments.html');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://magic.wizards.com/en/content/deck-lists-magic-online-products-game-info');

    const howManyClicksToGetAllLastTournaments = this.howManyClicksWeNeed(untilFrom);

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

    allLinks.forEach(tournament => this.saveTournaments);
  }

  private createTournament (fileName: string, totalPlayers: number, playedAtFrom: string): Tournament {
    const fileNameArr = fileName.split('.');
    const fileNameArrName = fileNameArr[1].split('-');

    fileNameArrName.pop();
    fileNameArrName.pop();
    fileNameArrName.pop();
    fileNameArrName.reverse();
    fileNameArrName.pop();
    fileNameArrName.reverse();

    const dateFrom = fileNameArr[1].split('-');

    return {
      publicId: fileNameArr[2],
      name: fileNameArr[1],
      postedAt: `${ dateFrom[dateFrom.length - 3] }-${ dateFrom[dateFrom.length - 2] }-${ dateFrom[dateFrom.length - 1] }`,
      playedAt: (fileNameArrName.toString() === 'league') ? `${ dateFrom[dateFrom.length - 3] }-${ dateFrom[dateFrom.length - 2] }-${ dateFrom[dateFrom.length - 1] }` : playedAtFrom,
      totalPlayer: totalPlayers,
      linkTo: `https://magic.wizards.com/en/articles/archive/mtgo-standings/${ fileNameArr[1] }`,
      format: fileNameArr[1].split('-')[0] as Format,
      organizer: 'wizard',
      platform: 'mtgo',
      levelOfPlay: fileNameArrName.toString().replace(',', '-') as LevelOfPlay,
    };
  }

  private createDeck (element: Element): Pick<Deck, 'name' | 'subId' | 'main' | 'side' | 'owner'> {
    const subIdName = element.getAttribute('subid');

    const textDeckList = element.querySelectorAll('div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-overview-container.sortedContainer > div.clearfix.element > span.row');
    let mainDeck = [];
    for (const text of textDeckList) {
      const newObj = {
        quantity: Number(text.children[0].innerHTML),
        name: text.children[1].children[0]?.innerHTML ?? text.children[1].innerHTML
      };

      mainDeck.push(newObj);
    }

    const sideDeckList = element.querySelectorAll('div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-sideboard-container.clearfix.element > span.row');
    let sideDeck = [];
    for (const text of sideDeckList) {
      const newObj = {
        quantity: Number(text.getElementsByClassName('card-count')[0].innerHTML),
        name: text.getElementsByClassName('card-name')[0].firstElementChild?.innerHTML ?? text.getElementsByClassName('card-name')[0]?.innerHTML
      };

      sideDeck.push(newObj);
    }

    const ownerName = element.id;

    return {
      name: 'unknown',
      owner: ownerName.replace('_', '').replace('-', ''),
      subId: subIdName as string,
      main: mainDeck,
      side: sideDeck
    }
  }

  private createMetaData (metaData: Element): Pick<Deck, 'rank' | 'point' | 'omwp' | 'gwp' | 'ogwp'> {
    return {
      rank: Number(metaData.children[0].innerHTML),
      point: Number(metaData.children[2].innerHTML),
      omwp: metaData.children[3].innerHTML,
      gwp: metaData.children[4].innerHTML,
      ogwp: metaData.children[5].innerHTML
    }
  }
  async parseMtgo (fileName: string)  {
    try {
      const filePath = resolve(`./database/temporary/${ fileName }`);
      const buffer = await readFile(filePath);
      const data = new JSDOM(buffer.toString()).window.document;

      const allDeckLists = Array.from(data.querySelectorAll('.deck-group'));
      const dateFromADecklist = data.querySelector("div.title-deckicon > span.deck-meta");

      // @ts-ignore
      const currentDatePlayed = dateFromADecklist.children[1].textContent.split(' ').join('').split('on').reverse()[0].replaceAll('/', '-');

      const tournamentData: Tournament = this.createTournament(fileName, allDeckLists.length, currentDatePlayed);

      //createDeck(allDeckLists[0]);
      const players = allDeckLists.map(deckList => this.createDeck(deckList));

      let final: Array<Deck>;

      if (tournamentData.levelOfPlay !== 'league') {
        const allMetaData = data.querySelector("table.sticky-enabled") as Element;
        const tBody = Array.from(allMetaData.lastElementChild?.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement>);
        const finalMetaData = tBody.map(data => this.createMetaData(data));
        final = players.map((value, index) => {
          return {
            ...value,
            ...finalMetaData[index],
            tournamentName: tournamentData.name,
            playedAt: tournamentData.playedAt,
            format: tournamentData.format
          }
        });
      } else {
        final = players.map((data) => {
          return {
            ...data,
            tournamentName: tournamentData.name,
            playedAt: tournamentData.playedAt,
            format: tournamentData.format
          }
        });
      }

      TournamentModel.set(tournamentData);
      final.forEach((deck) => DeckModel.set(deck));
      await rm(filePath);

      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }


  private async getScrape(url: string): Promise<Boolean> {
    const urlArrSegment = url.split('/');
    const endPart = urlArrSegment[urlArrSegment.length - 1];
    const randomHex = randomBytes(4).toString('hex');

    const isTournamentAlreadyScraped = ReferenceModel.get(endPart);

    if (isTournamentAlreadyScraped === undefined) {
      try {
        const fetched = await fetch(url);
        const data = await fetched.text();

        const fileName = `mtgo.${ endPart }.${ randomHex }.html`;
        const pathToFile = resolve(`./database/temporary/${ fileName }`);

        ReferenceModel.set(endPart, randomHex);
        await writeFile(pathToFile, data);
      } catch(err) {
        console.log(err);
        return false;
      }
      return true;
    } else return false;
  }

  async run(howMuchTournaments?: number): Promise<void> {
    const functionForLoop = async(howMuch: number) => {
      if (howMuch <= 25) {
        await this.managerMtgo(howMuch);
      } else {
        await this.buildLinks(howMuch);
      }
    };

    await loop(((24 * 60 * 60)*1000), functionForLoop(howMuchTournaments ?? 15));
  }
}
