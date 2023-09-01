const express = require("express");
const router = express.Router();

const notesController = require("../controller/notesController");

router.post("/notes", notesController.create);
router.post("/notes/edit", notesController.edit);
router.get("/notes/delete/:id", notesController.delete);

module.exports = router;
