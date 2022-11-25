import { linkGenerator, checkLink, checkArrayOfLinks } from './link-builder.mtgo';

describe('Testing link-build.mtgo.ts functions', () => {
  test('Test linkGenerator', () => {
    const result = linkGenerator(1);
    expect(result.length).toBe(60);
  });

  test('Test checklink', async () => {
    const resultExpectString = await checkLink('https://www.mtgo.com/en/mtgo/decklist/modern-preliminary-2022-09-2912480044');
    // const resultExpectNull = await checkLink('https://www.mtgo.com/en/mtgo/decklist/modern-preliminary-2054-09-2912480044');

    expect(typeof resultExpectString).toBe('string');
  });

  test('Test CheckArrayOfLinks', async () => {
    const arrOf = [
      'https://www.mtgo.com/en/mtgo/decklist/modern-preliminary-2022-09-2912480044',
      'https://www.mtgo.com/en/mtgo/decklist/standard-league-2022-09-29',
      'https://www.mtgo.com/en/mtgo/decklist/standard-league-2045-09-29'
    ];

    const result = await checkArrayOfLinks(arrOf);
    expect(typeof result[0]).toBe('string');
    expect(typeof result[1]).toBe('string');
  });
});
