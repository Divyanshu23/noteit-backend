const express = require("express")

const validateToken = require("../middleware/validateToken")
const fetchNotes = require("../controllers/fetchNotes")
const addNote = require("../controllers/addNote")
const updateNote = require("../controllers/updateNote")
const deleteNote = require("../controllers/deleteNote")

const router = express.Router()

router.get("/", [validateToken], fetchNotes)
router.post("/addnote", [validateToken], addNote)
router.put("/updatenote/:noteid", [validateToken], updateNote)
router.delete("/deletenote/:noteid", [validateToken], deleteNote)

module.exports = router