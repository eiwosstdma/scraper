import { getDataFromUrl, parseMtgo, scraperParserRUN } from './scraper-parser.mtgo';

describe('Testing scraper-parser.mtgo.ts functions', () => {
  const realLinkStd = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-league-2022-09-29';
  const fakeLinkStd = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-league-2020-09-29';
  const expectData = getDataFromUrl(realLinkStd);
  const expectNull = getDataFromUrl(fakeLinkStd);

  test('Test getDataFromUrl', async () => {
    const rData = await expectData;

    expect(rData !== null).toBeTruthy();
  });

  test('Test parseMtgo', async () => {
    const rData = await expectData;
    const rNull = await expectNull;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pData = await parseMtgo(rData.name, rData.data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pNull = await parseMtgo(rNull.name, rNull.data);

    expect(pData !== null).toBeTruthy();
  });
});
