const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');

// Rutas
router.get('/', notesController.index);
router.get('/login',notesController.login);

router.post('/notes', notesController.create);
router.post('/notes/edit', notesController.edit);
router.get('/notes/delete/:id', notesController.delete);



module.exports = router;