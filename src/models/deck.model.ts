import { connexionDatabase } from '../core/initialise-database.core';
import { Deck } from '../core/common.core';
import { RunResult } from 'better-sqlite3';

const set = (deck: Deck): RunResult => {
  const db = connexionDatabase();
  const newDate = new Date();

  const statement = db.prepare(`INSERT INTO decks(created_at, posted_at, played_at, tournament, name, owner, format, main, side) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  return statement.run(
    newDate.toLocaleString(),
    deck.postedAt,
    deck.playedAt,
    deck.tournamentName,
    deck.name,
    deck.owner,
    deck.format,
    deck.main,
    deck.side
  );
};

const get = (identifier: string): Partial<Deck> => {
  const db = connexionDatabase();

  const statement = db.prepare(`SELECT * FROM decks WHERE name = ?`);
  return statement.get(identifier);
};

const remove = (identifier: string): RunResult => {
  const db = connexionDatabase();

  const statement = db.prepare(`DELETE FROM decks WHERE name = ?`);
  return statement.run(identifier);
};

export const DeckModel = {
  set,
  get,
  remove
};
