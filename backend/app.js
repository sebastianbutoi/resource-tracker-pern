import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readDaysTable } from "./db/scripts/days/readTable.js";
import { readNotesTable } from "./db/scripts/notes/readTable.js";

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
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
