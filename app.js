const express = require('express');
const mainRouter = require('./routes/mainRoutes');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Configuraciones
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use(mainRouter);

app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port)
});