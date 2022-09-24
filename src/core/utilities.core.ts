/**
 * Node imports
 */
import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

/**
 * Application
 */
export const generate12LString = () => {
  return randomBytes(6).toString('hex');
};

/**
 *
 */
export const sleepUntil = promisify(setTimeout);