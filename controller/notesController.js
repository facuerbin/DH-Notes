const db = require("../data/models/index");

const controller = {
    index: async (req, res) => {
        const storedNotes = await db.Note.findAll();
        res.render('index', {notas: storedNotes});
    },
    login:  (req, res) => {
        res.render('login');
    },
    create: async (req, res) => {
        // const topic = await db.Topic.findByPk(1);
        
        const newNote = {
            title: req.body.title,
            body: req.body.body,
            // topics: topic,
        };

        await db.Note.create(
            newNote,
            // {
            //     include: db.Topic
            // }
            );
        res.redirect('/');
    },
    edit: async (req, res) => {
        if (!req.body.id || !req.body.title || !req.body.body) return res.send('Error');
        const note =  {
            title: req.body.title,
            body: req.body.body
        };

        await db.Note.update(note, {where: {id: req.body.id}});

        res.redirect('/');
    },
    delete: async (req, res) => {
        if (!req.params.id) return res.send('Error');

        await db.Note.destroy({where: {id: req.params.id}});

        res.redirect('/');
    }
}



module.exports = controller;