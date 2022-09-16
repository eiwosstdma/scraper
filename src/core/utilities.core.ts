/**
 * Node imports
 */
import { randomBytes } from 'node:crypto';

/**
 * Application
 */
export const generate12LString = () => {
  return randomBytes(6).toString('hex');
};