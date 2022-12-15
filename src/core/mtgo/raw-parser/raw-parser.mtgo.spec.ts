import { rawParserMtgo } from './raw-parser.mtgo';

describe('Testing rawParserMtgo', () => {
  test('Number of players for a given tournament', async () => {
    const data = await rawParserMtgo('https://www.mtgo.com/en/mtgo/decklist/modern-preliminary-2022-12-1412502845');

    expect(data.playersNumber).toBe(11);
    expect(data.playersName.includes('SuperCow12653')).toBe(true);
    expect(data.format).toBe('modern');
  });
});
