import { RunResult } from 'better-sqlite3';
import { connexionDatabase } from '../core/initialise-database.core';
import { CollectedTournament } from '../core/common.core';

const set = (collectedTournament: CollectedTournament): RunResult => {
  const db = connexionDatabase();
  const newDate = new Date();

  const statement = db.prepare(`INSERT INTO collected_tournament(created_at, name, link_to) VALUES(?, ?, ?) `);
  return statement.run(
    newDate.toLocaleString(),
    collectedTournament.name,
    collectedTournament.linkTo
  );
};

const get = (collectedTournamentName: string): CollectedTournament => {
  const db = connexionDatabase();

  const statement = db.prepare(`SELECT * FROM collected_tournament WHERE name = ?`);
  return statement.get(collectedTournamentName);
};

export const CollectedModel = {
  set,
  get
};
