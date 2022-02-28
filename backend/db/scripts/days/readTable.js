import query from "../../config.js";

export async function readDaysTable() {
  const res = await query(`SELECT * FROM days`);
  return res.rows;
}

export async function filterDays({ title }) {
  const sqlString = `SELECT name FROM days JOIN notes ON days.day_id = notes.day_id WHERE LOWER(title) = ($1)`;
  const res = await query(sqlString, [title]);
  return res.rows;
}
