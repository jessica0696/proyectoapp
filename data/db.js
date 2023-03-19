const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db.sqlite3', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("conexión a la base de datos'");
});


db.run('CREATE TABLE IF NOT EXISTS user (id NUMBER, username TEXT, password TEXT)');

// Creacion de la tabla Livres (Livre_ID, Titre, Auteur, Commentaires)
const sql_create = `CREATE TABLE IF NOT EXISTS Livres (
  Livre_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Titre VARCHAR(100) NOT NULL,
  Auteur VARCHAR(100) NOT NULL,
  Commentaires TEXT
);`;
db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Creación de la tabla 'Livres'");
    // Alimentacion a la tabla de Livres
    const sql_insert = `INSERT INTO Livres (Livre_ID, Titre, Auteur, Commentaires) VALUES
  (1, 'Mrs. Bridge', 'Evan S. Connell', 'Premier de la série'),
  (2, 'Mr. Bridge', 'Evan S. Connell', 'Second de la série'),
  (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
    db.run(sql_insert, err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Alimentación a la tabla 'Livres'");
    });
});

module.exports = db;