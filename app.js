const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuraciones
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, './views/index.html')
    );
});

app.get('/login', (req, res) => {
    res.sendFile(
        path.join(__dirname, './views/login.html')
    );
});

app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port)
});