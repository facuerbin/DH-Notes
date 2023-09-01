const { getNotes, writeNotes, getUsers, writeUsers } = require('../data/model');
const uuid = require('uuid');

const controller = {
    index: (req, res) => {
        const storedNotes = getNotes();
        res.render('index', {notas: storedNotes});
    },
    login:  (req, res) => {
        res.render('login');
    },
    processLogin: (req, res) => {
        const { email, password } = req.body;

        const users = getUsers();
        const requiredUser = users.find((user) => user.email === email);
        
        if (!requiredUser) return res.send('Usuario no encontrado');

        if (requiredUser.password === password) {
            return res.redirect('/')
        }
        res.send('Contraseña incorrecta...');
    },
    register:  (req, res) => {
        res.render('register');
    },
    processRegister: (req, res) => {
        console.log(req.file);
        const user = {
            id: uuid.v4(),
            email: req.body.email,
            password: req.body.password,
            fName: req.body.fName,
            lName: req.body.lName,
            image: req.file ? req.file.filename : 'default.jpg',
        }
        // img: req.

        const users = getUsers();
        users.push(user);

        
        writeUsers(users);
        res.redirect('/login');
    },
    listUsers: (req, res) => {
        const users = getUsers();
        res.json(users);
    },
    userDetail: (req, res) => {
        const users = getUsers();
        const detail = users.find((user => user.id == req.params.id))
        res.render('profile', { user: detail })
    },
    userEdit: (req, res) => {
        const users = getUsers();
        const editedUser = {
            id: req.params.id,
            email: req.body.email,
            password: req.body.password,
            fName: req.body.fName,
            lName: req.body.lName,
        }

        const newUsers = users.map((user) => {
            if (user.id == editedUser.id) {
                return editedUser;
            }
            return user;
        });

        writeUsers(newUsers);
        res.redirect('/users/' + req.params.id);
    },
    create: (req, res) => {
        const newNote = {
            id: uuid.v4(),
            title: req.body.title,
            body: req.body.body,
        };

        const storedNotes = getNotes();
        storedNotes.push(newNote);
        
        writeNotes(storedNotes);
        res.redirect('/');
    },
    edit: (req, res) => {
        if (!req.body.id || !req.body.title || !req.body.body) return res.send('Error');

        const storedNotes = getNotes();
        const note =  {
            id: req.body.id,
            title: req.body.title,
            body: req.body.body
        };
      
        writeNotes(storedNotes.map((element) => {
            if (element.id == req.body.id) {
                return note;
            }
            return element;
        }));

        res.redirect('/');
    },
    delete: (req, res) => {
        if (!req.params.id) return res.send('Error');
        const storedNotes = getNotes();


        writeNotes(storedNotes.filter((note) => {
            return note.id != req.params.id;
        }));
        res.redirect('/');
    }
}



module.exports = controller;