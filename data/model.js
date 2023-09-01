const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, './notas.json');
const usersPath = path.join(__dirname, './users.json');

module.exports = {
    getNotes : () => {
        const content = fs.readFileSync(notesPath,'utf8');
        return JSON.parse(content || '[]');
    },
    writeNotes : (notes) => {
        fs.writeFileSync(
            notesPath,
            JSON.stringify(notes, null, 2),
        );
    },
    getUsers : () => {
        const content = fs.readFileSync(usersPath,'utf8');
        return JSON.parse(content || '[]');
    },
    writeUsers : (users) => {
        fs.writeFileSync(
            usersPath,
            JSON.stringify(users, null, 2),
        );
    }
}