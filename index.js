/**
 * Serveur Backend Pokedex
 */

// Définition de l'emplacement des fichier bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définition de l'emplacement des images
const IMAGES_SRC = "./FILES/images";

// Définition du port
const PORT = 5001;

/**
 * Lancer un serveur express sur un port défini
 */

const fs = require('fs');
const express = require('express');
const app = express();

// Lancement du serveur et attendre
app.listen(
    PORT,
    '172.16.195.254',
    ()=>{
        console.log(`Server Pokedex is listening on ${PORT}`);
    }
)

app.get('/', (req, res) => {
    fs.readFile(POKEDEX_SRC, 'utf-8', (err,data) => {
        if (err){
            console.error('Erreur lors de la lecture du fichier :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        // Convertion du json en objet js
        const pokedex = JSON.parse(data);

        // Renvoyer le contenu de la source
        res.json(pokedex);
    });
})