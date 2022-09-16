/**
 * Node imports
 */
import { randomBytes } from 'node:crypto';

/**
 * Module imports
 */
import { JSDOM } from 'jsdom';

/**
 * Types
 */
import { Deck, Format, LevelOfPlay, Tournament } from '../../core/common.core';

/**
 * Application imports
 */

/**
 * Initialisation
 */

/**
 * Class
 */
export class MtgoScraper {
  private createTournamentData (name: string, totalPlayers: number, playedAtFrom: string): Tournament {
    const fileNameArr = name.split('.');
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

  private createDeckData (element: Element): Pick<Deck, 'name' | 'subId' | 'main' | 'side' | 'owner'> {
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

  private async getDataFromUrl(url: string): Promise<null | { name: string, data: string }> {
    const urlArrSegment = url.split('/');
    const endPart = urlArrSegment[urlArrSegment.length - 1];
    const randomHex = randomBytes(4).toString('hex');

      try {
        const fetched = await fetch(url);
        const data = await fetched.text();

        const fileName = `mtgo.${ endPart }.${ randomHex }.html`;

        return {
          name: fileName,
          data
        }
      } catch(err) {
        console.log(err);
        return null;
      }
  }

  private async parseMtgo (name: string, content: string): Promise<null | { tournamentData: Tournament, finalDeckLists: Array<Deck> }> {
    try {
      const data = new JSDOM(content).window.document;

      const allDeckLists = Array.from(data.querySelectorAll('.deck-group'));
      const dateFromADecklist = data.querySelector("div.title-deckicon > span.deck-meta");

      // @ts-ignore
      const currentDatePlayed = dateFromADecklist.children[1].textContent.split(' ').join('').split('on').reverse()[0].replaceAll('/', '-');

      const tournamentData: Tournament = this.createTournamentData(name, allDeckLists.length, currentDatePlayed);

      //createDeckData(allDeckLists[0]);
      const players = allDeckLists.map(deckList => this.createDeckData(deckList));

      let finalDeckLists: Array<Deck>;

      if (tournamentData.levelOfPlay !== 'league') {
        const allMetaData = data.querySelector("table.sticky-enabled") as Element;
        const tBody = Array.from(allMetaData.lastElementChild?.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement>);
        const finalMetaData = tBody.map(data => this.createMetaData(data));
        finalDeckLists = players.map((value, index) => {
          return {
            ...value,
            ...finalMetaData[index],
            tournamentName: tournamentData.name,
            playedAt: tournamentData.playedAt,
            format: tournamentData.format
          }
        });
      } else {
        finalDeckLists = players.map((data) => {
          return {
            ...data,
            tournamentName: tournamentData.name,
            playedAt: tournamentData.playedAt,
            format: tournamentData.format
          }
        });
      }

      return {
        tournamentData,
        finalDeckLists
      }
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  async run(url: string) {
    const dataFromUrl = await this.getDataFromUrl(url);
    if (dataFromUrl !== null) {
      return await this.parseMtgo(dataFromUrl.name, dataFromUrl.data);
    } else return null;
  }
}
