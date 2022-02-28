import query from "../../config.js";

export async function populateNotesTable({ dayname, title, description }) {
  const findForeignKey = await query(
    `SELECT day_id FROM days WHERE name = ($1);`,
    [dayname]
  );
  const resp = await query(
    `INSERT into notes (day_id, title, description) VALUES ($1, $2, $3) RETURNING *;`,
    [findForeignKey.rows[0].day_id, title, description]
  );
  return resp.rows;
}
