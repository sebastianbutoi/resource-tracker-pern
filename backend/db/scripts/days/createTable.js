import query from "../../config.js";

const sqlString = `CREATE TABLE IF NOT EXISTS days (day_id SERIAL PRIMARY KEY, name TEXT, date TEXT );`;

export async function createDaysTable() {
  const resp = await query(sqlString);
  return resp;
}

createDaysTable();
