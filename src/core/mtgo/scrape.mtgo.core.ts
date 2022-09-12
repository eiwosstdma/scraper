import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { ReferenceModel } from '../../models/reference.model';
import { randomBytes } from 'node:crypto';

export const scrapeMtgo = async (url: string): Promise<Boolean> => {
  const urlArrSegment = url.split('/');
  const endPart = urlArrSegment[urlArrSegment.length - 1];
  const randomHex = randomBytes(4).toString('hex');

  const isTournamentAlreadyScraped = ReferenceModel.get(endPart);

  if (isTournamentAlreadyScraped === undefined) {
    try {
      const fetched = await fetch(url);
      const data = await fetched.text();

      const fileName = `mtgo.${ endPart }.${ randomHex }.html`;
      const pathToFile = resolve(`./database/temporary/${ fileName }`);

      ReferenceModel.set(endPart, randomHex);
      await writeFile(pathToFile, data);
    } catch(err) {
      console.log(err);
      return false;
    }
    return true;
  } else return false;
}
