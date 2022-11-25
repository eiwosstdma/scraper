/**
 * Node imports
 */

/**
 * Module imports
 */
import { JSDOM } from 'jsdom';

/**
 * Types
 */
import { IDeck, TFormat, TLevelOfPlay, ITournament, IConfigurationLinker } from '../../types.core';

/**
 * Application imports
 */
import { generate12LString, customFetch } from '../../utilities.core';
import { sleepUntil } from '../../utilities.core';
import { generateLinksFrom } from '../link-builder/link-builder.mtgo';

/**
 * Initialisation
 */

/**
 * Class
 */
function createTournamentData (name: string, totalPlayers: number, playedAtFrom: string): ITournament {
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
    format: fileNameArr[1].split('-')[0] as TFormat,
    organizer: 'wizard',
    platform: 'mtgo',
    levelOfPlay: fileNameArrName.toString().replace(',', '-') as TLevelOfPlay,
  };
}

function createDeckData (element: Element): Pick<IDeck, 'name' | 'subId' | 'main' | 'side' | 'owner'> {
  const subIdName = element.getAttribute('subid');

  const textDeckList = element.querySelectorAll('div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-overview-container.sortedContainer > div.clearfix.element > span.row');
  const mainDeck = [];
  for (const text of textDeckList) {
    const newObj = {
      quantity: Number(text.children[0].innerHTML),
      name: text.children[1].children[0]?.innerHTML ?? text.children[1].innerHTML
    };

    mainDeck.push(newObj);
  }

  const sideDeckList = element.querySelectorAll('div.toggle-text.toggle-subnav > div.deck-list-text > div.sorted-by-sideboard-container.clearfix.element > span.row');
  const sideDeck = [];
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
  };
}

function createMetaData (metaData: Element): Pick<IDeck, 'rank' | 'point' | 'omwp' | 'gwp' | 'ogwp'> {
  return {
    rank: Number(metaData.children[0].innerHTML),
    point: Number(metaData.children[2].innerHTML),
    omwp: metaData.children[3].innerHTML,
    gwp: metaData.children[4].innerHTML,
    ogwp: metaData.children[5].innerHTML
  };
}

export async function getDataFromUrl(url: string): Promise<null | { name: string, data: string }> {
  const urlArrSegment = url.split('/');
  const endPart = urlArrSegment[urlArrSegment.length - 1];
  const randomHex = generate12LString();

  try {
    const data = await customFetch(url);
    await sleepUntil(100);

    const fileName = `mtgo.${ endPart }.${ randomHex }.html`;

    return {
      name: fileName,
      data
    };
  } catch(err) {
    console.log(err);
    return null;
  }
}

export async function parseMtgo (name: string, content: string): Promise<null | { tournamentData: ITournament, finalDeckLists: Array<IDeck> }> {
  try {
    const data = new JSDOM(content).window.document;

    const allDeckLists = Array.from(data.querySelectorAll('.deck-group'));
    const dateFromADecklist = data.querySelector('div.title-deckicon > span.deck-meta');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentDatePlayed = dateFromADecklist.children[1].textContent.split(' ').join('').split('on').reverse()[0].replaceAll('/', '-');

    const tournamentData: ITournament = createTournamentData(name, allDeckLists.length, currentDatePlayed);

    //createDeckData(allDeckLists[0]);
    const players = allDeckLists.map(deckList => createDeckData(deckList));

    let finalDeckLists: Array<IDeck>;

    if (tournamentData.levelOfPlay !== 'league') {
      const allMetaData = data.querySelector('table.sticky-enabled') as Element;
      const tBody = Array.from(allMetaData.lastElementChild?.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement>);
      const finalMetaData = tBody.map(data => createMetaData(data));
      finalDeckLists = players.map((value, index) => {
        return {
          ...value,
          ...finalMetaData[index],
          tournamentName: tournamentData.name,
          playedAt: tournamentData.playedAt,
          format: tournamentData.format
        };
      });
    } else {
      finalDeckLists = players.map((data) => {
        return {
          ...data,
          tournamentName: tournamentData.name,
          playedAt: tournamentData.playedAt,
          format: tournamentData.format
        };
      });
    }

    return {
      tournamentData,
      finalDeckLists
    };
  } catch(err) {
    console.log(err);
    return null;
  }
}

export async function scraperParserRUN(url: string): Promise<{ tournamentData: ITournament, finalDeckLists: Array<IDeck> } | null> {
  const dataFromUrl = await getDataFromUrl(url);
  if (dataFromUrl !== null) {
    return await parseMtgo(dataFromUrl.name, dataFromUrl.data);
  } else return null;
}

export async function dataOfTheDay(configuration?: IConfigurationLinker): Promise<({tournamentData: ITournament, finalDeckLists: IDeck[]} | null)[]> {
  const links = generateLinksFrom(Date.now(), configuration);
  const awaitedBulkData = links.map(link => scraperParserRUN(link));
  return Promise.all(awaitedBulkData);
}
