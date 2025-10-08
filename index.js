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
app.get('/pokemon/:data', (req, res) => {
    const Data = req.params.data;
    console.log(Data);
    if (/^\d+$/.test(Data)) { // vérification si c'est un nombre entier positif
        fs.readFile(POKEDEX_SRC, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            const pokedex = JSON.parse(data);
            const pokemon = pokedex[Data];

            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(400).send('Pokémon non trouvé')
            }
        });
    } else if (/^\p{L}+$/u.test(Data)) {// Vérification si c'est une chaîne de caractère (lettres Unicode uniquement)
        // Lire le fichier JSON contenant le pokedex
        fs.readFile(POKEDEX_SRC, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            // Normaliser la saisie pour gérer correctement les caractères Unicode
            // - on utilise Array.from pour manipuler correctement les caractères Unicode
            const chars = Array.from(Data);

            // Capitaliser : première lettre en majuscule, le reste en minuscules
            // Exemple : "pikachu" -> "Pikachu", "ÉLODIE" -> "Élodie"
            const nom = chars.length
                ? chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase()
                : '';

            // Parser le fichier JSON en tableau JavaScript
            const pokedex = JSON.parse(data);

            // Rechercher le Pokémon dans le tableau en comparant les noms
            // On compare `name.english` et `name.french`
            const pokemon = pokedex.find(p => {
                if (!p || !p.name) return false;
                const names = [p.name.english, p.name.french].filter(Boolean);
                return names.some(n => n=== nom);
            });

            // Si trouvé, renvoyer le Pokémon, sinon 400
            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(400).send('Pokémon non trouvé');
            }
        });
    } else {
        res.end('Veuillez entrer uniquement des lettres ou des nombres.');
    }
});