const express = require('express');
const { appendFileSync } = require('fs');
const path = require('path');
const mainRouter = require('./routes/mainRoutes');
const app = express();
const port = 3000;

// Configuraciones
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use(mainRouter);


app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port)
});