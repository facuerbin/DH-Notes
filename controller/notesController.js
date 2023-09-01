const { getNotes, writeNotes } = require("../data/model");
const uuid = require("uuid");

const controller = {
  create: (req, res) => {
    const newNote = {
      id: uuid.v4(),
      title: req.body.title,
      body: req.body.body,
    };

    const storedNotes = getNotes();
    storedNotes.push(newNote);

    writeNotes(storedNotes);
    res.redirect("/");
  },
  edit: (req, res) => {
    if (!req.body.id || !req.body.title || !req.body.body)
      return res.send("Error");

    const storedNotes = getNotes();
    const note = {
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
    };

    writeNotes(
      storedNotes.map((element) => {
        if (element.id == req.body.id) {
          return note;
        }
        return element;
      })
    );

    res.redirect("/");
  },
  delete: (req, res) => {
    if (!req.params.id) return res.send("Error");
    const storedNotes = getNotes();

    writeNotes(
      storedNotes.filter((note) => {
        return note.id != req.params.id;
      })
    );
    res.redirect("/");
  },
};

module.exports = controller;
