import query from "../../config.js";

export async function updateNote({ day, title, update }) {
  const resp = await query(
    `UPDATE notes SET description = ($1) FROM days WHERE notes.day_id = days.day_id AND days.name = ($2) AND notes.title = ($3) RETURNING *;`,
    [update, day, title]
  );
  return resp.rows;
}
