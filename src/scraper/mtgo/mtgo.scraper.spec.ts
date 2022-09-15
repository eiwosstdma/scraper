import { MtgoScraper } from './mtgo.scraper';

describe('Testing MtgoScraper', () => {
  const scraper = new MtgoScraper();

  test('mtgo.scraper should return the tournament metadata',  async () => {
    const data = await scraper.run('https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-15');
    expect(data?.tournamentData.name).toEqual(resultOf().tournamentData.name);
    expect(data?.tournamentData.format).toEqual(resultOf().tournamentData.format);
    expect(data?.tournamentData.totalPlayer).toEqual(resultOf().tournamentData.totalPlayer);
  });
});

function resultOf() {
  // @ts-ignore
  return {
    tournamentData: {
      publicId: 'fca9a08d',
      name: 'modern-preliminary-2022-09-15',
      postedAt: '2022-09-15',
      playedAt: '09-14-2022',
      totalPlayer: 10,
      linkTo: 'https://magic.wizards.com/en/articles/archive/mtgo-standings/modern-preliminary-2022-09-15',
      format: 'modern',
      organizer: 'wizard',
      platform: 'mtgo',
      levelOfPlay: 'preliminary'
    },
    finalDeckLists: [
      {
        name: 'unknown',
        owner: 'rastaf',
        subId: '63238768b6cdd',
        main: [Array],
        side: [Array],
        rank: 1,
        point: 12,
        omwp: '0.5833',
        gwp: '0.8889',
        ogwp: '0.5458',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'jordanlidsky',
        subId: '63238768bc48a',
        main: [Array],
        side: [Array],
        rank: 2,
        point: 12,
        omwp: '0.5208',
        gwp: '0.7273',
        ogwp: '0.4606',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'tajoordan',
        subId: '63238768c11ae',
        main: [Array],
        side: [Array],
        rank: 3,
        point: 9,
        omwp: '0.6875',
        gwp: '0.7500',
        ogwp: '0.6389',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'waffles',
        subId: '63238768c7db1',
        main: [Array],
        side: [Array],
        rank: 4,
        point: 9,
        omwp: '0.6458',
        gwp: '0.6000',
        ogwp: '0.5568',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'baronofbacon',
        subId: '63238768d17f0',
        main: [Array],
        side: [Array],
        rank: 5,
        point: 9,
        omwp: '0.5833',
        gwp: '0.6667',
        ogwp: '0.5521',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'yungdingo',
        subId: '63238768e1594',
        main: [Array],
        side: [Array],
        rank: 6,
        point: 9,
        omwp: '0.5833',
        gwp: '0.6250',
        ogwp: '0.5589',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'boytriton',
        subId: '63238768e6a98',
        main: [Array],
        side: [Array],
        rank: 7,
        point: 9,
        omwp: '0.5833',
        gwp: '0.6000',
        ogwp: '0.5808',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'soimbagallade',
        subId: '6323876901f24',
        main: [Array],
        side: [Array],
        rank: 8,
        point: 9,
        omwp: '0.5208',
        gwp: '0.6364',
        ogwp: '0.4694',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'ptartswin',
        subId: '6323876908245',
        main: [Array],
        side: [Array],
        rank: 9,
        point: 9,
        omwp: '0.5000',
        gwp: '0.7000',
        ogwp: '0.4889',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      },
      {
        name: 'unknown',
        owner: 'crusherbotbg',
        subId: '6323876915e5e',
        main: [Array],
        side: [Array],
        rank: 10,
        point: 9,
        omwp: '0.4583',
        gwp: '0.7778',
        ogwp: '0.4194',
        tournamentName: 'modern-preliminary-2022-09-15',
        playedAt: '09-14-2022',
        format: 'modern'
      }
    ]
  }
}