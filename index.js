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
    () => {
        console.log(`Server Pokedex is listening on ${PORT}`);
    }
)
/**
 * Création de la route principale
 */
app.get('/', (req, res) => {
    fs.readFile(POKEDEX_SRC, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        // Convertion du json en objet js
        const pokedex = JSON.parse(data);

        // Renvoyer le contenu de la source
        res.json(pokedex);
    });
});

/**
 * Création de la route du hasard
 */
app.get('/hasard', (req, res) => {
    fs.readFile(POKEDEX_SRC, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            res.status(500).send('Erreur serveur');
            return;
        }

        const pokedex = JSON.parse(data);
        const minId = 0;
        const maxId = pokedex.length - 1;
        console.log(maxId);
        // Choix d'un id au hasard
        const randomIndex = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        const randomPokemon = pokedex[randomIndex];
        //Affichage du pokemon corrspondant à l'id précédent.
        res.json(randomPokemon);
    });
});

/**
 * Création de la route permettant de trouver un pokemon par son id
 */
app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (/^\d+$/.test(id)) {
        fs.readFile(POKEDEX_SRC, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            const pokedex = JSON.parse(data);
            const pokemon = pokedex[id];

            if (pokemon) {
                res.json(pokemon);
            }else{
                res.status(400).send('Pokémon non trouvé')
            }
        });
    } else {
        res.end('Veuillez entrer un nombre entier ou un nom de pokemon');
    }
});