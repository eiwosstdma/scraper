import { Filter } from '../core/common.core';

export const modernFilter = (): Array<Filter> => {
  return [
    {
      name: 'URx Murktide',
      includes: [ 'Murktide Regent', 'Spirebluff canal', 'Steam vents', 'Expressive Iteration' ],
      excludes: []
    },
    {
      name: 'Grixis DS',
      includes: [ `Death's shadow`, 'Thoughtseize', 'Watery grave', 'Blood crypt', 'Steam vents' ],
      excludes: []
    },
    {
      name: '4C Control',
      includes: [ 'Omnath, Locus of Creation', 'Solitude', 'Teferi, time raveler', 'Wrenn and six', 'Abundant growth' ],
      excludes: [ 'Risen reef' ]
    },
    {
      name: '4C blink',
      includes: [ 'Omnath, Locus of Creation', 'Solitude', 'Teferi, time raveler', 'Risen reef', 'Abundant growth' ],
      excludes: []
    },
  ]
};
