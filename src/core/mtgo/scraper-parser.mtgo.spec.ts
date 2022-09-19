import { ScraperParserMtgo } from './scraper-parser.mtgo';

describe('Testing ScraperParserMtgo', () => {
  const scraper = new ScraperParserMtgo();
  const promisedData = scraper.run('https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-15');


  test('Verify name, format and total players of metadata of the tournament.',  async () => {
    const data = await promisedData;

    expect(data?.tournamentData.name).toEqual('modern-preliminary-2022-09-15');
    expect(data?.tournamentData.format).toEqual('modern');
    expect(data?.tournamentData.totalPlayer).toEqual(10);
  });

  test('Verify point and owner name of the first decklist',  async () => {
    const data = await promisedData;

    expect(data?.finalDeckLists[0].owner).toEqual('rastaf');
    expect(data?.finalDeckLists[0].point).toEqual(12);
  });

  test('Verify point and owner name of the seventh decklist',  async () => {
    const data = await promisedData;

    expect(data?.finalDeckLists[6].owner).toEqual('boytriton');
    expect(data?.finalDeckLists[6].owner).toEqual('boytriton');
  });
});