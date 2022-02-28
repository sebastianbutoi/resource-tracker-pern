import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readDaysTable, filterDays } from "./db/scripts/days/readTable.js";
import { readNotesTable, readNoteByDay } from "./db/scripts/notes/readTable.js";
import { populateNotesTable } from "./db/scripts/notes/populateTable.js";
import { updateNote } from "./db/scripts/notes/updateNote.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Resource Tracker App</h1>");
});

app.get("/alldata", async (req, res) => {
  const daysTable = await readDaysTable();
  const noteTable = await readNotesTable();
  const data = {
    daysTable: daysTable,
    noteTable: noteTable,
  };
  res.status(200).json({ payload: data });
});

app.get("/note/filter/:title", async (req, res) => {
  const response = await filterDays({ title: req.params.title });
  res.status(200).json({ payload: response });
});

app.get("/note/:dayname", async (req, res) => {
  const dayname = req.params.dayname;
  const data = await readNoteByDay({ day: dayname });
  res.json({ payload: data });
});

app.post("/note/:dayname", async (req, res) => {
  const queryParams = {
    dayname: req.params.dayname,
    title: req.body.title,
    description: req.body.description,
  };
  const insert = await populateNotesTable(queryParams);
  res.json({ payload: insert });
});

app.patch("/note/:dayname", async (req, res) => {
  const queryParams = {
    day: req.params.dayname,
    title: req.body.title,
    update: req.body.description,
  };
  const updated = await updateNote(queryParams);
  res.json({ payload: updated });
});

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
