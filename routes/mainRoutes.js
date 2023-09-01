const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');
const upload = require('../middlewares/multer');

// Rutas
router.get('/', notesController.index);
router.get('/login',notesController.login);
router.post('/login', notesController.processLogin);
router.get('/register',notesController.register);
router.post('/register', upload.single('image'), notesController.processRegister);
router.get('/users', notesController.listUsers);
router.get('/users/:id', notesController.userDetail);
router.put('/users/:id', notesController.userEdit);

router.post('/notes', notesController.create);
router.post('/notes/edit', notesController.edit);
router.get('/notes/delete/:id', notesController.delete);



module.exports = router;