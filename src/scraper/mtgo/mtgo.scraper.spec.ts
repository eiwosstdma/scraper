import { MtgoScraper } from './mtgo.scraper';

describe('Testing MtgoScraper', () => {
  const scraper = new MtgoScraper();

  test('mtgo.scraper should return the tournament metadata',  async () => {
    const data = await scraper.run('https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-15');
    expect(data?.tournamentData.name).toEqual('modern-preliminary-2022-09-15');
    expect(data?.tournamentData.format).toEqual('modern');
    expect(data?.tournamentData.totalPlayer).toEqual(10);
  });
});