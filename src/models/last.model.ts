import { RunResult } from 'better-sqlite3';
import { connexionDatabase } from '../core/initialise-database.core';

const set = (): RunResult => {
  const db = connexionDatabase();
  const newDate = new Date();

  const statement = db.prepare(`INSERT INTO last_scrape(created_at) VALUES(?)`);
  return statement.run(newDate.toLocaleString());
};

const getLast = (): string => {
  const db = connexionDatabase();

  const statement = db.prepare(`SELECT created_at FROM last_scrape ORDER BY id DESC LIMIT 1`);
  return statement.get();
};

export const LastModel = {
  set,
  getLast
};
