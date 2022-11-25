import { getDataFromYearMonth, extractLinks } from './link-searcher.mtgo';

describe('Testing functions in link-searcher.mtgo', () => {
  test('Test getDataFromYearMonth', async () => {
    const data = await getDataFromYearMonth(9, 2022);
    expect(typeof data).toBe('string');
  });

  test('Test extractLinks for August 2022', async () => {
    const data = await getDataFromYearMonth(8, 2022);
    const links = extractLinks(data);

    expect(links.length).toBe(135);
  });

  test('Test extractLinks for September 2022', async () => {
    const data = await getDataFromYearMonth(9, 2022);
    const links = extractLinks(data);

    expect(links.length).toBe(135);
  });
});
