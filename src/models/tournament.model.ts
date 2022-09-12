import { RunResult } from 'better-sqlite3';
import { connexionDatabase } from '../core/initialise-database.core';
import { Tournament } from '../core/common.core';

const set = (tournament: Tournament): RunResult => {
  const db = connexionDatabase();
  const newDate = new Date();

  const statement = db.prepare(`INSERT INTO tournaments(created_at, public_id, name, posted_at, played_at, format, link, organizer, platform, level_play) 
                                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  return statement.run(
    newDate.toLocaleString(),
    tournament.publicId,
    tournament.name,
    tournament.postedAt,
    tournament.playedAt,
    tournament.format,
    tournament.linkTo,
    tournament.organizer,
    tournament.platform,
    tournament.levelOfPlay
  );
};

const get = (identifier: string): Partial<Tournament> => {
  const db = connexionDatabase();

  const statement = db.prepare(`SELECT * FROM tournaments WHERE name = ?`);
  return statement.get(identifier);
};

const remove = (identifier: string): RunResult => {
  const db = connexionDatabase();

  const statement = db.prepare(`DELETE FROM tournaments WHERE name = ?`);
  return statement.run(identifier);
};

export const TournamentModel = {
  set,
  get,
  remove
};
