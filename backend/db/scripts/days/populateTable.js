import query from "../../config.js";

const sqlString = `INSERT INTO days (name, date) VALUES ($1, $2) RETURNING *;`;

export async function populateDaysTable({ dayname, date }) {
  const resp = await query(sqlString, [dayname, date]);
  return resp.rows;
}
