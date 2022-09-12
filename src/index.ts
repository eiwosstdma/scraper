/**
 * Node imports
 */

/**
 * Module imports
 */
import { envJson } from 'dotenv-for-json';
import { initialiseDatabase } from './core/initialise-database.core';
import { parseMtgo } from './core/mtgo/parse.mtgo.core';
import { scrapeMtgo } from './core/mtgo/scrape.mtgo.core';
import { managerMtgo, run } from './core/mtgo/manager.mtgo.core';
import { linkBuilderMtgo } from './core/mtgo/link-builder.mtgo.core';

/**
 * Application
 */
(async () => {
  const isWorking = await envJson('conf', { isPrefix: true, prefixName: 'cf' });
  initialiseDatabase();
  // await run(25);
  // await managerMtgo(500);
  const data = await linkBuilderMtgo(0);

  console.log(data);
})();
