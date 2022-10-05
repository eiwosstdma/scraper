/**
 * Node imports
 */
import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

/**
 * Application
 */
export const generate12LString = () => {
  return randomBytes(5).toString('hex');
};

export const sleepUntil = promisify(setTimeout);

// export const guardClassGeneric = <T>(unknownObj: unknown, knownObj: T, howMuchItNeedsToCompare: number): T | null => {
//   if (!(unknownObj instanceof Object)) return null;
//   if (!(knownObj instanceof Object)) throw new TypeError('typeGuard Function: Should be of type object');
//
//   const propsOfKnown = Object.keys(knownObj);
//   const propsOfUnknown = Object.keys(unknownObj);
//   let isFoundEqually = 0;
//
//   for (const propUnknown of propsOfUnknown) {
//     const isFound = propsOfKnown.find(prop => prop === propUnknown);
//     if (isFound) isFoundEqually++;
//   }
//
//   if (isFoundEqually >= howMuchItNeedsToCompare) return unknownObj as T;
//   else return null;
// };

export const guardGeneric = <T>(unk: any, typeInArr: Readonly<Array<string>>): T | null => {
  if (typeof unk !== 'string') return null;
  // const isAlive = typeInArr.find(v => v === unk);
  let isAlive;
  typeInArr.forEach(item => {
    if (item === unk) {
      isAlive = item;
    }
  });

  return isAlive === undefined ? null : isAlive as T;
};
