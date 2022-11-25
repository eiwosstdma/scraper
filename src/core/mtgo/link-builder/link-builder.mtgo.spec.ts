import { linkGenerator, checkLink, checkArrayOfLinks } from './link-builder.mtgo';

describe('Testing link-build.mtgo.ts functions', () => {
  test('Test linkGenerator', () => {
    const result = linkGenerator(1);
    expect(result.length).toBe(60);
  });

  test('Test checklink', async () => {
    const resultExpectString = await checkLink('https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-29');
    const resultExpectNull = await checkLink('https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2015-09-29');

    expect(typeof resultExpectString).toBe('string');
    expect(resultExpectNull).toBe(null);
  });

  test('Test CheckArrayOfLinks', async () => {
    const arrOf = [
      'https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-29',
      'https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-league-2022-09-29',
      'https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-league-2014-09-29'
    ];

    const result = await checkArrayOfLinks(arrOf);
    expect(typeof result[0]).toBe('string');
    expect(typeof result[1]).toBe('string');
    expect(result[2]).toBe(null);
  });
});
