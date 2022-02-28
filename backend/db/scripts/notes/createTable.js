import query from "../../config.js";

const sqlString = `CREATE TABLE IF NOT EXISTS notes (
  note_id SERIAL PRIMARY KEY, 
  day_id INTEGER,
  title TEXT,
  description TEXT,
  FOREIGN KEY (day_id) REFERENCES days(day_id))`;

export async function createNotesTable() {
  const resp = await query(sqlString);
  console.log(resp);
}

createNotesTable();
