import query from "../../config.js";

export async function readNotesTable() {
  const resp = await query(`SELECT * FROM notes`);
  return resp.rows;
}

export async function readNoteByDay({ day }) {
  const resp = await query(
    `SELECT *, days.date FROM notes JOIN days ON notes.day_id = days.day_id WHERE name = ($1)`,
    [day]
  );
  return resp.rows;
}
