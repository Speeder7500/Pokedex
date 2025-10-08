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
    '127.0.0.1',
    ()=>{
        console.log(`Server Pokedex is listening on ${PORT}`);
    }
)