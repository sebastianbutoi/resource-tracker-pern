import query from "../../config.js";

export async function deleteNoteByDay({ day, title }) {
  const sqlString = `DELETE FROM notes USING days WHERE notes.day_id = days.day_id AND days.name = ($1) AND notes.title = ($2) RETURNING *;`;
  const resp = await query(sqlString, [day, title]);
  return resp.rows;
}
