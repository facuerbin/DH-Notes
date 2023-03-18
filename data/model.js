const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, './notas.json');

module.exports = {
    getNotes : () => {
        const content= fs.readFileSync(notesPath,'utf8');
        return JSON.parse(content || '[]');
    },
    writeNotes : (notes) => {
        fs.writeFileSync(
            notesPath,
            JSON.stringify(notes),
        );
    }
}