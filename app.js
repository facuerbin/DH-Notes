const express = require('express');
const mainRouter = require('./routes/mainRoutes');
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middlewares/session');
const sessionCookie = require('./middlewares/sessionCookie');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuraciones
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionCookie);
app.use(sessionMiddleware)

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use(mainRouter);
app.use(noteRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port)
});