/**
 * Node imports
 */

/**
 * Module imports
 */
import { envJson } from 'dotenv-for-json';
import { initialiseDatabase } from './core/initialise-database.core';

/**
 * Application
 */
(async () => {
  const isWorking = await envJson('conf', { isPrefix: true, prefixName: 'cf' });
  initialiseDatabase();
  // await run(25);
  // await managerMtgo(500);
  // const data = await linkBuilderMtgo(0);

  // console.log(data);
})();
