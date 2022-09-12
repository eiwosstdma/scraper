/**
 * Node imports
 */
import { resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';

/**
 * Module imports
 */
import Database, { RunResult, Database as DB } from 'better-sqlite3';

/**
 * Application
 */
export const connexionDatabase = (): DB => {
  return new Database(resolve('./database/main.db'));
};

const tableCreation = (): void => {
  const createTournamentTable = `
    create table if not exists tournaments (
        id int primary key,
        created_at text not null,
        public_id text not null,
        name text not null,
        played_at text not null,
        posted_at text not null,
        link_to text not null,
        format text not null,
        total_player int not null,
        organizer text not null,
        platform text not null,
        level_play text not null
    );
  `;

  const createDeckTable = `
    create table if not exists decks (
        id int primary key,
        created_at text not null,
        tournament text not null,
        played_at text not null,
        posted_at text,
        name text not null,
        sub_id text not null,
        owner text not null,
        format text not null,
        main text not null,
        side text not null,
        rank int,
        point int,
        omwp text,
        gwp text,
        ogwp text
    );
  `;

  const createTournamentReference = `
    create table if not exists tournament_reference (
      id int primary key,
      created_at text not null,
      reference text not null,
      hex_key text not null
    );
  `;

  const createCollectedTournament = `
    create table if not exists collected_tournament (
        id int primary key,
        created_at text not null,
        name text not null,
        link_to text not null
    );
  `;

  const createLastScrape = `
    create table if not exists last_scrape (
        id int primary key,
        created_at text not null
    );
  `;

  const db = connexionDatabase();

  db.exec(createTournamentTable);
  db.exec(createDeckTable);
  db.exec(createTournamentReference);
  db.exec(createCollectedTournament);
  db.exec(createLastScrape);
}

const folderCreation = (): void => {
  const pathToTemporary = resolve('./database/temporary');
  const isExist = existsSync(pathToTemporary);

  if (!isExist) {
    mkdirSync(pathToTemporary);
  }
};

export const initialiseDatabase = () => {
  folderCreation();
  tableCreation();
};
