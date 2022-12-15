import { tournamentScraperMtgo } from './tournament-scraper.mtgo';

describe('Testing functions in tournament-scraper.mtgo', () => {
  test('Test tournamentScraperMtgo foor September 2022', async () => {
    const data = await tournamentScraperMtgo(9, 2022);

    expect(typeof data).toBe('object');
    expect(data.length).toBe(81);
  });
});
