import { LinkBuilderMtgo } from './link-builder.mtgo';
import { ConfigurationLinker } from '../../common.core';

describe('Testing link-builder class', () => {
  const linkBuilder = new LinkBuilderMtgo();
  const configurationObj: ConfigurationLinker = {
    wantedFormat: [ 'modern' ],
    wantedLevel: [ 'preliminary', 'league' ],
  };

  test('There is good number of links', async () => {
    const arr = await linkBuilder.run(3, configurationObj);

    expect(typeof arr[0]).toBe('string');
  });
});
