const { getNotes } = require("../data/model");

module.exports = {
    index: (req, res) => {
        const storedNotes = getNotes();
        res.render("index", { notas: storedNotes });
      },
}