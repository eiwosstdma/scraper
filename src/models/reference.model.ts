import { RunResult } from 'better-sqlite3';
import { connexionDatabase } from '../core/initialise-database.core';

const set = (name: string, key: string): RunResult => {
  const db = connexionDatabase();
  const newDate = new Date();

  const statement = db.prepare(`INSERT INTO tournament_reference(created_at, reference, hex_key) VALUES(?, ?, ?)`);
  return statement.run(
    newDate.toLocaleString(),
    name,
    key
  );
};

const get = (name: string): { reference: string, hex_key: string }  => {
  const db = connexionDatabase();

  const statement = db.prepare(`SELECT reference, hex_key FROM tournament_reference WHERE reference = ?`);
  return statement.get(name);
};

const remove = (name: string): RunResult => {
  const db = connexionDatabase();

  const statement = db.prepare(`DELETE FROM tournament_reference WHERE reference = ?`);
  return statement.run(name);
};

export const ReferenceModel = {
  set,
  get,
  remove
};
